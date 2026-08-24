import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
 
  Zap,
  ShieldCheck,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-24 py-20 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-neu-pressed text-neuAccent mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neuAccent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
          </span>
          <span className="text-sm font-bold tracking-wide uppercase">
            TraceRoot Engine v1.0 is Live
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-neuText leading-tight">
          Your Autonomous <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
            Debugging Agent
          </span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Paste your crash logs and GitHub repository. Our AI agent clones your
          code, reads the files, and finds the exact root cause in seconds.
        </p>

        <div className="flex justify-center gap-6 pt-4">
          <Button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-8 py-4 text-lg"
          >
            Launch Agent <ArrowRight className="w-5 h-5" />
          </Button>
          <a
            href="https://github.com/manikkori"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-xl font-semibold transition-all duration-200 bg-neuBg text-neuText shadow-neu-flat hover:shadow-neu-pop active:shadow-neu-pressed flex items-center gap-2"
          >
            <Terminal className="w-5 h-5" /> View Source
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-300/50">
        <Card className="text-center space-y-4 hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto rounded-full shadow-neu-pressed flex items-center justify-center text-neuAccent">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-neuText">Lightning Fast</h3>
          <p className="text-gray-500 text-sm">
            Analyzes massive codebases and stack traces in under 5 seconds to
            deliver actionable fixes.
          </p>
        </Card>

        <Card className="text-center space-y-4 hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto rounded-full shadow-neu-pressed flex items-center justify-center text-neuAccent">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-neuText">Agentic Loop</h3>
          <p className="text-gray-500 text-sm">
            Doesn't just guess. It clones your repo, requests specific files,
            and reads your actual code.
          </p>
        </Card>

        <Card className="text-center space-y-4 hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto rounded-full shadow-neu-pressed flex items-center justify-center text-neuAccent">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-neuText">Production Ready</h3>
          <p className="text-gray-500 text-sm">
            Handles raw Render, Vercel, and AWS crash logs with complex stack
            traces seamlessly.
          </p>
        </Card>
      </div>

      {/* How it Works / CLI Demo Visual */}
      <div className="max-w-4xl mx-auto pt-12">
        <div className="p-1 rounded-2xl shadow-neu-flat bg-neuBg">
          <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-neu-pressed">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="font-mono text-sm text-green-400 space-y-2">
              <p>&gt; TraceRoot Agent initialized...</p>
              <p>&gt; Fetching repository: https://github.com/your-org/app</p>
              <p>
                &gt; Analyzing stack trace: ReferenceError: express is not
                defined
              </p>
              <p className="text-blue-400">
                &gt; Requesting file: src/index.js
              </p>
              <p>&gt; Root cause identified at line 10. Fix generated.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
