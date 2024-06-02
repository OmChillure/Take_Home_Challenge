from flask import Flask, request, jsonify, render_template_string
import os
from bullmq import Queue
import eventlet
import tempfile

app = Flask(__name__)
eventlet.monkey_patch()

queue = Queue("pdf_processing_queue")

@app.route('/')
def index():
    return render_template_string("""
        <!DOCTYPE html>
        <html>
            <head>
                <title>PDF Processing</title>
            </head>
            <body>
                <h1>Upload PDF for Processing</h1>
                <form action="/process_pdf" method="post" enctype="multipart/form-data">
                    <input type="file" name="file" accept=".pdf">
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>
    """)

@app.route('/process_pdf', methods=['POST'])
def process_pdf():
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    if file:
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        file.save(temp_file.name)
        eventlet.spawn(enqueue_pdf_processing, temp_file.name)
        return jsonify({"message": "Processing started"}), 200

async def enqueue_pdf_processing(file_path):
    await queue.add_job(lambda: process_pdf(file_path))

if __name__ == '__main__':
    app.run(debug=True)
