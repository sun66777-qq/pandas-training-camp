import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Database, Tag, Check, X, ChevronDown, ChevronUp, BookOpen, Code2, CheckCircle2 } from "lucide-react";
import { projects } from "../data/projects";
import { projectDetails } from "../data/projectDetails";
import { useProgressStore } from "../store/useProgressStore";

const difficultyColors = {
  入门: "bg-emerald-100 text-emerald-700",
  进阶: "bg-amber-100 text-amber-700",
  高级: "bg-red-100 text-red-700",
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
  const { updateProjectProgress, projects: progressProjects } = useProgressStore();

  const isCompleted = progressProjects.find((p) => p.id === Number(id))?.completed;

  if (!project || !detail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">项目不存在</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tabs: { key: TabType; label: string; icon: any }[] = [
    { key: "learn", label: "学习", icon: BookOpen },
    { key: "practice", label: "实操", icon: Code2 },
    { key: "test", label: "测试", icon: CheckCircle2 },
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
    const score = calculateScore();
    if (score >= 80) {
      updateProjectProgress(project.id, true, score);
    }
  };

  const handleCheckPractice = () => {
    setCheckResult(detail.practice.feedback);
  };

  const handleViewReference = () => {
    setShowReference(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回项目列表
            </button>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100 text-primary-600 font-bold">
                {project.id}
              </span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${difficultyColors[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {project.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Database className="w-4 h-4" />
                    {project.dataset}
                  </span>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-sm text-success-600 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      已完成
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 border-b border-gray-200 -mx-4 px-4 md:mx-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                    activeTab === tab.key
                      ? "text-primary-600 border-primary-600"
                      : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Learning module */}
        {activeTab === "learn" && (
          <div className="max-w-4xl mx-auto space-y-6">
            {detail.learning.map((point, pointIndex) => (
              <div
                key={pointIndex}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <Tag className="w-5 h-5 text-primary-600" />
                  {point.title}
                </h2>

                <p className="text-gray-700 mb-4">{point.content}</p>

                {point.codeExample && (
                  <div className="bg-gray-900 rounded-xl p-4 mb-6 overflow-x-auto">
                    <pre className="font-mono text-sm text-gray-100">
                      <code>{point.codeExample}</code>
                    </pre>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">理解自测</h3>
                  {point.quiz.map((q, quizIndex) => {
                    const key = `${pointIndex}-${quizIndex}`;
                    const isExpanded = expandedQuiz[key];
                    return (
                      <div key={quizIndex} className="bg-gray-50 rounded-xl overflow-hidden">
                        <button
                          onClick={() => handleQuizToggle(pointIndex, quizIndex)}
                          className="w-full p-4 text-left flex items-center justify-between"
                        >
                          <span className="font-medium text-gray-800">
                            {quizIndex + 1}. {q.question}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-gray-200 pt-4">
                            <div className="space-y-2 mb-4">
                              {q.options?.map((option, optIdx) => {
                                const isCorrect = option === q.answer;
                                return (
                                  <div
                                    key={optIdx}
                                    className={`p-3 rounded-lg ${
                                      isCorrect
                                        ? "bg-success-100 text-success-800"
                                        : "bg-white border border-gray-200 text-gray-700"
                                    }`}
                                  >
                                    {option}
                                    {isCorrect && <Check className="inline w-4 h-4 ml-2" />}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                              <p className="text-primary-700 font-medium mb-1">答案解析</p>
                              <p className="text-gray-700 text-sm">{q.explanation}</p>
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
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                learnCompleted
                  ? "bg-success-100 text-success-700 cursor-default"
                  : "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:-translate-y-0.5 shadow-card hover:shadow-cardLifted"
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

        {/* Practice module */}
        {activeTab === "practice" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card">
              <h2 className="text-xl font-bold mb-4 text-gray-900">代码练习</h2>
              <p className="text-gray-600 mb-6">
                请在下方代码编辑器中补充或修改 <code className="bg-gray-100 px-1 py-0.5 rounded text-primary-700"># TODO</code> 部分的代码。
                点击检查按钮获取反馈，或者查看完整参考代码。
              </p>

              <div className="bg-gray-900 rounded-xl p-4 mb-6">
                <textarea
                  value={practiceCode || detail.practice.starterCode}
                  onChange={(e) => setPracticeCode(e.target.value)}
                  className="w-full h-80 bg-transparent font-mono text-sm text-gray-100 resize-none focus:outline-none"
                  placeholder="在此输入代码..."
                />
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={handleCheckPractice}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 hover:-translate-y-0.5 shadow-card hover:shadow-cardLifted transition-all"
                >
                  运行 / 检查
                </button>
                <button
                  onClick={handleViewReference}
                  className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:-translate-y-0.5 shadow-card hover:shadow-cardLifted transition-all"
                >
                  查看参考答案
                </button>
              </div>

              {checkResult && (
                <div className="p-4 bg-accent-50 border border-accent-200 rounded-xl mb-6">
                  <p className="text-accent-700 font-medium mb-1">反馈结果</p>
                  <p className="text-gray-700 text-sm">{checkResult}</p>
                </div>
              )}

              {showReference && (
                <div>
                  <p className="text-gray-700 font-medium mb-3">参考答案</p>
                  <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                    <pre className="font-mono text-sm text-gray-100">
                      <code>{detail.practice.referenceCode}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Test module */}
        {activeTab === "test" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card">
              <h2 className="text-xl font-bold mb-2 text-gray-900">项目测试</h2>
              <p className="text-gray-600 mb-8">
                共 {detail.test.length} 道题，总分 100 分，通过分数 80 分
              </p>

              <div className="space-y-6 mb-8">
                {detail.test.map((q) => (
                  <div key={q.id} className="bg-gray-50 rounded-xl p-5">
                    <p className="font-medium text-gray-900 mb-4">
                      {q.id}. {q.question}
                      {q.type !== "fill" && (
                        <span className="text-gray-500 text-sm ml-2">
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
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : q.type === "truefalse" ? (
                      <div className="flex gap-3">
                        {["正确", "错误"].map((option) => (
                          <button
                            key={option}
                            onClick={() => handleTestAnswer(q.id, option)}
                            disabled={showResults}
                            className={`px-6 py-2 rounded-xl font-medium transition-all ${
                              quizAnswers[q.id] === option
                                ? "bg-primary-600 text-white"
                                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
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
                          let bgClass = "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50";
                          
                          if (showResults) {
                            const isCorrect = String(q.correctAnswer) === optionLetter;
                            if (isCorrect) bgClass = "bg-success-100 text-success-800 border-success-200";
                            else if (isSelected) bgClass = "bg-red-100 text-red-800 border-red-200";
                          } else if (isSelected) {
                            bgClass = "bg-primary-50 text-primary-700 border-primary-200";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleTestAnswer(q.id, optionLetter)}
                              disabled={showResults}
                              className={`w-full p-3 rounded-xl text-left font-medium transition-all ${bgClass}`}
                            >
                              {optionLetter}. {option}
                              {showResults && String(q.correctAnswer) === optionLetter && (
                                <Check className="inline w-4 h-4 ml-2" />
                              )}
                              {showResults && isSelected && String(q.correctAnswer) !== optionLetter && (
                                <X className="inline w-4 h-4 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {showResults && (
                      <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-100">
                        <p className="text-primary-700 font-medium mb-1">答案解析</p>
                        <p className="text-gray-700 text-sm">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!showResults ? (
                <button
                  onClick={handleSubmitTest}
                  disabled={Object.keys(quizAnswers).length < detail.test.length}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold text-lg hover:from-primary-700 hover:to-primary-800 hover:-translate-y-0.5 shadow-card hover:shadow-cardLifted transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  提交测试
                </button>
              ) : (
                <div className="space-y-4">
                  <div
                    className={`p-6 rounded-2xl text-center ${
                      calculateScore() >= 80
                        ? "bg-success-50 border border-success-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <p
                      className={`text-4xl font-bold mb-2 ${
                        calculateScore() >= 80 ? "text-success-600" : "text-red-600"
                      }`}
                    >
                      {calculateScore()} 分
                    </p>
                    <p
                      className={`font-semibold text-lg ${
                        calculateScore() >= 80 ? "text-success-700" : "text-red-700"
                      }`}
                    >
                      {calculateScore() >= 80 ? (
                        <span className="inline-flex items-center gap-2">
                          <CheckCircle2 className="w-6 h-6" />
                          测试通过，获得徽章！
                        </span>
                      ) : (
                        "未通过，需要 80 分才能通过测试"
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setQuizAnswers({});
                    }}
                    className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
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
