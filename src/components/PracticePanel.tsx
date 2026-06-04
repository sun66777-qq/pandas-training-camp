import { useState, useEffect } from "react";
import {
  Code,
  Terminal,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Play,
  RotateCcw,
  ListChecks,
} from "lucide-react";
import { PracticeCode } from "../data/projectDetails";

interface PracticePanelProps {
  projectId: number;
  practice: PracticeCode;
}

export default function PracticePanel({ projectId, practice }: PracticePanelProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const localStorageKey = `practice-${projectId}`;

  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      const data = JSON.parse(saved);
      setActiveStepIndex(data.activeStepIndex || 0);
      setCompletedSteps(data.completedSteps || []);
      const stepCode = data.stepCodes?.[data.activeStepIndex || 0];
      setCode(stepCode || practice.steps[data.activeStepIndex || 0].code);
    } else {
      setCode(practice.steps[0].code);
    }
  }, [projectId, practice.steps, localStorageKey]);

  const saveToLocalStorage = (
    stepIdx: number,
    newCode: string,
    newCompleted: number[]
  ) => {
    const saved = localStorage.getItem(localStorageKey);
    const current = saved ? JSON.parse(saved) : {};
    const stepCodes = [...(current.stepCodes || [])];
    stepCodes[stepIdx] = newCode;
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        ...current,
        activeStepIndex: stepIdx,
        completedSteps: newCompleted,
        stepCodes,
      })
    );
  };

  const handleStepClick = (index: number) => {
    setActiveStepIndex(index);
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      const data = JSON.parse(saved);
      const stepCode = data.stepCodes?.[index];
      setCode(stepCode || practice.steps[index].code);
    } else {
      setCode(practice.steps[index].code);
    }
  };

  const handleRun = () => {
    setOutput(practice.steps[activeStepIndex].feedback);
    if (!completedSteps.includes(activeStepIndex)) {
      const newCompleted = [...completedSteps, activeStepIndex];
      setCompletedSteps(newCompleted);
      saveToLocalStorage(activeStepIndex, code, newCompleted);
    }
  };

  const handleReset = () => {
    setCode(practice.steps[activeStepIndex].code);
    setOutput("");
  };

  const handleLoadExample = () => {
    setCode(practice.referenceCode);
    setOutput("示例代码已加载，你可以运行它！");
  };

  return (
    <div className="flex gap-6 flex-col md:flex-row min-h-[600px]">
      {/* Left Panel: Instructions - 30% */}
      <div className="w-full md:w-3/10">
        <div className="glass-card rounded-2xl p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
              <Code className="w-5 h-5 text-dark-bg" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">实操练习</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Python就绪
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-text-primary mb-2">项目介绍</h4>
            <p className="text-text-secondary text-sm">{practice.intro}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-text-primary mb-2">学习目标</h4>
            <ul className="text-sm space-y-1">
              {practice.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                  <span className="text-text-secondary">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
              <ListChecks className="w-4 h-4" />
              步骤
            </h4>
            <div className="space-y-2">
              {practice.steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    activeStepIndex === index
                      ? "bg-neon-cyan/10 border border-neon-cyan/30"
                      : "bg-dark-card-hover border border-transparent hover:border-dark-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        completedSteps.includes(index)
                          ? "bg-emerald-500 text-dark-bg"
                          : activeStepIndex === index
                          ? "bg-gradient-to-br from-neon-cyan to-neon-purple text-dark-bg"
                          : "bg-dark-border text-text-secondary"
                      }`}
                    >
                      {completedSteps.includes(index) ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-text-primary text-sm">
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {activeStepIndex === index && (
                    <div className="mt-3 pl-9 text-text-secondary text-xs">
                      {step.description}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400 mt-0.5" />
              <div>
                <h5 className="font-medium text-amber-300 text-sm">提示</h5>
                <ul className="mt-1 text-text-secondary text-xs space-y-1">
                  {practice.tips.map((tip, i) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleLoadExample}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-glow text-dark-bg text-sm py-2 px-4 rounded-xl transition-all"
            >
              <Code className="w-4 h-4" />
              加载完整示例代码
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Code Editor - 70% */}
      <div className="w-full md:w-7/10 glass-card rounded-2xl overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-dark-border flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-text-secondary text-xs ml-2">
            practice-{projectId}.py
          </span>
        </div>
        
        {/* Step Details */}
        <div className="p-4 border-b border-dark-border bg-dark-card-hover">
          <h3 className="font-bold text-text-primary mb-2">
            {practice.steps[activeStepIndex].title}
          </h3>
          <div className="mb-3">
            <span className="text-xs font-medium text-neon-cyan mb-1 block">🎯 本步骤目标</span>
            <p className="text-text-secondary text-sm">{practice.steps[activeStepIndex].goal}</p>
          </div>
          <div className="mb-3">
            <span className="text-xs font-medium text-neon-cyan mb-1 block">📋 操作指引</span>
            <ul className="text-text-secondary text-sm space-y-1 ml-4">
              {practice.steps[activeStepIndex].instructions.map((inst, i) => (
                <li key={i} className="list-disc">{inst}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-xs font-medium text-neon-cyan mb-1 block">📤 预期输出</span>
            <p className="text-text-secondary text-sm italic">{practice.steps[activeStepIndex].expectedOutput}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-dark-bg text-neon-cyan font-mono text-sm p-4 resize-none focus:outline-none"
            spellCheck="false"
            placeholder="# 在这输入Python代码..."
          />
        </div>

        <div className="border-t border-dark-border p-4 flex gap-3">
          <button
            onClick={handleRun}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-glow text-dark-bg text-sm py-3 px-4 rounded-xl font-semibold transition-all"
          >
            <Play className="w-4 h-4" />
            运行 / 检查
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 bg-dark-card-hover border border-dark-border text-text-primary text-sm py-3 px-4 rounded-xl hover:bg-dark-border transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
        </div>

        {output && (
          <div className="border-t border-dark-border bg-dark-card-hover p-4">
            <div className="flex items-center gap-2 text-text-secondary text-xs mb-2">
              <Terminal className="w-4 h-4" />
              <span>输出 / 提示</span>
            </div>
            <pre className="text-emerald-400 text-sm whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
