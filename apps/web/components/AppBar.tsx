import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ModeToggle } from './ui/toggle';

export function AppBar() {
  return (
    <div className="flex justify-between p-4 border-b absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none">
      <div>
        <h1 className="text-2xl font-bold">Portrait-Ai</h1>
      </div>

      <div>
        <div>
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
