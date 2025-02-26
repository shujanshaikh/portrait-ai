import { Skeleton } from "./ui/skeleton"

export interface ImageTypes {
    id : string,
    imageUrl : string,
    status : string

}


export function PhotosCard(props :ImageTypes ) {
    return <div className="flex flex-grid items-center justify-center rounded-lg p-5 space-y-6 border border-6-doted grid hover:border-2 hover:border-white hover:cursor-pointer">
         <div className="flex justify-center items-center">
           { props.status === "Generated" ?  <img src={props.imageUrl} className="rounded" /> : <Skeleton className="w-full h-full rounded" ></Skeleton> }
         </div>
    </div>
}

export function ImageCardSkeleton() {
    return <div className="flex flex-grid items-center justify-center rounded-lg p-5 space-y-6 border border-6-doted grid hover:border-2 hover:border-white hover:cursor-pointer">
         <div className="flex justify-center items-center">
            <Skeleton className="w-full h-full rounded" ></Skeleton>
         </div>
    </div>
}