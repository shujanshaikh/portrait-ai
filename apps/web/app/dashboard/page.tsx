import { ImageGenerate } from '@/components/ImageGenerate';
import { Packs } from '@/components/Packs';
import { Photos } from '@/components/Photos';
import TrainModel from '@/components/TrainModel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashBoard() {
	return (
		<div className="flex justify-center m-2">
			<div className="w-8xl">
				<div className="flex justify-center">
					<Tabs defaultValue="account" className="w-[400px] justify-center">
						<div className="flex justify-center">
							<TabsList>
								<TabsTrigger value="photos">Photos</TabsTrigger>
								<TabsTrigger value="generate">Generate</TabsTrigger>
								<TabsTrigger value="train">Train Model</TabsTrigger>
								<TabsTrigger value="packs">Default Packs</TabsTrigger>
							</TabsList>
						</div>
						<TabsContent value="generate">
							<ImageGenerate />
						</TabsContent>
						<TabsContent value="train">
							<TrainModel />
						</TabsContent>
						<TabsContent value="packs">
							<Packs  />
						</TabsContent>
						<TabsContent value="photos">
							<Photos />

							</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
