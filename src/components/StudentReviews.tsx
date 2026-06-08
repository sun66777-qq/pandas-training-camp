import { useState, useEffect } from "react";
import { Star, MessageSquare, ThumbsUp, User, Trash2 } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  content: string;
  date: Date;
  helpful: number;
  isNew?: boolean;
}

const initialReviews: Review[] = [
  {
    id: "1",
    name: "张三",
    rating: 5,
    content: "项目非常实用，从数据清洗到建模讲得很清楚！",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    helpful: 12,
  },
  {
    id: "2",
    name: "李四",
    rating: 4,
    content: "购物车关联规则那个项目帮助很大，面试用上了",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    helpful: 8,
  },
  {
    id: "3",
    name: "王芳",
    rating: 5,
    content: "作为零基础小白，跟着一步步做下来很有成就感",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    helpful: 23,
  },
  {
    id: "4",
    name: "赵磊",
    rating: 4,
    content: "代码编辑器很流畅，不用配置环境太方便了",
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    helpful: 5,
  },
];

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "今天";
  if (days === 1) return "昨天";
  if (days < 7) return `${days}天前`;
  if (days < 30) return `${Math.floor(days / 7)}周前`;
  if (days < 365) return `${Math.floor(days / 30)}个月前`;
  return `${Math.floor(days / 365)}年前`;
}

export function StudentReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pandas_reviews");
    if (saved) {
      const parsed = JSON.parse(saved);
      setReviews(parsed.map((r: any) => ({
        ...r,
        date: new Date(r.date)
      })));
    } else {
      setReviews(initialReviews);
      localStorage.setItem("pandas_reviews", JSON.stringify(initialReviews));
    }
  }, []);

  const saveReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    localStorage.setItem("pandas_reviews", JSON.stringify(newReviews));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newName.trim() || "匿名用户";
    const content = newContent.trim();

    if (!content) {
      setMessage({ text: "请填写完整信息", type: "error" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      name,
      rating: newRating,
      content,
      date: new Date(),
      helpful: 0,
      isNew: true,
    };

    const newReviews = [review, ...reviews];
    saveReviews(newReviews);
    setNewName("");
    setNewRating(5);
    setNewContent("");
    setMessage({ text: "评论已发表，感谢你的反馈！", type: "success" });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleHelpful = (id: string) => {
    const newReviews = reviews.map(review =>
      review.id === id ? { ...review, helpful: review.helpful + 1 } : review
    );
    saveReviews(newReviews);
  };

  const handleDelete = (id: string) => {
    const newReviews = reviews.filter(review => review.id !== id);
    saveReviews(newReviews);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
            <MessageSquare className="w-8 h-8" />
            学员评价
          </h2>
          <p className="text-text-secondary text-lg">
            已有 <span className="text-neon-cyan font-bold">{reviews.length}</span> 条评价
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`max-w-2xl mx-auto mb-8 glass-card rounded-xl p-4 border ${
            message.type === "success" 
              ? "border-emerald-500/30 bg-emerald-500/10" 
              : "border-red-500/30 bg-red-500/10"
          }`}>
            <p className={`text-center font-medium ${
              message.type === "success" ? "text-emerald-400" : "text-red-400"
            }`}>
              {message.text}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Review Form (Left) */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-text-primary mb-6">
                发表评价
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    昵称
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="匿名用户"
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-text-secondary text-sm mb-3">
                    评分
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-2 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= newRating
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    评价内容
                    <span className="text-neon-purple ml-2">{newContent.length}/500</span>
                  </label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value.slice(0, 500))}
                    placeholder="分享你的学习心得..."
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg font-bold rounded-xl hover:shadow-glow hover:scale-105 transition-all"
                >
                  发表评价
                </button>
              </form>
            </div>
          </div>

          {/* Reviews List (Right) */}
          <div className="lg:col-span-2 space-y-6">
            {reviews
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(review => (
                <div
                  key={review.id}
                  className="glass-card-hover rounded-2xl p-6 border border-dark-border hover:border-neon-cyan/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple p-1 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
                        <span className="text-lg font-bold text-neon-cyan">
                          {getInitial(review.name)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-text-primary">
                          {review.name}
                        </h4>
                        <span className="text-text-muted text-sm">
                          {formatDate(review.date)}
                        </span>
                      </div>

                      <div className="mb-3">{renderStars(review.rating)}</div>

                      <p className="text-text-secondary leading-relaxed mb-4">
                        {review.content}
                      </p>

                      <div className="flex items-center gap-4">
                        {/* Helpful */}
                        <button
                          onClick={() => handleHelpful(review.id)}
                          className="flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan transition-colors group-hover:scale-105"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>有用 ({review.helpful})</span>
                        </button>

                        {/* Delete (only for new reviews) */}
                        {review.isNew && (
                          <button
                            onClick={() => handleDelete(review.id)}
                            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>删除</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
