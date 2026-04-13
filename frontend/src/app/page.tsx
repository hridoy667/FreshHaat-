import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ShieldCheck, CheckCircle, Radio, Tractor, CalendarCheck, Users, Truck } from 'lucide-react';
import FeatureGrid from "@/components/cards/landingCards";
import Button from "@/components/ui/Button";

export default function Home() {

  const FEATURES = [
    {
      id: 1,
      title: "Direct from Farmers",
      description: "No middlemen. Just pure produce straight from the soil to your doorstep.",
      icon: Tractor,
    },
    {
      id: 2,
      title: "Pre-book Crops",
      description: "Secure your seasonal favorites before they even leave the field.",
      icon: CalendarCheck,
    },
    {
      id: 3,
      title: "Group Buying",
      description: "Pool orders with neighbors to reduce costs and minimize shipping footprint.",
      icon: Users,
    },
    {
      id: 4,
      title: "Hyperlocal Delivery",
      description: "Optimized routes ensure delivery within hours of the harvest.",
      icon: Truck,
    },
  ];

  const JOURNEY_STEPS = [
    {
      id: "01",
      title: "Browse",
      description: "Explore live harvests in your local region.",
    },
    {
      id: "02",
      title: "Order/Pre-book",
      description: "Support farmers by committing early.",
    },
    {
      id: "03",
      title: "Delivery",
      description: "Fresh produce delivered at peak nutrition.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION - High z-index, relative height */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex flex-col justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image src="/hero.jpg" alt="..." fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_left,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0)_100%)]" />
        </div>

        {/* Hero Content Layer */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-950 lg:max-w-xl">
              Buy Fresh <span className="text-green-600 italic">Directly</span> From Farmer
            </h1>
            <p className="mt-6 text-xl font-light text-zinc-800 max-w-lg">
              FreshHaat connects you to local farmers. Get hand-picked produce at fair prices, ensuring farmers earn more and you eat better.
            </p>
            <div className="flex gap-4 mt-10">
              <Button href="/shop" variant="primary">
                Shop Now
              </Button>

              <Button href="/sell" variant="outline">
                Sell Your Crops
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NEW CONTENT SECTION - White background, starts after the hero */}
      <section className="bg-gray-200 shadow inset-shadow-black-900">
        <div className="flex justify-between gap-45 max-w-7xl mx-auto align-center px-6 md:px-12 lg:px-20">
          <p className="text-zinc-700 flex items-center gap-2">
            {/* 1. Added flex to the parent to align them */}
            <span className="inline-flex items-center justify-center">
              <ShieldCheck
                className="text-green-500 w-5 h-5"
                stroke="currentColor" // 2. Explicitly tell it to use the text color
                strokeWidth={2.5}
              />
            </span>
            <b>120+ Verified Farmers</b>
          </p>
          <img src="/logo.png" className="h-20 mix-blend-multiply" alt="" />
          <Link href={'/feed'} className="text-zinc-700 flex items-center gap-2">
            <span className="inline-flex items-center justify-center">
              <Radio className="text-green-500 w-5 h-5"
                stroke="currentColor" // 2. Explicitly tell it to use the text color
                strokeWidth={2.5} />
            </span><b>Live Harvest Feed</b>
          </Link>
        </div>
      </section>

      <section className="flex flex-col items-center bg-white px-20 py-38">
        <h2 className="text-4xl text-zinc-950 font-heading md:text-5xl font-bold">
          Why FreshFarm?
        </h2>
        <div className="mt-4 h-1.5 w-16 bg-green-600 rounded-full" />

        <div className="mt-20">
          <FeatureGrid features={FEATURES} columns={4} />
        </div>
      </section>


      <section className="bg-gray-200 py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-950 font-heading">
              The Journey
            </h2>
            <p className="mt-4 text-zinc-500 font-sans tracking-wide">
              Simple, transparent, and direct.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 bg md:grid-cols-3 gap-12 relative">
            {/* Optional: Add a subtle connecting line for desktop only */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-[1px] bg-zinc-200 z-0" />

            {JOURNEY_STEPS.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">

                {/* Circular Number Icon */}
                <div className="w-20 h-20 rounded-full border-2 border-green-700 flex items-center justify-center bg-white mb-8 group-hover:bg-green-700 transition-colors duration-300">
                  <span className="text-2xl font-bold text-green-700 group-hover:text-white transition-colors duration-300">
                    {step.id}
                  </span>
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-zinc-950 mb-3 font-heading">
                  {step.title}
                </h3>
                <p className="text-zinc-600 font-sans max-w-[250px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* 1. Farmer CTA - Dark, Authoritative */}
          <div className="flex flex-col justify-between p-10 md:p-16 bg-zinc-900 rounded-[2rem] text-white overflow-hidden relative">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
                Are you a farmer? <br />
                <span className="text-green-400">Start selling today.</span>
              </h2>
              <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-md">
                Eliminate the middleman and connect directly with thousands of urban customers.
                Take control of your pricing and growth.
              </p>
            </div>

            <div className="mt-12">
              <Button href="/sell" variant="primary" className="!bg-green-600 hover:!bg-green-500">
                Join the Community
              </Button>
            </div>

            {/* Subtle organic background decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-600/10 rounded-full blur-3xl" />
          </div>

          {/* 2. Consumer/Wholesale CTA - Light, Clean */}
          <div className="relative w-full h-[600px] overflow-hidden rounded-2xl">
            <img
              src="/farmer.jpg"
              className="w-full h-full object-cover object-center"
              alt="Farmer working in field"
            />
          </div>

        </div>
      </section>
    </div>
  );
}