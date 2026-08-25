import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Zap,
  ShieldCheck,
  TerminalSquare,
  ArrowRight,
  Code2,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";


const GithubIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-blue-500/30 font-sans overflow-x-hidden relative">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 bg-[url('https://res.cloudinary.com/dntjnq39e/image/upload/v1703144869/grid_ptq1m1.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

      {/* Background Glowing Blue Light */}
      <div className="absolute top-0 md:top-[-20%] left-1/2 -translate-x-1/2 w-[120%] md:w-[800px] h-[300px] md:h-[500px] bg-blue-600/20 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>

      {/* Glassmorphism Navbar (Updated with Auth logic) */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2.5 font-bold text-lg md:text-xl tracking-tight">
            <img
              src="/favicon.png"
              alt="RepoRescue Logo"
              className="w-8 h-8 md:w-10 md:h-10 bg-white p-1 rounded-lg shadow-lg shadow-blue-500/20 object-contain"
            />
            RepoRescue
          </div>

          {/* Right Side Nav Items & Auth */}
          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href="https://github.com/manikkori"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2 p-2 sm:p-0"
            >
              <GithubIcon className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Source Code</span>
            </a>

            {/* ABHI CHECK KARENGE USER KA STATE */}

            
            <SignedOut>
              {/* mode="modal" se Clerk ka premium dark popup aayega */}
              <SignInButton mode="modal">
                <Button className="!px-3 sm:!px-4 !py-1.5 sm:!py-2 !text-xs sm:!text-sm !rounded-md shadow-lg shadow-blue-500/20">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            {/* Agar user Logged IN hai -> Dashboard button aur Profile photo dikhao */}
            <SignedIn>
              {/* Dashboard button for logged in users */}
              <Button
                onClick={() => navigate("/dashboard")}
                className="!px-3 sm:!px-4 !py-1.5 sm:!py-2 !text-xs sm:!text-sm !rounded-md bg-white/10 hover:bg-white/20 shadow-none border border-white/10"
              >
                Dashboard
              </Button>

              {/* User Profile Button with custom sizing */}
              <UserButton
                appearance={{
                  elements: { userButtonAvatarBox: "w-8 h-8 md:w-9 md:h-9" },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Main Hero Section (No changes here, kept for completeness) */}
      <main className="relative z-10 pt-28 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 max-w-7xl mx-auto text-center flex flex-col items-center overflow-hidden">
        {/* Agent Beta Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 md:mb-8 animate-fade-in scale-90 md:scale-100">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[10px] md:text-xs font-medium text-gray-300 uppercase tracking-widest">
            RepoRescue Agent is Online
          </span>
        </div>

        {/* Massive Hero Typography */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          Ship faster. We'll handle <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
            the crash logs.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-8 md:mb-10 px-2">
          Paste your production error logs and GitHub repo. Our AI autonomously
          clones, reads, and debugs your codebase in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center px-4 sm:px-0">
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
          >
            Start Debugging <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <a
            href="https://github.com/manikkori"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-2"
          >
            <TerminalSquare className="w-4 h-4" /> View Docs
          </a>
        </div>

        {/* Mock Terminal Showcase (No changes here, kept for completeness) */}
        <div className="w-full max-w-4xl mt-12 md:mt-20 relative animate-fade-in group">
          <div className="absolute -inset-1 md:-inset-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20 md:opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-xl border border-white/10 bg-[#0f0f11] shadow-2xl overflow-hidden text-left">
            {/* Mac Window Header */}
            <div className="flex items-center px-3 md:px-4 py-2.5 md:py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-1.5 md:gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto text-[10px] md:text-xs font-mono text-gray-500">
                agent-trace.log
              </div>
            </div>
            {/* Terminal Content */}
            <div className="p-4 md:p-6 font-mono text-xs sm:text-sm md:text-base space-y-3 md:space-y-4 overflow-x-auto scrollbar-thin">
              <div className="text-gray-400 whitespace-nowrap">
                <span className="text-blue-500">❯</span> Initializing RepoRescue
                autonomous agent...
              </div>
              <div className="text-gray-300 whitespace-nowrap">
                <span className="text-blue-500">❯</span> Fetching repo:{" "}
                <span className="text-white">github.com/manikkori/app</span>
              </div>
              <div className="text-red-400 whitespace-nowrap">
                <span className="text-red-500">✖</span> Error detected:
                ReferenceError: express is not defined
              </div>
              <div className="text-gray-400 whitespace-nowrap">
                <span className="text-blue-500">❯</span> Scanning
                architecture... 6 files analyzed.
              </div>
              <div className="text-green-400 flex items-start gap-2 min-w-max">
                <span className="text-green-500 mt-1">✔</span>
                <div>
                  Root cause found in{" "}
                  <span className="text-white">src/index.js</span> <br />
                  <span className="text-gray-500 text-[10px] md:text-xs mt-1 block">
                    Agent generated fix: Added `const express =
                    require('express');`
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Feature Grid Section (No changes here, kept for completeness) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-12 md:pt-16 border-t border-white/5">
          {/* Feature 1 */}
          <Card className="bg-white/[0.02] border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 p-6 md:p-8">
            <div className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Zap className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
              Lightning Fast Fixes
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed overflow-hidden">
              Our AI reads your error logs the second you paste them. No waiting
              around—get the exact solution you need instantly.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-white/[0.02] border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 p-6 md:p-8">
            <div className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Code2 className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
              Reads Your Actual Code
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed overflow-hidden">
              It doesn't just guess blindly. The AI connects to your GitHub,
              looks at your specific files, and finds out exactly where the
              mistake is.
            </p>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-white/[0.02] border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 p-6 md:p-8">
            <div className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
              Paste Any Error Log
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed overflow-hidden">
              Whether your app crashed on Vercel, Render, AWS, or your own
              computer, just copy the raw text and paste it here. We'll handle
              the rest.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
