import { useStore } from "../store/useStore";

type FilterType = "全部" | "入门" | "进阶" | "高级";

const filters: FilterType[] = ["全部", "入门", "进阶", "高级"];

export function ProjectFilter() {
  const { filter, setFilter } = useStore();

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            filter === f
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "bg-dark-card text-slate-400 border border-dark-border hover:border-primary/50"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
