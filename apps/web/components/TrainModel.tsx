"use client"
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
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { useAuth } from "@clerk/nextjs"

export default function TrainModel() {
    const { getToken } = useAuth()
    const [zipUrl, setZipUrl] = useState("")
    const [name, setName] = useState("")
    const [type, setType] = useState("Man")
    const [eyeColor, setEyecolor] = useState<string>("")
    const [ethinicity, setEthinicity] = useState<string>("")
    const [bald, setBald] = useState(false)
    const [age, setAge] = useState<string>("")
    const router = useRouter()

    async function trainModel() {
        const inputField = {
            ethinicity,
            name,
            zipUrl,
            bald,
            eyeColor,
            type,
            age: parseInt(age ?? "0"),
        }

        try {
            const jwtToken = await getToken();
            const response = await axios.post(`${BACKEND_URL}/ai/training`, inputField, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            });
            console.log(response);
            router.push("/");
        } catch (error) {
            console.error("Request failed:", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center rounded-lg p-15 space-y-6">
            <Card className="w-[900px]">
                <CardHeader>
                    <CardTitle>Train Model</CardTitle>
                    <CardDescription>Train your Model to Generate the image</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                    <div className="grid w-full items-center gap-4">
                   
                        <div className="flex flex-col space-y-1.5 flex-1">
                            <Label htmlFor="name">Name</Label>
                            <Input onChange={(e) => setName(e.target.value)} id="name" placeholder="Name of your project" />
                        </div>

                        
                        <div className="flex flex-col space-y-1.5 flex-1">
                            <Label htmlFor="type">Type</Label>
                            <Select onValueChange={setType}>
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="Man">Man</SelectItem>
                                    <SelectItem value="Women">Women</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                        </div>

                    
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <Input onChange={(e) => setAge(e.target.value)} id="age" placeholder="Age of the Model" />
                        </div>

                        
                        <div>
                            <Label htmlFor="ethinicity">Ethnicity</Label>
                            <Select onValueChange={setEthinicity}>
                                <SelectTrigger id="ethinicity">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="White">White</SelectItem>
                                    <SelectItem value="Black">Black</SelectItem>
                                    <SelectItem value="Asian_American">Asian American</SelectItem>
                                    <SelectItem value="Hispanic">Hispanic</SelectItem>
                                    <SelectItem value="Indian">Indian</SelectItem>
                                    <SelectItem value="Middle_Easter">Middle Easter</SelectItem>
                                    <SelectItem value="South_Asian">South Asian</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                      
                        <div>
                            <Label htmlFor="eyecolor">Eye Color</Label>
                            <Select onValueChange={setEyecolor}>
                                <SelectTrigger id="eyecolor">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="Brown">Brown</SelectItem>
                                    <SelectItem value="Blue">Blue</SelectItem>
                                    <SelectItem value="Hazel">Hazel</SelectItem>
                                    <SelectItem value="Grey">Grey</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="bald">Bald</Label>
                            <Switch id="bald" checked={bald} onCheckedChange={setBald} />
                        </div>
                    </div>

                    
                    <Upload onUpload={setZipUrl} />
                </CardContent>

                
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.push("/")}>Cancel</Button>
                    <Button
                        disabled={!type || !name || !zipUrl || !ethinicity || !eyeColor || !age}
                        onClick={trainModel}
                    >
                        Train
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
