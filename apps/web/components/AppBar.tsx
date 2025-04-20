"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ModeToggle } from './ui/toggle';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function AppBar() {

  const router = useRouter();
  return (
    <div className="fixed left-0 right-0 top-4 z-50 flex justify-center pointer-events-none">
      <div
        className="pointer-events-auto max-w-5xl w-full mx-4 flex items-center justify-between px-8 py-3 rounded-3xl shadow-xl bg-gradient-to-br from-white/10 via-purple-800/30 to-purple-900/20 border border-white/10 backdrop-blur-md backdrop-saturate-150 transition-transform duration-300 hover:scale-[1.03]"
        style={{
          boxShadow: '0 8px 30px rgba(162, 102, 246, 0.25)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 select-none">
          <Sparkles className="text-purple-400 drop-shadow-md animate-pulse" size={26} />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-purple-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
            Portrait<span className="text-pink-400">AI</span>
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-purple-200 hover:bg-purple-800" onClick={() => router.push('/pricing')}>
            Pricing
          </Button>
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-white/80 text-purple-700 font-semibold rounded-xl shadow hover:bg-white hover:shadow-lg hover:text-pink-600 transition-all duration-200 border border-purple-300/30 focus:outline-none focus:ring-2 focus:ring-pink-400">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    'ring-2 ring-pink-300 hover:ring-purple-500 transition-all duration-300 shadow-md',
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}