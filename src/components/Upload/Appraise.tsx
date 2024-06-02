"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from '../ui/input'
import { UploadButton } from "~/utils/uploadthing";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"


const Appraise = () => {
      const router = useRouter();
    const [form, setform] = useState({
        title: "",
        description: "",
        realPrice: "",
        onSale: "true",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setform({
            ...form,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
            />
            <Input 
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
            />

            <Select name="onSale" onValueChange={(value) => setform({ ...form, onSale: value })}>
                <SelectTrigger>
                    <SelectValue placeholder="Want to Upload The Pdf" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                </SelectContent>
            </Select>
            </div>
        <UploadButton endpoint='fileUploader' headers={{
            "selfArt" : "false", 
            "title" : form.title,
            "description" : form.description,
            "estimatePrice" : form.realPrice,
            "realPrice" : form.realPrice,
            "onSale" : form.onSale,
        }} 
        
        onClientUploadComplete={() => {
          router.refresh()
          toast({
                    title: "✅ Appraisal pdf uploaded",
            })
        }}
        
        />
        </div>
    )
}

export default Appraise
