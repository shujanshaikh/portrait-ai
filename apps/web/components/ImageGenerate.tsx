"use client"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { Skeleton } from "@/components/ui/skeleton"




export interface ModelPacks {
    id : string,
    thumbnail : string,
    name : string

}
export function ImageGenerate() {
    const [prompt , setPrompt] = useState<string>("")
    const [models , setModels] = useState<ModelPacks[]>([])
    const [selectedModel , setSelectedModel] = useState<string>()
    const [modelLoading , setModelLoading] = useState(true)
    const { getToken } = useAuth()

    useEffect(() => {
        (async() => {
            const token = await getToken()

            const res = await axios.get(`${BACKEND_URL}/models` , {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            });

            setModels(res.data.models)
            setSelectedModel(res.data.models[0]?.id)
            setModelLoading(false)
        })()
    }, [])
    return <div className="flex flex-col space-y-4 items-center justify-center rounded-lg p-5 w-full">
  <h1 className="text-2xl font-bold">Generate Image</h1>
  <div className="flex flex-wrap justify-center items-center gap-4 rounded-lg p-2 border border-dotted">
    {models.map((model) => (
      <div
        key={model.id}
        className={`${
          selectedModel === model.id ? "border-2" : ""
        } cursor-pointer flex flex-col items-center justify-center rounded-lg p-5 border border-dotted hover:border-2 hover:border-white w-40`}
        onClick={() => setSelectedModel(model.id)}
      >
        <img src={model.thumbnail} className="rounded-lg w-full h-40 object-cover" />
        <div className="flex justify-center items-center mt-2">{model.name}</div>
      </div>
    ))}
    {modelLoading && (
      <>
        <div className="flex flex-col items-center justify-center rounded-lg p-5 border border-dotted w-40">
          <Skeleton className="w-full h-40 rounded-lg" />
          <Skeleton className="w-20 h-4 mt-2" />
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg p-5 border border-dotted w-40">
          <Skeleton className="w-full h-40 rounded-lg" />
          <Skeleton className="w-20 h-4 mt-2" />
        </div>
      </>
    )}
  </div>
  <div className="flex flex-col items-center justify-center space-y-4">
    <Input onChange={(event) => {
        setPrompt(event.target.value)
    }} className="w-[60vw] h-[10vh] rounded-md" type="prompt" placeholder="Enter the prompt" />
    <Button onClick={async() => {
        const token = await getToken()
        const res = await axios.post(`${BACKEND_URL}/ai/generate` , {
            prompt,
            modelId : selectedModel,
            num : 1

        } , {
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
    }} className="m-2 rounded-md" variant="secondary" type="submit">
      Generate Image
    </Button>
  </div>
</div>
}