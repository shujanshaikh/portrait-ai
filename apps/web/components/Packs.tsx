import { BACKEND_URL } from "@/config"
import axios from "axios"
import { GeneratedPacks, TPacks } from "./GeneratedPacks";

async function getPacks() : Promise <TPacks[]>{
    const res = await axios.get(`${BACKEND_URL}/bulk/pack`);
    return res.data.packs ?? [];
}

export async function Packs() {
    const packs = await getPacks()
    return <div className=" flex justify-center items-center flex-col space-y-6 rounded-lg border border-[5px] grid grid-col-3 " >
         {/* {packs.map(p => < GeneratedPacks {...p} key={}/>) } */}
        {packs.map((p , index) => < GeneratedPacks {...p} key={index}/> )}
    </div>
}