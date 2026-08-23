import React, { useState } from "react";
import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { TextArea } from "../components/ui/TextArea";
import { investigateBug } from "../services/api";

export function Dashboard() {
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
    <div className="max-w-6xl mx-auto p-6 space-y-8 py-12">
      <div className="text-center space-y-2 mb-12">
        <h1 className="text-4xl font-bold text-neuText flex items-center justify-center gap-3">
          <Activity className="w-10 h-10 text-neuAccent" />
          TraceRoot Engine
        </h1>
        <p className="text-gray-500">Autonomous Bug Investigation Dashboard</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-6 text-neuText">
              1. Investigation Target
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-500">
                  GitHub Repository URL
                </label>
                <Input
                  placeholder="https://github.com/username/repo"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-500">
                  Error Log / Stack Trace
                </label>
                <TextArea
                  placeholder="Paste your error trace here..."
                  value={errorLog}
                  onChange={(e) => setErrorLog(e.target.value)}
                  rows={10}
                />
              </div>
              <Button
                onClick={handleInvestigate}
                disabled={loading}
                className="w-full mt-4"
              >
                {loading ? "Processing Agent Loop..." : "Run Investigation"}
              </Button>

              {error && (
                <div className="mt-4 p-4 rounded-xl text-red-500 shadow-neu-pressed flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full min-h-[500px]">
            <h2 className="text-xl font-semibold mb-6 text-neuText">
              2. Agent Analysis
            </h2>

            {!result && !loading && (
              <div className="h-[300px] flex items-center justify-center text-gray-400 font-medium">
                Enter details and run investigation to see results.
              </div>
            )}

            {loading && (
              <div className="h-[300px] flex flex-col items-center justify-center text-neuAccent space-y-6">
                <div className="w-12 h-12 border-4 border-neuBg border-t-neuAccent rounded-full animate-spin shadow-neu-flat"></div>
                <p className="animate-pulse font-medium">
                  AI Agent is cloning and reading code...
                </p>
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-5 rounded-xl shadow-neu-pressed">
                  <h3 className="font-bold flex items-center gap-2 text-red-500 mb-2">
                    <AlertTriangle className="w-5 h-5" /> Root Cause
                  </h3>
                  <p className="text-sm text-neuText leading-relaxed">
                    {result.rootCause}
                  </p>
                </div>

                <div className="p-5 rounded-xl shadow-neu-pressed">
                  <h3 className="font-bold flex items-center gap-2 text-neuAccent mb-2">
                    <Activity className="w-5 h-5" /> Explanation
                  </h3>
                  <p className="text-sm text-neuText leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

                <div className="p-5 rounded-xl shadow-neu-pressed">
                  <h3 className="font-bold flex items-center gap-2 text-green-500 mb-2">
                    <CheckCircle className="w-5 h-5" /> Suggested Fix
                  </h3>
                  <div className="mt-2 p-3 bg-gray-100 rounded-lg shadow-inner">
                    <code className="text-sm text-gray-800 break-words">
                      {result.suggestedFix}
                    </code>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6 pt-6 border-t border-gray-300/50">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-4 h-4" />{" "}
                    {(result.investigationTimeMs / 1000).toFixed(2)}s
                  </span>
                  <span>•</span>
                  <span className="font-medium">
                    Files read: {result.filesExamined.length}
                  </span>
                  <span>•</span>
                  <span className="font-medium">
                    Iterations: {result.iterations}
                  </span>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
