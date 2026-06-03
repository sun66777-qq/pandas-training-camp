import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";
import { projects } from "../data/projects";
import { useStore } from "../store/useStore";

export function ProjectList() {
  const filter = useStore((state) => state.filter);

  const filteredProjects =
    filter === "全部"
      ? projects
      : projects.filter((p) => p.difficulty === filter);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">实战项目列表</h2>
          <p className="text-slate-400 mb-8">选择感兴趣的项目，开始你的数据分析之旅</p>
          <ProjectFilter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            暂无符合条件的项目
          </div>
        )}
      </div>
    </section>
  );
}
