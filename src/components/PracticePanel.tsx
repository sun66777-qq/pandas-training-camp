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
    <div className="flex gap-4 flex-col md:flex-row min-h-[600px] bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
      {/* Left Panel: Instructions */}
      <div className="w-full md:w-2/5 p-6 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">实操练习</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 border border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Python就绪
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">项目介绍</h4>
          <p className="text-gray-600 text-sm">{practice.intro}</p>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">学习目标</h4>
          <ul className="text-sm space-y-1">
            {practice.goals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                <span className="text-gray-600">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
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
                    ? "bg-primary-50 border border-primary-200 shadow-sm"
                    : "bg-gray-50 border border-transparent hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      completedSteps.includes(index)
                        ? "bg-green-500 text-white"
                        : activeStepIndex === index
                        ? "bg-primary-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {step.title}
                    </div>
                  </div>
                </div>
                {activeStepIndex === index && (
                  <div className="mt-3 pl-9 text-gray-600 text-xs">
                    {step.description}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-yellow-800 text-sm">提示</h5>
              <ul className="mt-1 text-yellow-700 text-xs space-y-1">
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
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded-lg transition-colors"
          >
            <Code className="w-4 h-4" />
            加载完整示例代码
          </button>
        </div>
      </div>

      {/* Right Panel: Code Editor */}
      <div className="flex-1 bg-gray-900 flex flex-col">
        <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-xs ml-2">
              practice-{projectId}.py
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-gray-900 text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none"
            spellCheck="false"
            placeholder="# 在这输入Python代码..."
          />
        </div>

        <div className="border-t border-gray-700 p-3 flex gap-2">
          <button
            onClick={handleRun}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-lg transition-colors"
          >
            <Play className="w-4 h-4" />
            运行 / 检查
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
        </div>

        {output && (
          <div className="border-t border-gray-700 bg-gray-800 p-4">
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
              <Terminal className="w-4 h-4" />
              <span>输出 / 提示</span>
            </div>
            <pre className="text-green-400 text-sm whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
