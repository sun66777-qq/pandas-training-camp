import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ProjectProgress {
  id: number;
  completed: boolean;
  score?: number;
}

interface ProgressState {
  projects: ProjectProgress[];
  learningHours: number;
  streakDays: number;
  badges: number;
  completedProjects: () => number;
  updateProjectProgress: (
    id: number,
    completed: boolean,
    score?: number
  ) => void;
  resetProgress: () => void;
}

const initialProjects: ProjectProgress[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: i + 1,
    completed: false,
  })
);

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      projects: initialProjects,
      learningHours: 0,
      streakDays: 0,
      badges: 0,
      completedProjects: () =>
        get().projects.filter((p) => p.completed).length,
      updateProjectProgress: (id, completed, score) =>
        set((state) => {
          const newProjects = state.projects.map((p) =>
            p.id === id ? { ...p, completed, score } : p
          );
          const completedCount = newProjects.filter((p) => p.completed).length;
          return {
            projects: newProjects,
            badges: completedCount,
            learningHours: completedCount * 2,
            streakDays: Math.min(completedCount, 7),
          };
        }),
      resetProgress: () =>
        set({
          projects: initialProjects,
          learningHours: 0,
          streakDays: 0,
          badges: 0,
        }),
    }),
    {
      name: "pandas-camp-progress",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
