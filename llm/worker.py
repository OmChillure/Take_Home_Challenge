from bullmq import Queue, Worker
import pdfplumber
from sentence_transformers import SentenceTransformer
import json
import psycopg2

# Initialize the model for generating embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')

def process_pdf(file_path):
    with pdfplumber.open(file_path) as pdf:
        text = " ".join(page.extract_text() for page in pdf.pages)
    embeddings = model.encode([text])
    return embeddings.tolist()

# Setup BullMQ queue
queue = Queue("pdf_processing_queue")

class PDFProcessor(Worker):
    async def process(self, job):
        data = json.loads(job.data)
        file_path = data['file_path']
        embeddings = await process_pdf(file_path)
        await store_embeddings_in_db(embeddings, file_path)
        await queue.add_worker(PDFProcessor())

def store_embeddings_in_db(embeddings, document_id):
    try:
        connection = psycopg2.connect(user="postgres", password="omchillure", host="localhost", port="5432", database="postgres")
        cursor = connection.cursor()
        insert_query = """INSERT INTO documents (document_id, embeddings) VALUES (%s, %s)"""
        cursor.execute(insert_query, (document_id, json.dumps(embeddings)))
        connection.commit()
        cursor.close()
        connection.close()
    except Exception as error:
        print(f"Error while inserting data: {error}")
