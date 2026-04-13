import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ShieldCheck, CheckCircle, Radio, Tractor, CalendarCheck, Users, Truck } from 'lucide-react';
import FeatureGrid from "@/components/cards/landingCards";

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
              Buy Fresh <span className="text-green-600">Directly</span> From Farmer
            </h1>
            <p className="mt-6 text-xl font-light text-zinc-800 max-w-lg">
              FreshHaat connects you to local farmers. Get hand-picked produce at fair prices.
            </p>
            <div className="flex gap-4 mt-10">
              <Link href="/shop" className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold">Shop now</Link>
              <Link href="/sell" className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold">Sell Your Crops</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NEW CONTENT SECTION - White background, starts after the hero */}
      <section className="bg-gray-300 py-3">
        <div className="flex justify-between max-w-7xl mx-auto align-center px-6 py-3 md:px-12 lg:px-20">
          <p className="text-zinc-600 flex items-center gap-2">
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
          <Link href={'/feed'} className="text-zinc-600 flex items-center gap-2">
          <span className="inline-flex items-center justify-center">
            <Radio className="text-green-500 w-5 h-5"
              stroke="currentColor" // 2. Explicitly tell it to use the text color
              strokeWidth={2.5} />
          </span><b>Live Harvest Feed</b>
          </Link>
        </div>
      </section>

      <section className="bg-gray-100 py-3 px-2">
      <h1 className="text-5xl md:text-4xl font-semibold text-zinc-950 text-center py-4">Why FreshFarm?</h1>

      <div className="mt-5">
      <FeatureGrid features={FEATURES} columns={4} />
      </div>
      </section>

    </div>
  );
}