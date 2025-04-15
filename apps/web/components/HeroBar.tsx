"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Sparkles, Palette, Clock, ChevronRight, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroBar() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-32 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 mb-6 tracking-tight">
              Transform Your Photos into Art
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the magic of AI-powered portrait transformation. Turn your photos into stunning artistic masterpieces in seconds.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => {
                router.push("/dashboard")
              }} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Try Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="backdrop-blur-sm">
                View Gallery
              </Button>  </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Why Choose PortraitAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-muted/50 hover:border-purple-500/50 transition-colors group">
              <Camera className="h-12 w-12 mb-6 text-purple-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-3">Instant Results</h3>
              <p className="text-muted-foreground text-lg">Transform your photos in seconds with our advanced AI technology.</p>
            </Card>
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-muted/50 hover:border-pink-500/50 transition-colors group">
              <Sparkles className="h-12 w-12 mb-6 text-pink-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-3">Multiple Styles</h3>
              <p className="text-muted-foreground text-lg">Choose from dozens of artistic styles to create your perfect portrait.</p>
            </Card>
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-muted/50 hover:border-purple-500/50 transition-colors group">
              <Palette className="h-12 w-12 mb-6 text-purple-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-3">High Quality</h3>
              <p className="text-muted-foreground text-lg">Get stunning high-resolution portraits perfect for printing or sharing.</p>
            </Card>
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-muted/50 hover:border-pink-500/50 transition-colors group">
              <Clock className="h-12 w-12 mb-6 text-pink-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-3">24/7 Access</h3>
              <p className="text-muted-foreground text-lg">Create beautiful portraits anytime, anywhere with our cloud service.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden group cursor-pointer">

              <div className="relative" >

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Card>
            ))
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Ready to Transform Your Photos?</h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
            Join thousands of satisfied users who have discovered the magic of AI-powered portraits.
          </p>
          <Button onClick={() => {
            router.push("/dashboard")
          }} size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-6 h-auto">
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 md:px-6 lg:px-8 border-t border-muted/20">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="text-lg">© 2024 PortraitAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
