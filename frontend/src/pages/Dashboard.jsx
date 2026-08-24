import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TerminalSquare,
  GitBranch,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { TextArea } from "../components/ui/TextArea";
import { investigateBug } from "../services/api";

export function Dashboard() {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState("");
  const [errorLog, setErrorLog] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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
    <div className="max-w-7xl mx-auto p-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-devBorder">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-devBorder rounded-lg transition-colors text-devMuted hover:text-devText"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-devText flex items-center gap-2">
              <img src="/image.png" alt="Logo" className="w-8 h-8 bg-white p-1 rounded-md object-contain" />
              RepoRescue AI
            </h1>
            <p className="text-sm text-devMuted mt-1">
              Investigation Workspace
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Column */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-6 text-devText flex items-center gap-2">
              <TerminalSquare className="w-5 h-5 text-devMuted" /> Configure
              Target
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-devMuted flex items-center gap-2">
                  <GitBranch className="w-4 h-4" /> GitHub URL
                </label>
                <Input
                  placeholder="https://github.com/username/repo"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-devMuted">
                  Stack Trace / Crash Log
                </label>
                <TextArea
                  placeholder="Paste your Render/Vercel error logs here..."
                  value={errorLog}
                  onChange={(e) => setErrorLog(e.target.value)}
                  rows={8}
                />
              </div>
              <Button
                onClick={handleInvestigate}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Initializing Agent..." : "Start Investigation"}
              </Button>

              {error && (
                <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7">
          <Card className="h-full min-h-[500px] flex flex-col bg-[#0f0f11]">
            <h2 className="text-lg font-semibold mb-6 text-devText flex items-center gap-2">
              Agent Output
            </h2>

            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-devMuted space-y-4">
                <Activity className="w-12 h-12 opacity-20" />
                <p className="text-sm">Awaiting investigation parameters...</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-devBorder rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-devAccent border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-devAccent font-medium animate-pulse">
                    Cloning repository & analyzing files...
                  </p>
                  <p className="text-xs text-devMuted font-mono">
                    Tracing node modules and imports
                  </p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-fade-in flex-1">
                {/* Stats Bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-devMuted bg-black/50 p-3 rounded-lg border border-devBorder">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />{" "}
                    {(result.investigationTimeMs / 1000).toFixed(2)}s execution
                  </span>
                  <span className="opacity-30">|</span>
                  <span>{result.filesExamined.length} files read</span>
                  <span className="opacity-30">|</span>
                  <span>{result.iterations} loop iterations</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-red-400">
                    <AlertTriangle className="w-4 h-4" /> Root Cause Found
                  </h3>
                  <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <p className="text-sm text-devText leading-relaxed">
                      {result.rootCause}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-devAccent">
                    <Activity className="w-4 h-4" /> Technical Explanation
                  </h3>
                  <p className="text-sm text-devMuted leading-relaxed px-1">
                    {result.explanation}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4" /> Suggested Resolution
                  </h3>
                  <div className="p-4 bg-[#1e1e1e] border border-devBorder rounded-lg shadow-inner overflow-x-auto">
                    <code className="text-sm text-green-300 font-mono whitespace-pre-wrap">
                      {result.suggestedFix}
                    </code>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
