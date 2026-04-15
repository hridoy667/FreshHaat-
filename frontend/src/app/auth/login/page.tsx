'use client';

import { useState } from 'react';
import Link from 'next/link';
// 1. Remove Github, add User (or just use what's available)
import { ArrowLeft, Lock, Mail, LoaderCircle, User } from 'lucide-react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const inputBase = "w-full pl-11 pr-4 py-3.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 text-sm focus:bg-white focus:ring-2 focus:ring-green-600/10 focus:outline-none transition-all placeholder:text-zinc-400";

  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col justify-center py-8 px-4">
      <div className="max-w-md mx-auto w-full mb-5">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-green-700 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to FreshHaat
        </Link>
      </div>
      <div className="max-w-md mx-auto w-full">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-zinc-950 font-heading tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-zinc-600 text-sm font-sans">
            Log in to manage your harvest or orders.
          </p>
        </header>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-green-950/5 border border-zinc-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold text-zinc-600 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input type="email" placeholder="name@example.com" required className={inputBase} />
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-zinc-600">Password</label>
                <Link href="/auth/forgot" className="text-xs font-bold text-green-700 hover:text-green-800">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input type="password" placeholder="••••••••" required className={inputBase} />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-green-700 text-white font-bold text-base hover:bg-green-800 transition active:scale-95 flex items-center justify-center gap-2 disabled:bg-zinc-300 shadow-lg shadow-green-900/10"
            >
              {loading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : "Sign In"}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-100"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-zinc-400 tracking-widest">Or</span></div>
            </div>

            {/* 2. Swapped Github for User icon to fix the error */}
            <button type="button" className="w-full py-3 px-4 rounded-xl border border-zinc-200 bg-white text-zinc-700 text-sm font-semibold hover:bg-zinc-50 transition flex items-center justify-center gap-3">
              <User className="w-5 h-5 text-zinc-400" />
              Continue with Social
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-zinc-500">
            New to FreshHaat? {' '}
            <Link href="/auth/register" className="font-bold text-green-700 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}