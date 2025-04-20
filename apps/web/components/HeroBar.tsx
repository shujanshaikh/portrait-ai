'use client';

import { Button } from './ui/button';
import { ArrowRight, Github, Twitter, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeroBar() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white">
      {/* Main Content */}
      <main className="flex-grow w-full px-4 sm:px-8 pt-36 pb-28 flex flex-col items-center justify-center gap-24">
        {/* Hero Section (Centered Text) */}
        <section className="flex-grow flex flex-col items-center justify-center text-center space-y-6 mt-24 mb-24">
          <div className="flex flex-col gap-2 items-center animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 text-transparent bg-clip-text drop-shadow-[0_2px_6px_rgba(255,255,255,0.15)]">
              Start Your <span className="text-pink-400">AI Portrait Journey</span>
              <br />
              <span className="text-pink-500">Today</span>
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-purple-200/90 max-w-2xl mx-auto animate-fade-in-up">
            Join thousands of creators who have already transformed their photos with our AI technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 animate-fade-in-up">
            <Button onClick={() => router.push('/dashboard')} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" className="border border-purple-400 text-purple-200 bg-black/30 hover:bg-purple-800/30 px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200" onClick={() => router.push('/learn-more')}>
              Learn More
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs text-purple-300 animate-fade-in-up">
            <span className="flex items-center gap-1"><span className="text-pink-400">&#9679;</span> No credit card required</span>
            <span className="flex items-center gap-1"><span className="text-pink-400">&#9679;</span> Free credits to start</span>
            <span className="flex items-center gap-1"><span className="text-pink-400">&#9679;</span> Cancel anytime</span>
          </div>
        </section>

      {/* Testimonials Section */}
<section className="w-full flex flex-col items-center justify-center mt-16 mb-16">
  <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-500 mb-2">
    Loved by Creators
  </h2>
  <p className="text-purple-200 mb-10 text-center">
    Join thousands of satisfied users who have transformed their portraits
  </p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
    {/* Testimonial 1 */}
    <div className="bg-black/50 border border-pink-400 rounded-2xl p-6 shadow-xl relative flex flex-col backdrop-blur-md hover:scale-[1.03] transition-transform duration-300 ease-in-out group">
      <div className="absolute -top-2 -left-2 w-full h-full bg-pink-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>
      <div className="flex items-center mb-4 relative z-10">
        <img
          src="https://pbs.twimg.com/profile_images/1907626404155633664/eHnazQJu_400x400.jpg"
          alt="Shujan Shaikh"
          className="w-10 h-10 rounded-full border-2 border-pink-400 mr-3"
        />
        <span className="text-yellow-400 ml-auto">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="10,2 12,7.5 18,7.5 13,11.5 15,17 10,13.5 5,17 7,11.5 2,7.5 8,7.5" />
          </svg>
        </span>
      </div>
      <p className="text-purple-100 mb-3 relative z-10">
        The quality of these AI portraits is absolutely incredible. They look better than my professional headshots!
      </p>
      <span className="text-pink-400 font-semibold relative z-10">
        Shujan Shaikh
      </span>
      <span className="text-purple-400 text-xs relative z-10">
        Founder/Developer
      </span>
    </div>

    {/* Testimonial 2 */}
    <div className="bg-black/50 border border-purple-400 rounded-2xl p-6 shadow-xl relative flex flex-col backdrop-blur-md hover:scale-[1.03] transition-transform duration-300 ease-in-out group">
      <div className="absolute -top-2 -left-2 w-full h-full bg-purple-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>
      <div className="flex items-center mb-4 relative z-10">
        <img
          src="https://pbs.twimg.com/profile_images/1635702018751754240/hYTF96my_400x400.jpg"
          alt="Samar Sayyad"
          className="w-10 h-10 rounded-full border-2 border-purple-400 mr-3"
        />
        <span className="text-yellow-400 ml-auto">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="10,2 12,7.5 18,7.5 13,11.5 15,17 10,13.5 5,17 7,11.5 2,7.5 8,7.5" />
          </svg>
        </span>
      </div>
      <p className="text-purple-100 mb-3 relative z-10">
        We used this for our family portraits and the results were stunning. So much easier than a traditional photoshoot!
      </p>
      <span className="text-pink-400 font-semibold relative z-10">
        Samar Sayyad
      </span>
      <span className="text-purple-400 text-xs relative z-10">
        Developer
      </span>
    </div>

    {/* Testimonial 3 */}
    <div className="bg-black/50 border border-pink-400 rounded-2xl p-6 shadow-xl relative flex flex-col backdrop-blur-md hover:scale-[1.03] transition-transform duration-300 ease-in-out group">
      <div className="absolute -top-2 -left-2 w-full h-full bg-pink-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>
      <div className="flex items-center mb-4 relative z-10">
        <img
          src="https://pbs.twimg.com/profile_images/1895417129605767168/3xKcHWx2_400x400.jpg"
          alt="Arman Khan"
          className="w-10 h-10 rounded-full border-2 border-pink-400 mr-3"
        />
        <span className="text-yellow-400 ml-auto">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="10,2 12,7.5 18,7.5 13,11.5 15,17 10,13.5 5,17 7,11.5 2,7.5 8,7.5" />
          </svg>
        </span>
      </div>
      <p className="text-purple-100 mb-3 relative z-10">
        Game-changer for my professional brand. The variety of styles and quick delivery is unmatched.
      </p>
      <span className="text-pink-400 font-semibold relative z-10">
        Arman Khan
      </span>
      <span className="text-purple-400 text-xs relative z-10">
        Developer
      </span>
    </div>
  </div>
</section>


        {/* Feature Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl w-full text-center animate-fade-in-up mt-16 mb-16">
          {[
            {
              title: 'Flux AI',
              desc: 'Industrial-grade AI for photorealistic results.',
              icon: '🧠',
            },
            {
              title: 'Privacy First',
              desc: 'Your images stay private. Always encrypted.',
              icon: '🔐',
            },
            {
              title: 'Lightning Fast',
              desc: 'Get your portraits in seconds, not minutes.',
              icon: '⚡',
            },
          ].map(({ title, desc, icon }, i) => (
            <div
              key={i}
              className="relative group p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 to-purple-700/30 border border-white/10 shadow-[0_8px_30px_rgba(109,40,217,0.25)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-purple-700/30"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-tr from-pink-500 via-purple-500 to-purple-700 rounded-full flex items-center justify-center text-2xl shadow-xl border border-white/10 group-hover:scale-110 transition-all">
                {icon}
              </div>
              <h3 className="mt-10 text-xl font-bold text-purple-100 drop-shadow-sm tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm text-purple-300 leading-relaxed">{desc}</p>
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-pink-400/30 transition-all duration-300" />
            </div>
          ))}
        </section>

        {/* Pricing Plans Section */}
        <section className="max-w-6xl w-full text-center space-y-6 mt-16 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-100">Our Plans</h2>
          <p className="text-lg sm:text-xl text-purple-200">Choose the best plan for your needs.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
            {[
              {
                title: 'Basic Plan',
                price: '500 credits/month',
                features: ['AI-generated portraits', 'Basic customization'],
              },
              {
                title: 'Pro Plan',
                price: '2000 credits/month',
                features: ['AI-generated portraits', 'Advanced customization', 'Priority support'],
              },
              {
                title: 'Premium Plan',
                price: '5000 credits/month',
                features: ['AI-generated portraits', 'Unlimited customization', 'VIP support'],
              },
            ].map(({ title, price, features }, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 to-purple-700/30 border border-white/10 shadow-[0_8px_30px_rgba(109,40,217,0.25)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-purple-700/30"
              >
                <h3 className="text-xl font-bold text-purple-100 drop-shadow-sm">{title}</h3>
                <p className="text-2xl text-pink-500 font-semibold mt-2">{price}</p>
                <ul className="mt-4 text-purple-300">
                  {features.map((feature, index) => (
                    <li key={index} className="mb-2">{feature}</li>
                  ))}
                </ul>
                <Button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200">
                  Choose Plan
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed left-0 right-0 bottom-4 z-50 flex justify-center pointer-events-none">
        <div
          className="pointer-events-auto max-w-5xl w-full mx-4 flex items-center justify-between px-8 py-6 rounded-3xl shadow-xl bg-gradient-to-br from-purple-800/30 via-pink-600/40 to-purple-900/30 backdrop-blur-md backdrop-saturate-150 transition-transform duration-300 hover:scale-[1.03]"
          style={{
            boxShadow: '0 -8px 30px rgba(162, 102, 246, 0.25)',
          }}
        >
          {/* Copyright */}
          <span className="text-md sm:text-lg text-purple-200 text-center sm:text-left font-semibold">
            {' '}
            {new Date().getFullYear()}{' '}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
              PortraitAI
            </span>{' '}
            . All rights reserved.
          </span>

          {/* Social Icons */}
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="https://github.com/shujanshaikh" target="_blank" className="text-purple-300 hover:text-white transition-all duration-300 group">
              <Github className="w-6 h-6 group-hover:scale-110 transition-all duration-300" />
            </Link>
            <Link href="https://x.com/shujanshaikh" target="_blank" className="text-purple-300 hover:text-white transition-all duration-300 group">
              <Twitter className="w-6 h-6 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
