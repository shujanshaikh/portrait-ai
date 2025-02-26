"use client"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { ImageCardSkeleton, PhotosCard } from "./PhotosCard"

export interface ImageTypes {
    id : string,
    imageUrl : string,
    status : string

}


export function Photos() {
    const [photos , setPhotos ] = useState<ImageTypes[]>([])
    const [PhotoLoading , setPhotoLoading] = useState(true)
   const { getToken } = useAuth()
     

    useEffect(() => {
       (async() => {
          const token = await getToken()

          const res = await axios.get(`${BACKEND_URL}/image/bulk` , {
            headers : {
                "Authorization" : ` Bearer ${token}`
            }
          })
          setPhotos(res.data.image)
          setPhotoLoading(false)
       })()
    } , [])
    return <div className="flex justify-center items-center ">
        {photos.map(image => < PhotosCard {...image} /> )}
        {PhotoLoading &&  <ImageCardSkeleton />} 
    </div>
}