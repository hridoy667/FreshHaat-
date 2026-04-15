'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Tractor, ChevronDown, ImagePlus, LoaderCircle, AlertCircle } from 'lucide-react';
import { useDistricts } from '@/hooks/useDistricts';

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'farmer'>('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Pull dynamic data from your hook
  const { districts, loading: districtsLoading, error: districtsError } = useDistricts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Logic for registration goes here
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const inputBase = "w-full p-3.5 md:p-4 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 text-sm focus:bg-white focus:ring-2 focus:ring-green-600/10 focus:outline-none transition-all placeholder:text-zinc-400";

  return (
    <main className="min-h-screen bg-zinc-50 py-8 md:py-16 px-4 md:px-12">
      <div className="max-w-2xl mx-auto flex flex-col items-center">

        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-950 font-heading tracking-tight">
            Join FreshHaat
          </h1>
          <p className="mt-2 text-sm md:text-base text-zinc-600 font-sans max-w-sm mx-auto">
            Cultivating a direct connection between earth and table.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="w-full p-5 md:p-10 bg-white rounded-[2rem] shadow-xl shadow-green-950/5 border border-zinc-100">

          {/* Section 1: Role Selection */}
          <div className="mb-8">
            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 font-heading text-center md:text-left">
              I will register as
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {[
                { id: 'customer', label: 'Customer', icon: ShoppingCart, desc: 'Shop fresh, seasonal produce.' },
                { id: 'farmer', label: 'Farmer', icon: Tractor, desc: 'List your harvest directly.' }
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id as any)}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-300 text-left relative
                    ${selectedRole === role.id
                      ? 'border-green-600 bg-green-50/50'
                      : 'border-zinc-100 bg-white hover:border-zinc-200'}`}
                >
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${selectedRole === role.id ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-400'}`}>
                    <role.icon className="w-5 h-5" />
                  </div>
                  <div className="pr-6">
                    <h3 className={`text-sm font-bold ${selectedRole === role.id ? 'text-green-950' : 'text-zinc-950'} font-heading`}>
                      {role.label}
                    </h3>
                    <p className={`mt-0.5 text-xs leading-tight ${selectedRole === role.id ? 'text-green-800' : 'text-zinc-500'}`}>
                      {role.desc}
                    </p>
                  </div>
                  <div className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 transition ${selectedRole === role.id ? 'border-green-600' : 'border-zinc-300'}`}>
                    {selectedRole === role.id && <div className="w-2 h-2 m-0.5 rounded-full bg-green-600" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Form Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600 ml-1">First Name</label>
                <input type="text" placeholder="John" required className={inputBase} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600 ml-1">Last Name</label>
                <input type="text" placeholder="Doe" required className={inputBase} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-600 ml-1">Email Address</label>
              <input type="email" placeholder="john@example.com" required className={inputBase} />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-600 ml-1">Password</label>
              <input type="password" placeholder="********" required className={inputBase} />
            </div>

            {/* Dynamic District Selection */}
            <div className="space-y-1 relative">
              <label className="text-xs font-semibold text-zinc-600 ml-1 flex justify-between">
                District
                {districtsError && <span className="text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Load failed</span>}
              </label>
              <div className="relative">
                <select
                  required
                  disabled={districtsLoading || !!districtsError}
                  defaultValue=""
                  className={`${inputBase} appearance-none pr-10 cursor-pointer disabled:opacity-60`}
                >
                  <option value="" disabled>
                    {districtsLoading ? "Fetching districts..." : "Select your district"}
                  </option>

                  {districts.map(d => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute top-1/2 -translate-y-1/2 right-4 text-zinc-400 w-4 h-4 pointer-events-none ${districtsLoading ? 'animate-pulse' : ''}`} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-600 ml-1">Profile Image</label>
              <div className="w-full flex items-center gap-3 p-4 border-2 border-dashed border-zinc-100 rounded-2xl hover:bg-zinc-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-green-50">
                  <ImagePlus className="w-5 h-5 text-zinc-400 group-hover:text-green-700" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-zinc-700 font-medium truncate">Click to upload or drag & drop</p>
                  <p className="text-[10px] text-zinc-400 truncate">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Submit */}
          <div className="mt-8 space-y-4">
            <button
              type="submit"
              disabled={isSubmitting || districtsLoading}
              className="w-full py-4 rounded-xl bg-green-700 text-white font-bold text-base hover:bg-green-800 transition active:scale-95 flex items-center justify-center gap-3 disabled:bg-zinc-300 shadow-lg shadow-green-900/10"
            >
              {isSubmitting ? <LoaderCircle className="w-5 h-5 animate-spin" /> : "Create Account"}
            </button>

            <p className="text-center text-xs md:text-sm text-zinc-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-bold text-green-700 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}