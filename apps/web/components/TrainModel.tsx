"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useAuth } from "@clerk/nextjs"
import { BACKEND_URL } from "@/config"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload } from "@/components/ui/upload"

export default function TrainModel() {
  const { getToken } = useAuth()
  const router = useRouter()

  const [zipUrl, setZipUrl] = useState("")
  const [name, setName] = useState("")
  const [type, setType] = useState("Man")
  const [eyeColor, setEyecolor] = useState("")
  const [ethinicity, setEthinicity] = useState("")
  const [bald, setBald] = useState(false)
  const [age, setAge] = useState("")

  async function trainModel() {
    const input = {
      name,
      type,
      age: parseInt(age || "0"),
      eyeColor,
      ethinicity,
      bald,
      zipUrl,
    }

    try {
      const jwtToken = await getToken()
      await axios.post(`${BACKEND_URL}/ai/training`, input, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      router.push("/")
    } catch (err) {
      console.error("Training failed:", err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <Card className="w-full max-w-8xl bg-black/60 border border-purple-500/30 shadow-xl backdrop-blur-md rounded-2xl p-2">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-3xl font-bold text-purple-300">Train Your Model</CardTitle>
          <CardDescription className="text-purple-200 text-sm">Fill in the details to start training.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Name" value={name} onChange={setName} />
            <SelectField label="Type" value={type} onChange={setType} options={["Man", "Women", "Other"]} />
            <InputField label="Age" value={age} onChange={setAge} />
            <SelectField label="Ethnicity" value={ethinicity} onChange={setEthinicity} options={["White", "Black", "Asian_American", "Hispanic", "Indian", "Middle_Easter", "South_Asian"]} />
            <SelectField label="Eye Color" value={eyeColor} onChange={setEyecolor} options={["Brown", "Blue", "Hazel", "Grey"]} />
            <div className="flex items-center gap-3">
              <Label htmlFor="bald">Bald</Label>
              <Switch id="bald" checked={bald} onCheckedChange={setBald} />
            </div>
            <div className="col-span-1 md:col-span-2">
              <Label>Upload Dataset (.zip)</Label>
              <Upload onUpload={setZipUrl} />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 pt-6">
          <Button variant="outline" onClick={() => router.push("/")}>Cancel</Button>
          <Button
            disabled={!type || !name || !zipUrl || !ethinicity || !eyeColor || !age}
            onClick={trainModel}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-md"
          >
            Train
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function InputField({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className="bg-zinc-900/70 border-purple-400/20 focus-visible:ring-purple-500"
      />
    </div>
  )
}

function SelectField({ label, value, onChange, options }: { label: string, value: string, onChange: (val: string) => void, options: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="bg-zinc-900/70 border-purple-400/20 focus-visible:ring-purple-500">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>{opt.replace(/_/g, " ")}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
