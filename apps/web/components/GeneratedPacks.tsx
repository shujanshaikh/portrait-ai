
import { useAuth } from "@clerk/nextjs"
import { BACKEND_URL } from "@/config"
import axios from "axios"

export interface TPacks {
   id : string,
    name : string,
    description : string,
    imageUrl : string

}

export async function GeneratedPacks(props : TPacks ) {
   // const { getToken } = useAuth()
   // const res = await axios.post(`${BACKEND_URL}/pack/generate`, {
   //    params : {
   //       modelId : props.id,
   //       packId : props.id
   //    }
   // }, {
   //    headers : {
   //       "Authorization" : `Bearer ${getToken}`
   //    }
   // })
  //console.log(res)

    return <div className="flex flex-col items-center justify-center rounded-lg p-5 space-y-6 hover:border-2 hover:border-white hover:cursor-pointer">
         <div className="flex justify-center items-center">
            <img src={props.imageUrl} className="rounded" />
         </div>

         <div className="text-lg font-bold text-center ">
            {props.name}
         </div>

         <div className="text-sm text-center text-muted-foreground ">
            {props.description}
         </div>
    </div>
}