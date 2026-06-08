import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Database, Check, X, ChevronDown, ChevronUp, BookOpen, Code2, CheckCircle2, AlertCircle } from "lucide-react";
import { projects } from "../data/projects";
import { projectDetails } from "../data/projectDetails";
import { useProgressStore } from "../store/useProgressStore";
import PracticePanel from "../components/PracticePanel";
import CommonErrors from "../components/CommonErrors";

const difficultyColors = {
  入门: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  进阶: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  高级: "bg-red-500/20 text-red-400 border-red-500/30",
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
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});

  const project = projects.find((p) => p.id === Number(id));
  const detail = project ? projectDetails[project.id] : null;
  const { updateProjectProgress, projects: progressProjects } = useProgressStore();

  const isCompleted = progressProjects.find((p) => p.id === Number(id))?.completed;

  if (!project || !detail) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center glass-card p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">项目不存在</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg rounded-xl font-semibold hover:shadow-glow transition-all"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tabs: { key: TabType; label: string; icon: React.ComponentType<any> }[] = [
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

  const toggleExplanation = (questionId: number) => {
    setExpandedExplanations((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-dark-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-neon-cyan transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回项目列表
            </button>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple p-1">
                <span className="w-full h-full rounded-lg bg-dark-bg flex items-center justify-center text-white font-bold">
                  {project.id}
                </span>
              </span>
              <div>
                <h1 className="text-xl font-bold text-text-primary">{project.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${difficultyColors[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-text-secondary">
                    <Clock className="w-4 h-4" />
                    {project.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-text-secondary">
                    <Database className="w-4 h-4" />
                    {project.dataset}
                  </span>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-sm text-emerald-400 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      已完成
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 border-b border-dark-border -mx-4 px-4 md:mx-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                    activeTab === tab.key
                      ? "text-neon-cyan border-neon-cyan"
                      : "text-text-secondary border-transparent hover:text-text-primary hover:border-dark-border"
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
        {/* Learning module - 25% / 75% */}
        {activeTab === "learn" && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Panel - 25% */}
            <div className="w-full md:w-1/4">
              <div className="glass-card rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-text-primary mb-4">知识点目录</h3>
                <div className="space-y-2">
                  {detail.learning.map((point, index) => (
                    <div key={index} className="p-3 rounded-xl bg-dark-card-hover hover:border-neon-cyan/50 border border-transparent transition-all">
                      <p className="text-sm font-medium text-text-primary">{point.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - 75% */}
            <div className="w-full md:w-3/4 space-y-6">
              {detail.learning.map((point, pointIndex) => (
                <div key={pointIndex} className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-text-primary">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                      <span className="text-dark-bg font-bold text-sm">{pointIndex + 1}</span>
                    </div>
                    {point.title}
                  </h2>

                  <p className="text-text-secondary mb-4">{point.content}</p>

                  {point.codeExample && (
                    <div className="bg-dark-bg rounded-xl p-4 mb-6 overflow-x-auto border border-dark-border">
                      <pre className="font-mono text-sm text-neon-cyan">
                        <code>{point.codeExample}</code>
                      </pre>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h3 className="font-semibold text-text-primary">理解自测</h3>
                    {point.quiz.map((q, quizIndex) => {
                      const key = `${pointIndex}-${quizIndex}`;
                      const isExpanded = expandedQuiz[key];
                      return (
                        <div key={quizIndex} className="bg-dark-card-hover rounded-xl overflow-hidden">
                          <button
                            onClick={() => handleQuizToggle(pointIndex, quizIndex)}
                            className="w-full p-4 text-left flex items-center justify-between"
                          >
                            <span className="font-medium text-text-primary">
                              {quizIndex + 1}. {q.question}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-text-secondary" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-text-secondary" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="px-4 pb-4 border-t border-dark-border pt-4">
                              <div className="space-y-2 mb-4">
                                {q.options?.map((option, optIdx) => {
                                  const isCorrect = option === q.answer;
                                  return (
                                    <div
                                      key={optIdx}
                                      className={`p-3 rounded-lg ${
                                        isCorrect
                                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                          : "bg-dark-bg border border-dark-border text-text-secondary"
                                      }`}
                                    >
                                      {option}
                                      {isCorrect && <Check className="inline w-4 h-4 ml-2" />}
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/20">
                                <p className="text-neon-cyan font-medium mb-1">答案解析</p>
                                <p className="text-text-secondary text-sm">{q.explanation}</p>
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
                    ? "bg-emerald-500/20 text-emerald-400 cursor-default"
                    : "bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg hover:shadow-glow hover:-translate-y-0.5"
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
          </div>
        )}

        {/* Practice module - 30% / 70% (already handled in component) */}
        {activeTab === "practice" && (
          <div className="max-w-full">
            <PracticePanel projectId={project.id} practice={detail.practice} />
            <CommonErrors projectId={project.id} />
          </div>
        )}

        {/* Test module - 25% / 75% */}
        {activeTab === "test" && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Panel - 25% */}
            <div className="w-full md:w-1/4">
              <div className="glass-card rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-text-primary mb-4">测试说明</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-dark-card-hover rounded-xl">
                    <p className="text-sm text-text-secondary mb-2">总分</p>
                    <p className="text-3xl font-bold text-neon-cyan">100</p>
                  </div>
                  <div className="p-4 bg-dark-card-hover rounded-xl">
                    <p className="text-sm text-text-secondary mb-2">通过分数</p>
                    <p className="text-3xl font-bold text-amber-400">80</p>
                  </div>
                  <div className="p-4 bg-dark-card-hover rounded-xl">
                    <p className="text-sm text-text-secondary mb-2">题目数量</p>
                    <p className="text-3xl font-bold text-neon-purple">{detail.test.length}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-dark-border">
                  <p className="text-sm text-text-muted">
                    💡 提示：完成所有题目后点击提交按钮
                  </p>
                </div>
              </div>
            </div>

            {/* Right Panel - 75% */}
            <div className="w-full md:w-3/4">
              <div className="glass-card rounded-2xl p-6">
                <div className="space-y-6 mb-8">
                  {detail.test.map((q) => (
                    <div key={q.id} className="bg-dark-card-hover rounded-xl p-5">
                      <p className="font-medium text-text-primary mb-4">
                        {q.id}. {q.question}
                        {q.type !== "fill" && (
                          <span className="text-text-secondary text-sm ml-2">
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
                          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                        />
                      ) : q.type === "truefalse" ? (
                        <div className="flex gap-3">
                          {["正确", "错误"].map((option) => (
                            <button
                              key={option}
                              onClick={() => handleTestAnswer(q.id, option)}
                              disabled={showResults}
                              className={`px-6 py-3 rounded-xl font-medium transition-all border ${
                                quizAnswers[q.id] === option
                                  ? "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50"
                                  : "bg-dark-bg border-dark-border text-text-secondary hover:bg-dark-card-hover"
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
                            let bgClass = "bg-dark-bg border border-dark-border text-text-secondary hover:bg-dark-card-hover";
                            
                            if (showResults) {
                              const isCorrect = String(q.correctAnswer) === optionLetter;
                              if (isCorrect) bgClass = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
                              else if (isSelected) bgClass = "bg-red-500/20 text-red-400 border-red-500/30";
                            } else if (isSelected) {
                              bgClass = "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30";
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

                      <button
                        onClick={() => toggleExplanation(q.id)}
                        className="mt-4 text-sm text-neon-cyan hover:text-neon-purple transition-colors flex items-center gap-1"
                      >
                        {expandedExplanations[q.id] ? "收起解析" : "查看解析"}
                      </button>

                      {(showResults || expandedExplanations[q.id]) && (
                        <div className="mt-3 p-4 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20">
                          <p className="text-neon-cyan font-medium mb-1">答案解析</p>
                          <p className="text-text-secondary text-sm">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {!showResults ? (
                  <button
                    onClick={handleSubmitTest}
                    disabled={Object.keys(quizAnswers).length < detail.test.length}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg font-bold text-lg hover:shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    提交测试
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div
                      className={`p-6 rounded-2xl text-center border ${
                        calculateScore() >= 80
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      <p
                        className={`text-4xl font-bold mb-2 ${
                          calculateScore() >= 80 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {calculateScore()} 分
                      </p>
                      <p
                        className={`font-semibold text-lg ${
                          calculateScore() >= 80 ? "text-emerald-300" : "text-red-300"
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
                      className="w-full py-3 glass-card text-text-primary rounded-2xl font-semibold hover:bg-dark-card-hover transition-all"
                    >
                      重新测试
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
