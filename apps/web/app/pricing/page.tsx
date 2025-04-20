"use client"
import { AppBar } from "@/components/AppBar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function PricingPage() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      {/* AppBar with drop shadow and proper layering */}
      <div className="z-50 relative">
        <AppBar />
      </div>

      {/* Section content with spacing */}
      <div className="max-w-5xl mx-auto px-4 pt-36 sm:pt-44 md:pt-52">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-500 mb-2 text-center">
            Choose Your Plan
          </h2>
          <p className="text-center text-purple-200 mb-8 max-w-2xl">
            Pick the plan that suits your needs. Whether you're a solo creator or a growing team
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Basic Plan */}
          <Card className="bg-black/50 border border-purple-500/20 text-white shadow-xl backdrop-blur-md hover:scale-[1.03] transition-transform duration-300 ease-in-out group relative rounded-2xl">
            <div className="absolute inset-0 rounded-2xl bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
            <CardHeader className="text-xl font-bold text-purple-300">25$</CardHeader>
            <CardContent className="space-y-3 text-purple-100">
              <p>✅ 250 credits/month</p>
              <p>✅ Standard AI Styles</p>
              <p>❌ Premium Features</p>
            </CardContent>
            <CardFooter className="pt-6">
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-300">
                Upgrade to Basic
              </button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-black/50 border border-pink-500/20 text-white shadow-xl backdrop-blur-md hover:scale-[1.05] transition-transform duration-300 ease-in-out group relative rounded-2xl">
            <div className="absolute inset-0 rounded-2xl bg-pink-500/10 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
            <CardHeader className="text-xl font-bold text-pink-300">50$</CardHeader>
            <CardContent className="space-y-3 text-purple-100">
              <p>✅ 500 credits/month</p>
              <p>✅ Premium AI Styles</p>
              <p>✅ Priority Rendering</p>
            </CardContent>
            <CardFooter className="pt-6">
              <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-300">
                Upgrade to Pro
              </button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="bg-black/50 border border-pink-500/20 text-white shadow-xl backdrop-blur-md hover:scale-[1.05] transition-transform duration-300 ease-in-out group relative rounded-2xl">
            <div className="absolute inset-0 rounded-2xl bg-pink-500/10 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
            <CardHeader className="text-xl font-bold text-pink-300">100$</CardHeader>
            <CardContent className="space-y-3 text-purple-100">
              <p>✅ 1000 credits/month</p>
              <p>✅ Premium AI Styles</p>
              <p>✅ Priority Rendering</p>
            </CardContent>
            <CardFooter className="pt-6">
              <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-300">
                Upgrade to Pro
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
