
import { AppBar } from '@/components/AppBar';
import { ImageGenerate } from '@/components/ImageGenerate';
import { Packs } from '@/components/Packs';
import { Photos } from '@/components/Photos';
import TrainModel from '@/components/TrainModel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {auth} from "@clerk/nextjs/server"
import { redirect } from 'next/navigation';

export default async function DashBoard() {
   const {userId } = await auth()
   
   if(!userId) {
    redirect('/')
   }

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      {/* AppBar Layer */}
      <div className="z-50 relative mb-8 p-2">
        <AppBar />
      </div>

      {/* Tabs Container */}
      <div className="w-full max-w-6xl mx-auto px-2 pt-10 sm:pt-16 md:pt-24 md:px-4">
        <Tabs defaultValue="photos" className="w-full">
          <div className="flex justify-center">
            <TabsList className="flex flex-wrap gap-2 bg-white/5 border border-white/10  backdrop-blur-xl rounded-2xl shadow-md">
              <TabsTrigger value="photos" className="text-white data-[state=active]:bg-purple-600">
                Photos
              </TabsTrigger>
              <TabsTrigger value="generate" className="text-white data-[state=active]:bg-purple-600">
                Generate
              </TabsTrigger>
              <TabsTrigger value="train" className="text-white data-[state=active]:bg-purple-600">
                Train Model
              </TabsTrigger>
              <TabsTrigger value="packs" className="text-white data-[state=active]:bg-purple-600">
                Default Packs
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Glassmorphic Panel Wrapper */}
          <div className='flex'>
            <TabsContent value="photos">
              <Photos />
            </TabsContent>
            <TabsContent value="generate">
              <ImageGenerate />
            </TabsContent>
            <TabsContent value="train">
              <TrainModel />
            </TabsContent>
            <TabsContent value="packs">
              <Packs />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
