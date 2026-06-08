import { useState, useCallback, useMemo } from "react";
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
  const [visibleQuestions, setVisibleQuestions] = useState(3); // 性能优化：初始只显示3道题

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

  // 使用 useCallback 优化事件处理，避免不必要的重渲染
  const handleQuizToggle = useCallback((pointIndex: number, quizIndex: number) => {
    const key = `${pointIndex}-${quizIndex}`;
    setExpandedQuiz((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleTestAnswer = useCallback((questionId: number, answer: string) => {
    // 性能优化：只在答案变化时才更新状态
    setQuizAnswers((prev) => {
      if (prev[questionId] === answer) return prev;
      return { ...prev, [questionId]: answer };
    });
  }, []);

  // 使用 useMemo 缓存得分计算结果
  const calculateScore = useMemo(() => {
    let correct = 0;
    detail?.test.forEach((q) => {
      if (quizAnswers[q.id] === String(q.correctAnswer)) {
        correct++;
      }
    });
    return Math.round((correct / detail.test.length) * 100);
  }, [detail, quizAnswers]);

  const handleSubmitTest = useCallback(() => {
    // 性能优化：先计算分数，再更新状态
    const score = calculateScore;
    setShowResults(true);
    if (score >= 80) {
      updateProjectProgress(project.id, true, score);
    }
  }, [calculateScore, project.id, updateProjectProgress]);

  const toggleExplanation = useCallback((questionId: number) => {
    setExpandedExplanations((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  }, []);

  // 加载更多题目
  const loadMoreQuestions = useCallback(() => {
    setVisibleQuestions((prev) => Math.min(prev + 2, detail.test.length));
  }, [detail.test.length]);

  // 重置测试
  const handleResetTest = useCallback(() => {
    setShowResults(false);
    setQuizAnswers({});
    setExpandedExplanations({});
    setVisibleQuestions(3); // 重置为只显示3道题
  }, []);

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
        {/* Learning module - 28% / 68% with 4% gap */}
        {activeTab === "learn" && (
          <div className="flex flex-col md:flex-row gap-[4%]">
            {/* Left Panel - 28% */}
            <div className="w-full md:w-[28%]">
              <div className="glass-card rounded-2xl p-6 sticky top-24 md:h-[calc(100vh-8rem)] md:overflow-y-auto">
                <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-neon-cyan" />
                  知识点目录
                </h3>
                <div className="space-y-4">
                  {detail.learning.map((point, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-dark-card-hover hover:border-neon-cyan/50 border border-transparent transition-all group cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-dark-bg font-bold text-xs">{index + 1}</span>
                        </div>
                        <p className="text-sm font-medium text-text-primary leading-relaxed group-hover:text-neon-cyan transition-colors">
                          {point.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - 68% */}
            <div className="w-full md:w-[68%] space-y-8 md:py-4">
              {detail.learning.map((point, pointIndex) => (
                <div key={pointIndex} className="glass-card rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-text-primary">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                      <span className="text-dark-bg font-bold">{pointIndex + 1}</span>
                    </div>
                    {point.title}
                  </h2>

                  <p className="text-text-secondary mb-6 leading-relaxed text-base">{point.content}</p>

                  {point.codeExample && (
                    <div className="bg-dark-bg rounded-xl p-6 mb-8 overflow-x-auto border border-dark-border">
                      <pre className="font-mono text-sm text-neon-cyan leading-relaxed">
                        <code>{point.codeExample}</code>
                      </pre>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h3 className="font-semibold text-text-primary flex items-center gap-2 text-lg">
                      <AlertCircle className="w-5 h-5 text-amber-400" />
                      理解自测
                    </h3>
                    {point.quiz.map((q, quizIndex) => {
                      const key = `${pointIndex}-${quizIndex}`;
                      const isExpanded = expandedQuiz[key];
                      return (
                        <div key={quizIndex} className="bg-dark-card-hover rounded-xl overflow-hidden">
                          <button
                            onClick={() => handleQuizToggle(pointIndex, quizIndex)}
                            className="w-full p-5 text-left flex items-center justify-between hover:bg-dark-card transition-all"
                          >
                            <span className="font-medium text-text-primary text-base">
                              {quizIndex + 1}. {q.question}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-text-secondary flex-shrink-0 ml-2" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-text-secondary flex-shrink-0 ml-2" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="px-5 pb-5 border-t border-dark-border pt-5">
                              <div className="space-y-3 mb-5">
                                {q.options?.map((option, optIdx) => {
                                  const isCorrect = option === q.answer;
                                  return (
                                    <div
                                      key={optIdx}
                                      className={`p-4 rounded-lg leading-relaxed ${
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
                              <div className="p-5 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20">
                                <p className="text-neon-cyan font-medium mb-2 flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4" />
                                  答案解析
                                </p>
                                <p className="text-text-secondary leading-relaxed">{q.explanation}</p>
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
                className={`w-full py-5 rounded-2xl font-bold text-xl transition-all ${
                  learnCompleted
                    ? "bg-emerald-500/20 text-emerald-400 cursor-default"
                    : "bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg hover:shadow-glow hover:-translate-y-0.5"
                }`}
              >
                {learnCompleted ? (
                  <span className="inline-flex items-center gap-3">
                    <Check className="w-6 h-6" />
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

        {/* Test module - 28% / 68% with 4% gap - 性能优化版本 */}
        {activeTab === "test" && (
          <div className="flex flex-col md:flex-row gap-[4%]">
            {/* Left Panel - 28% */}
            <div className="w-full md:w-[28%]">
              <div className="glass-card rounded-2xl p-6 sticky top-24 md:h-[calc(100vh-8rem)] md:overflow-y-auto">
                <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                  测试说明
                </h3>
                <div className="space-y-4">
                  <div className="p-5 bg-dark-card-hover rounded-xl">
                    <p className="text-sm text-text-secondary mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-neon-cyan/20 text-neon-cyan flex items-center justify-center text-xs">分</span>
                      总分
                    </p>
                    <p className="text-4xl font-bold text-neon-cyan leading-none">100</p>
                  </div>
                  <div className="p-5 bg-dark-card-hover rounded-xl">
                    <p className="text-sm text-text-secondary mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">通</span>
                      通过分数
                    </p>
                    <p className="text-4xl font-bold text-amber-400 leading-none">80</p>
                  </div>
                  <div className="p-5 bg-dark-card-hover rounded-xl">
                    <p className="text-sm text-text-secondary mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-neon-purple/20 text-neon-purple flex items-center justify-center text-xs">题</span>
                      题目数量
                    </p>
                    <p className="text-4xl font-bold text-neon-purple leading-none">{detail.test.length}</p>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-dark-border">
                  <div className="p-4 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      💡 完成所有题目后点击提交按钮，系统会自动计算得分
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - 68% */}
            <div className="w-full md:w-[68%] md:py-4">
              <div className="glass-card rounded-2xl p-8">
                <div className="space-y-6 mb-8">
                  {/* 性能优化：只渲染可见的题目 */}
                  {detail.test.slice(0, visibleQuestions).map((q) => (
                    <div key={q.id} className="bg-dark-card-hover rounded-xl p-6">
                      <p className="font-medium text-text-primary mb-5 text-lg leading-relaxed">
                        {q.id}. {q.question}
                        {q.type !== "fill" && (
                          <span className="text-text-secondary text-sm ml-3">
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
                          className="w-full px-5 py-4 bg-dark-bg border border-dark-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent text-base"
                        />
                      ) : q.type === "truefalse" ? (
                        <div className="flex gap-4">
                          {["正确", "错误"].map((option) => (
                            <button
                              key={option}
                              onClick={() => handleTestAnswer(q.id, option)}
                              disabled={showResults}
                              className={`px-8 py-4 rounded-xl font-medium border text-base ${
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
                        <div className="space-y-3">
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
                                className={`w-full p-4 rounded-xl text-left font-medium border ${bgClass}`}
                              >
                                <span className="font-bold mr-3">{optionLetter}.</span>
                                {option}
                                {showResults && String(q.correctAnswer) === optionLetter && (
                                  <Check className="inline w-5 h-5 ml-2" />
                                )}
                                {showResults && isSelected && String(q.correctAnswer) !== optionLetter && (
                                  <X className="inline w-5 h-5 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* 性能优化：解析按钮始终显示，但内容延迟加载 */}
                      <button
                        onClick={() => toggleExplanation(q.id)}
                        className="mt-5 text-base text-neon-cyan hover:text-neon-purple flex items-center gap-2"
                      >
                        {expandedExplanations[q.id] ? "收起解析" : "查看解析"}
                        {expandedExplanations[q.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {/* 性能优化：只在展开时渲染解析内容 */}
                      {expandedExplanations[q.id] && (
                        <div className="mt-4 p-5 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20">
                          <p className="text-neon-cyan font-medium mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            答案解析
                          </p>
                          <p className="text-text-secondary leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 性能优化：加载更多题目按钮 */}
                {visibleQuestions < detail.test.length && !showResults && (
                  <button
                    onClick={loadMoreQuestions}
                    className="w-full mb-6 py-4 rounded-2xl border-2 border-neon-cyan/50 text-neon-cyan font-semibold hover:bg-neon-cyan/10 transition-colors"
                  >
                    加载更多题目 ({visibleQuestions}/{detail.test.length})
                  </button>
                )}

                {!showResults ? (
                  <button
                    onClick={handleSubmitTest}
                    disabled={Object.keys(quizAnswers).length < detail.test.length}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg font-bold text-xl hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    提交测试
                  </button>
                ) : (
                  <div className="space-y-5">
                    <div
                      className={`p-8 rounded-2xl text-center border ${
                        calculateScore >= 80
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      <p
                        className={`text-5xl font-bold mb-3 ${
                          calculateScore >= 80 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {calculateScore} 分
                      </p>
                      <p
                        className={`font-semibold text-xl ${
                          calculateScore >= 80 ? "text-emerald-300" : "text-red-300"
                        }`}
                      >
                        {calculateScore >= 80 ? (
                          <span className="inline-flex items-center gap-3">
                            <CheckCircle2 className="w-7 h-7" />
                            测试通过，获得徽章！
                          </span>
                        ) : (
                          "未通过，需要 80 分才能通过测试"
                        )}
                      </p>
                    </div>
                    <button
                      onClick={handleResetTest}
                      className="w-full py-4 bg-dark-card-hover text-text-primary rounded-2xl font-semibold hover:bg-dark-card text-lg"
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
