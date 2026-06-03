import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Database, Tag, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { projects } from "../data/projects";
import { projectDetails, type KnowledgePoint, type QuizQuestion } from "../data/projectDetails";

const difficultyColors = {
  入门: "bg-emerald-500/20 text-emerald-400",
  进阶: "bg-amber-500/20 text-amber-400",
  高级: "bg-red-500/20 text-red-400",
};

type TabType = "learn" | "practice" | "test";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("learn");
  const [learnCompleted, setLearnCompleted] = useState(false);
  const [expandedQuiz, setExpandedQuiz] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [practiceCode, setPracticeCode] = useState("");
  const [showReference, setShowReference] = useState(false);
  const [checkResult, setCheckResult] = useState("");

  const project = projects.find((p) => p.id === Number(id));
  const detail = project ? projectDetails[project.id] : null;

  if (!project || !detail) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">项目不存在</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const tabs: { key: TabType; label: string }[] = [
    { key: "learn", label: "学习" },
    { key: "practice", label: "实操" },
    { key: "test", label: "测试" },
  ];

  const handleQuizToggle = (pointIndex: number, quizIndex: number) => {
    const key = `${pointIndex}-${quizIndex}`;
    setExpandedQuiz((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTestAnswer = (questionId: number, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let correct = 0;
    detail.test.forEach((q) => {
      if (quizAnswers[q.id] === String(q.correctAnswer)) {
        correct++;
      }
    });
    return Math.round((correct / detail.test.length) * 100);
  };

  const handleSubmitTest = () => {
    setShowResults(true);
  };

  const handleCheckPractice = () => {
    setCheckResult(detail.practice.feedback);
  };

  const handleViewReference = () => {
    setShowReference(true);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-lg border-b border-dark-border">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回项目列表
          </button>

          <div className="flex flex-wrap items-start gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary font-bold text-lg">
              {project.id}
            </span>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className={`px-3 py-1 rounded-full ${difficultyColors[project.difficulty]}`}>
                  {project.difficulty}
                </span>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Clock className="w-4 h-4" />
                  {project.duration}
                </span>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Database className="w-4 h-4" />
                  {project.dataset}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-primary text-white"
                    : "bg-dark-card text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 学习模块 */}
        {activeTab === "learn" && (
          <div className="space-y-8">
            {detail.learning.map((point: KnowledgePoint, pointIndex: number) => (
              <div
                key={pointIndex}
                className="bg-dark-card rounded-2xl p-6 border border-dark-border"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  {point.title}
                </h2>

                <p className="text-slate-300 mb-4">{point.content}</p>

                {point.codeExample && (
                  <div className="bg-dark-bg rounded-xl p-4 mb-6 overflow-x-auto">
                    <pre className="font-mono text-sm text-slate-300">
                      <code>{point.codeExample}</code>
                    </pre>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-200">理解自测</h3>
                  {point.quiz.map((q, quizIndex) => {
                    const key = `${pointIndex}-${quizIndex}`;
                    const isExpanded = expandedQuiz[key];
                    return (
                      <div key={quizIndex} className="bg-dark-bg rounded-xl overflow-hidden">
                        <button
                          onClick={() => handleQuizToggle(pointIndex, quizIndex)}
                          className="w-full p-4 text-left flex items-center justify-between"
                        >
                          <span className="font-medium text-slate-200">
                            {quizIndex + 1}. {q.question}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-dark-border">
                            <div className="mt-4 space-y-2">
                              {q.options?.map((option, optIdx) => {
                                const optionLetter = String.fromCharCode(65 + optIdx);
                                const isCorrect = optionLetter === q.answer || option === q.answer;
                                return (
                                  <div
                                    key={optIdx}
                                    className={`p-3 rounded-lg ${
                                      isCorrect
                                        ? "bg-emerald-500/20 text-emerald-400"
                                        : "bg-dark-card text-slate-400"
                                    }`}
                                  >
                                    {option}
                                    {isCorrect && (
                                      <Check className="inline w-4 h-4 ml-2" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                              <p className="text-primary font-medium mb-1">答案解析</p>
                              <p className="text-slate-300 text-sm">{q.explanation}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              onClick={() => setLearnCompleted(true)}
              disabled={learnCompleted}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                learnCompleted
                  ? "bg-emerald-500/20 text-emerald-400 cursor-default"
                  : "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
              }`}
            >
              {learnCompleted ? (
                <span className="inline-flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  已标记为已学
                </span>
              ) : (
                "标记为已学"
              )}
            </button>
          </div>
        )}

        {/* 实操模块 */}
        {activeTab === "practice" && (
          <div className="space-y-6">
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-4">代码练习</h2>
              <p className="text-slate-400 mb-4">
                请在下方代码编辑器中补充或修改 <code className="text-primary"># TODO</code> 部分的代码。
                点击"检查"按钮获取反馈，或点击"查看参考答案"查看完整代码。
              </p>

              <div className="bg-dark-bg rounded-xl p-4 mb-4">
                <textarea
                  value={practiceCode || detail.practice.starterCode}
                  onChange={(e) => setPracticeCode(e.target.value)}
                  className="w-full h-80 bg-transparent font-mono text-sm text-slate-300 resize-none focus:outline-none"
                  placeholder="在此输入代码..."
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCheckPractice}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  运行/检查
                </button>
                <button
                  onClick={handleViewReference}
                  className="px-6 py-3 bg-dark-bg border border-dark-border text-slate-300 rounded-xl font-medium hover:border-primary/50 transition-colors"
                >
                  查看参考答案
                </button>
              </div>

              {checkResult && (
                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                  <p className="text-amber-400 font-medium mb-2">反馈结果</p>
                  <p className="text-slate-300 text-sm">{checkResult}</p>
                </div>
              )}

              {showReference && (
                <div className="mt-6">
                  <p className="text-slate-400 font-medium mb-3">参考答案</p>
                  <div className="bg-dark-bg rounded-xl p-4 overflow-x-auto">
                    <pre className="font-mono text-sm text-slate-300">
                      <code>{detail.practice.referenceCode}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 测试模块 */}
        {activeTab === "test" && (
          <div className="space-y-6">
            <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-2">项目测试</h2>
              <p className="text-slate-400 mb-6">
                共 {detail.test.length} 道题，总分 100 分，通过分数 80 分
              </p>

              <div className="space-y-6">
                {detail.test.map((q: QuizQuestion) => (
                  <div key={q.id} className="bg-dark-bg rounded-xl p-5">
                    <p className="font-medium text-slate-200 mb-4">
                      {q.id}. {q.question}
                      {q.type !== "fill" && (
                        <span className="text-slate-500 text-sm ml-2">
                          ({q.type === "choice" ? "选择题" : "判断题"})
                        </span>
                      )}
                    </p>

                    {q.type === "fill" ? (
                      <input
                        type="text"
                        value={quizAnswers[q.id] || ""}
                        onChange={(e) => handleTestAnswer(q.id, e.target.value)}
                        disabled={showResults}
                        placeholder="请填空..."
                        className="w-full px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-slate-200 focus:outline-none focus:border-primary"
                      />
                    ) : q.type === "truefalse" ? (
                      <div className="flex gap-4">
                        {["正确", "错误"].map((option) => (
                          <button
                            key={option}
                            onClick={() => handleTestAnswer(q.id, option)}
                            disabled={showResults}
                            className={`px-6 py-2 rounded-lg transition-all ${
                              quizAnswers[q.id] === option
                                ? "bg-primary text-white"
                                : "bg-dark-card text-slate-400 hover:text-white"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {q.options?.map((option, optIdx) => {
                          const optionLetter = String.fromCharCode(65 + optIdx);
                          const isSelected = quizAnswers[q.id] === optionLetter;
                          const isCorrect = String(q.correctAnswer) === optionLetter;
                          let bgClass = "bg-dark-card";
                          if (showResults) {
                            if (isCorrect) bgClass = "bg-emerald-500/20 text-emerald-400";
                            else if (isSelected) bgClass = "bg-red-500/20 text-red-400";
                          } else if (isSelected) {
                            bgClass = "bg-primary/20 text-primary border border-primary";
                          }
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleTestAnswer(q.id, optionLetter)}
                              disabled={showResults}
                              className={`w-full p-3 rounded-lg text-left transition-all ${bgClass}`}
                            >
                              {optionLetter}. {option}
                              {showResults && isCorrect && (
                                <Check className="inline w-4 h-4 ml-2" />
                              )}
                              {showResults && isSelected && !isCorrect && (
                                <X className="inline w-4 h-4 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {showResults && (
                      <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                        <p className="text-primary font-medium mb-1">答案解析</p>
                        <p className="text-slate-300 text-sm">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!showResults ? (
                <button
                  onClick={handleSubmitTest}
                  disabled={Object.keys(quizAnswers).length < detail.test.length}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  提交测试
                </button>
              ) : (
                <div className="mt-6">
                  <div
                    className={`p-6 rounded-xl text-center ${
                      calculateScore() >= 80
                        ? "bg-emerald-500/20 border border-emerald-500/30"
                        : "bg-red-500/20 border border-red-500/30"
                    }`}
                  >
                    <p
                      className={`text-3xl font-bold mb-2 ${
                        calculateScore() >= 80 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {calculateScore()} 分
                    </p>
                    <p
                      className={`font-medium ${
                        calculateScore() >= 80 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {calculateScore() >= 80 ? (
                        <span className="inline-flex items-center gap-2">
                          <Check className="w-5 h-5" />
                          测试通过，获得徽章！
                        </span>
                      ) : (
                        "未通过，需要80分才能通过测试"
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setQuizAnswers({});
                    }}
                    className="w-full mt-4 py-3 bg-dark-bg border border-dark-border text-slate-300 rounded-xl font-medium hover:border-primary/50 transition-colors"
                  >
                    重新测试
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
