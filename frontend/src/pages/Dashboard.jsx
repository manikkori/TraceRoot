import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TerminalSquare,
  GitBranch,
  ArrowLeft,
  ArrowRight,
  CornerDownRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { TextArea } from "../components/ui/TextArea";
import { investigateBug } from "../services/api";

import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

export function Dashboard() {
  const navigate = useNavigate();


  const { isSignedIn, isLoaded } = useUser();

  // UI States
  const [repoUrl, setRepoUrl] = useState("");
  const [errorLog, setErrorLog] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  
  if (!isLoaded) {
    return (
      <div className="h-screen w-screen bg-[#09090b] flex items-center justify-center">
        <Activity className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }


  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const handleInvestigate = async () => {
    if (!repoUrl || !errorLog) {
      setError("Please provide both Repository URL and Error Log.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await investigateBug(repoUrl, errorLog);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-blue-500/30">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 bg-[url('https://res.cloudinary.com/dntjnq39e/image/upload/v1703144869/grid_ptq1m1.svg')] bg-center mask-image opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Sleek Header */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <img
                src="/favicon.png"
                alt="Logo"
                className="w-8 h-8 md:w-9 md:h-9 bg-white p-1 rounded-lg object-contain"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Investigation Workspace
                </h1>
                <p className="text-xs md:text-sm text-gray-400 mt-0.5">
                  RepoRescue AI • Trace-Root Agent
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/")}
              className="!px-3 !py-1.5 !text-xs !rounded-md bg-white/5 hover:bg-white/10 shadow-none border border-white/10 hidden sm:flex items-center gap-1.5"
            >
              Back to Home <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Column */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-[#0f0f11] border-white/5 shadow-xl">
              <h2 className="text-lg font-semibold mb-6 text-white flex items-center gap-2.5">
                <TerminalSquare className="w-5 h-5 text-gray-500" /> Configure
                Target
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2.5 text-gray-300 flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-gray-500" /> GitHub
                    Repository URL
                  </label>
                  <Input
                    placeholder="https://github.com/username/repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2.5 text-gray-300">
                    Stack Trace / Crash Log Output
                  </label>
                  <TextArea
                    placeholder="Paste the raw error logs from Vercel/Render/Terminal..."
                    value={errorLog}
                    onChange={(e) => setErrorLog(e.target.value)}
                    rows={10}
                    className="font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 scrollbar-thin"
                  />
                </div>
                <Button
                  onClick={handleInvestigate}
                  disabled={loading}
                  className="w-full !py-3.5 text-base shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 animate-spin" />
                      Initializing Agent...
                    </div>
                  ) : (
                    "Start Investigation"
                  )}
                </Button>

                {error && (
                  <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 animate-fade-in">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7">
            <Card className="h-full min-h-[500px] flex flex-col bg-[#0f0f11] border-white/5 relative overflow-hidden shadow-2xl">
              {/* Decorative gradient corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full pointer-events-none"></div>

              <h2 className="text-lg font-semibold mb-6 text-white flex items-center gap-2.5 relative z-10">
                Agent Trace Output
              </h2>

              {!result && !loading && (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-600 space-y-6 relative z-10 py-16">
                  <TerminalSquare
                    className="w-16 h-16 opacity-30"
                    strokeWidth={1}
                  />
                  <div className="text-center space-y-1.5">
                    <p className="font-medium text-gray-400">
                      Awaiting Investigation Parameters
                    </p>
                    <p className="text-sm text-gray-600 max-w-xs">
                      Fill in the target repository URL and crash logs on the
                      left to start the autonomous agent loop.
                    </p>
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex-1 flex flex-col items-center justify-center space-y-8 relative z-10 py-16 animate-fade-in">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500/10 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="text-center space-y-2.5">
                    <p className="text-blue-400 text-lg font-medium animate-pulse">
                      Cloning repository & analyzing code structure...
                    </p>
                    <p className="text-xs text-gray-600 font-mono bg-white/5 px-3 py-1 rounded-md">
                      Navigating file system
                    </p>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-8 animate-fade-in flex-1 relative z-10">
                  {/* Execution Stats */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-gray-500 bg-white/[0.02] p-4 rounded-lg border border-white/5 shadow-inner">
                    <span className="flex items-center gap-1.5 text-blue-300">
                      <Clock className="w-3.5 h-3.5" />{" "}
                      {(result.investigationTimeMs / 1000).toFixed(2)}s
                      execution
                    </span>
                    <span className="text-gray-700 hidden sm:inline">|</span>
                    <span className="text-green-300">
                      {result.filesExamined.length} files analyzed
                    </span>
                    <span className="text-gray-700 hidden sm:inline">|</span>
                    <span className="text-gray-400">
                      {result.iterations} loop iterations
                    </span>
                  </div>

                  {/* Root Cause found */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-red-400">
                      <AlertTriangle className="w-4 h-4" /> Final Diagnosis
                      Found
                    </h3>
                    <div className="p-5 bg-red-950/20 border border-red-500/20 rounded-xl shadow-lg">
                      <p className="text-base text-gray-100 font-medium leading-relaxed">
                        {result.rootCause}
                      </p>
                    </div>
                  </div>

                  {/* Technical Explanation */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-300">
                      <CornerDownRight className="w-4 h-4 text-blue-500" />{" "}
                      Technical Reasoning
                    </h3>
                    <div className="prose prose-sm prose-invert max-w-none text-gray-400 leading-relaxed space-y-2.5 pl-1.5">
                      <p>{result.explanation}</p>
                    </div>
                  </div>

                  {/* Suggested Fix */}
                  <div className="space-y-3 pt-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" /> Recommended Resolution
                    </h3>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
                      <div className="p-5 bg-[#141416] border border-white/5 rounded-xl shadow-inner relative overflow-x-auto scrollbar-thin">
                        <code className="text-sm text-green-300 font-mono whitespace-pre-wrap leading-relaxed">
                          {result.suggestedFix}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
