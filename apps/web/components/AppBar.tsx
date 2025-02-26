import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { ModeToggle } from './ui/toggle';

export function AppBar() {
	return (
		<div className="flex justify-between p-4 border-b">
			<div>
				<h1 className="text-2xl font-bold">Portrait-Ai</h1>
			</div>

			<div>
				<div>
					<span className="p-4">
						<ModeToggle />
					</span>
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
		</div>
	);
}
