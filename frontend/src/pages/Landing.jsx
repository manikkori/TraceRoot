import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Github,
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
    <div className="max-w-7xl mx-auto p-6 space-y-24 py-20 animate-fade-in relative z-10">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-devAccent/20 blur-[120px] -z-10 rounded-full pointer-events-none"></div>

      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-devBorder bg-devCard/50 text-devAccent mb-4">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-devAccent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wide uppercase">
            RepoRescue AI v1.0 Live
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-devText leading-tight">
          Autonomous Debugging <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            for Modern Teams
          </span>
        </h1>

        <p className="text-xl text-devMuted max-w-2xl mx-auto leading-relaxed">
          Paste your crash logs and GitHub repository. Our AI clones your code,
          analyzes the stack trace, and pinpoints the exact root cause in
          seconds.
        </p>

        <div className="flex justify-center gap-4 pt-6">
          <Button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 text-lg"
          >
            Launch Workspace <ArrowRight className="w-5 h-5" />
          </Button>
          <a
            href="https://github.com/manikkori"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-lg font-medium transition-all duration-200 border border-devBorder bg-devCard hover:bg-[#27272a] text-devText flex items-center gap-2"
          >
            <Github className="w-5 h-5" /> View Source
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-devBorder">
        <Card className="space-y-4 hover:border-devAccent/50 transition-colors duration-300">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-devAccent border border-blue-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-devText">
            Lightning Fast Analysis
          </h3>
          <p className="text-devMuted text-sm">
            Processes massive codebases and complex stack traces in under 5
            seconds.
          </p>
        </Card>

        <Card className="space-y-4 hover:border-devAccent/50 transition-colors duration-300">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-devAccent border border-blue-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-devText">
            Iterative Agent Loop
          </h3>
          <p className="text-devMuted text-sm">
            Clones repositories, navigates directories, and reads specific files
            dynamically.
          </p>
        </Card>

        <Card className="space-y-4 hover:border-devAccent/50 transition-colors duration-300">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-devAccent border border-blue-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-devText">
            Production Ready
          </h3>
          <p className="text-devMuted text-sm">
            Built to handle raw deployment logs from Render, Vercel, and AWS
            seamlessly.
          </p>
        </Card>
      </div>
    </div>
  );
}
