'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ModeToggle } from './ui/toggle';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

export function HeroBar() {
	const router = useRouter();
	return (
		<div className="flex justify-center">
			<div className="max-w-6xl">
				<h1 className="text-8xl p-2 text-center">AI-Powered Image Generation</h1>
				<Carousel>
					<CarouselContent className="-ml-2 md:-ml-4">
						<CarouselItem className="pl-2 md:pl-4 basis-1/4">
							<img
								className="w-max-[400px]"
								src="https://image.fluxpro.ai/custom/22a1ddac-2ef8-4b00-831e-8e61a3864bfc.png"
								alt=""
							/>
						</CarouselItem>
						<CarouselItem className="pl-2 md:pl-4 basis-1/4">
							<img
								className="w-max-[400px]"
								src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5313a1ad-6c90-4e7b-857a-f26c99a5261f_1360x768.jpeg"
								alt=""
							/>
						</CarouselItem>
						<CarouselItem className="pl-2 md:pl-4 basis-1/4">
							<img
								className="w-max-[400px]"
								src="https://cdn.arstechnica.net/wp-content/uploads/2024/08/jOmxRsxgXSWnh5YEvFI5b.png"
								alt=""
							/>
						</CarouselItem>
						<CarouselItem className="pl-2 md:pl-4 basis-1/4">
							<img
								className="w-max-[400px]"
								src="https://image.fluxpro.ai/custom/22a1ddac-2ef8-4b00-831e-8e61a3864bfc.png"
								alt=""
							/>
						</CarouselItem>
						<CarouselItem className="pl-2 md:pl-4 basis-1/4">
							<img
								className="w-max-[400px]"
								src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5313a1ad-6c90-4e7b-857a-f26c99a5261f_1360x768.jpeg"
								alt=""
							/>
						</CarouselItem>
						<CarouselItem className="pl-2 md:pl-4 basis-1/4">
							<img
								className="w-max-[400px]"
								src="https://cdn.arstechnica.net/wp-content/uploads/2024/08/jOmxRsxgXSWnh5YEvFI5b.png"
								alt=""
							/>
						</CarouselItem>
					</CarouselContent>
				</Carousel>

				<div className="flex justify-center p-4">
					<SignedIn>
						<Button
							className="mt-4 m-2"
							variant="destructive"
							size="lg"
							onClick={() => {
								router.push('/dashboard');
							}}
						>
							Get Started
						</Button>
					</SignedIn>

					<SignedOut>
						<Button className="mt-4 m-2" variant="secondary" size="lg">
							<SignInButton />
						</Button>
					</SignedOut>
				</div>
			</div>
		</div>
	);
}
