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
              ? "bg-primary-600 text-white shadow-md"
              : "bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
