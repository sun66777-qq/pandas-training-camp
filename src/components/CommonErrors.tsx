import { useState, useEffect } from "react";
import { AlertCircle, ChevronDown, ChevronUp, ThumbsUp } from "lucide-react";

interface CommonError {
  id: number;
  title: string;
  description: string;
  solution: string;
}

const globalErrors: CommonError[] = [
  {
    id: 1,
    title: "KeyError: '列名'",
    description: "这个错误表示你尝试访问不存在的列。",
    solution: "使用 df.columns 查看所有可用的列名，检查拼写错误。"
  },
  {
    id: 2,
    title: "ValueError: cannot convert string to float",
    description: "数据中存在无法转换为数值的字符。",
    solution: "使用 pd.to_numeric(errors='coerce') 将非数值转为NaN。"
  },
  {
    id: 3,
    title: "SettingWithCopyWarning",
    description: "链式索引操作可能导致问题。",
    solution: "使用 .loc 进行操作，或者先创建副本：df = df.copy()."
  },
  {
    id: 4,
    title: "MemoryError",
    description: "数据量太大导致内存不足。",
    solution: "使用 chunksize 分块读取，或者只加载需要的列。"
  },
  {
    id: 5,
    title: "AttributeError: 'NoneType' object has no attribute 'head'",
    description: "文件路径错误导致读取为None。",
    solution: "检查文件路径是否正确，文件是否存在。"
  },
  {
    id: 6,
    title: "TypeError: can only concatenate str to str",
    description: "字符串和数值连接时出错。",
    solution: "先转换数据类型：str(value) 再连接。"
  }
];

const projectErrors: Record<number, CommonError[]> = {
  1: [
    {
      id: 1,
      title: "缺失值处理遗漏",
      description: "忘记处理某些列的缺失值。",
      solution: "逐个检查 df.isnull().sum() 的输出。"
    },
    {
      id: 2,
      title: "日期格式错误",
      description: "parse_dates 参数设置不正确。",
      solution: "检查日期字符串格式是否标准，用 errors='coerce'。"
    }
  ],
  3: [
    {
      id: 1,
      title: "支持度设置过高",
      description: "min_support 设得太高导致没有结果。",
      solution: "逐步降低支持度阈值进行测试。"
    }
  ],
  5: [
    {
      id: 1,
      title: "RFM分数区间划分不合理",
      description: "五分位数边界可能不合适。",
      solution: "根据业务经验调整区间或采用百分位数。"
    }
  ],
  10: [
    {
      id: 1,
      title: "流水线步骤顺序错误",
      description: "数据泄露或预处理步骤顺序不对。",
      solution: "严格按照 训练→验证→测试 的顺序处理。"
    }
  ]
};

export default function CommonErrors({ projectId }: { projectId?: number }) {
  const [expandedErrors, setExpandedErrors] = useState<Record<number, boolean>>({});
  const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>({});
  const [errors, setErrors] = useState<CommonError[]>(globalErrors);

  useEffect(() => {
    if (projectId && projectErrors[projectId]) {
      setErrors([...projectErrors[projectId], ...globalErrors]);
    } else {
      setErrors(globalErrors);
    }
  }, [projectId]);

  const toggleError = (id: number) => {
    setExpandedErrors(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const markHelpful = (id: number) => {
    setHelpfulCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  if (projectId) {
    return (
      <div className="mt-8 glass-card rounded-xl p-4">
        <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          常见错误提醒
        </h4>
        <div className="space-y-2">
          {projectErrors[projectId]?.map(error => (
            <div
              key={error.id}
              className="bg-dark-card-hover rounded-lg p-3 cursor-pointer"
              onClick={() => toggleError(error.id)}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-text-primary">{error.title}</span>
                {expandedErrors[error.id] ? (
                  <ChevronUp className="w-4 h-4 text-text-secondary" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-secondary" />
                )}
              </div>
              {expandedErrors[error.id] && (
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-text-secondary">{error.description}</p>
                  <p className="text-xs text-neon-cyan">✅ {error.solution}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markHelpful(error.id);
                    }}
                    className="mt-2 text-xs flex items-center gap-1 text-text-muted hover:text-neon-cyan transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    有帮助 ({helpfulCounts[error.id] || 0})
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export function GlobalErrorPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedErrors, setExpandedErrors] = useState<Record<number, boolean>>({});
  const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>({});

  const toggleError = (id: number) => {
    setExpandedErrors(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const markHelpful = (id: number) => {
    setHelpfulCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="fixed right-4 bottom-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg font-semibold shadow-glow hover:shadow-glow-lg transition-all hover:scale-105"
      >
        <AlertCircle className="w-5 h-5" />
        <span>常见错误</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 max-h-[70vh] overflow-y-auto glass-card rounded-2xl shadow-glow border border-dark-border">
          <div className="p-4 border-b border-dark-border sticky top-0 bg-dark-card-hover">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-text-primary">📚 常见错误集锦</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-neon-cyan transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-text-muted mt-1">
              在这里查找常见的 Pandas 错误和解决方案
            </p>
          </div>
          <div className="p-4 space-y-3">
            {globalErrors.map(error => (
              <div
                key={error.id}
                className="bg-dark-card-hover rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleError(error.id)}
                  className="w-full p-3 text-left flex justify-between items-center hover:bg-dark-border transition-colors"
                >
                  <span className="font-medium text-text-primary">{error.title}</span>
                  {expandedErrors[error.id] ? (
                    <ChevronUp className="w-4 h-4 text-text-secondary" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-secondary" />
                  )}
                </button>

                {expandedErrors[error.id] && (
                  <div className="p-3 border-t border-dark-border space-y-2">
                    <p className="text-sm text-text-secondary">{error.description}</p>
                    <div className="bg-neon-cyan/10 p-2 rounded-lg border border-neon-cyan/30">
                      <p className="text-sm text-neon-cyan">💡 解决方案</p>
                      <p className="text-xs text-text-primary mt-1">{error.solution}</p>
                    </div>
                    <button
                      onClick={() => markHelpful(error.id)}
                      className="flex items-center gap-1 text-xs text-text-muted hover:text-neon-cyan transition-colors mt-2"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      有帮助 ({helpfulCounts[error.id] || 0})
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
