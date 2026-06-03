import { create } from "zustand";
import type { Project } from "../data/projects";

type FilterType = "全部" | "入门" | "进阶" | "高级";

interface AppState {
  filter: FilterType;
  selectedProject: Project | null;
  isModalOpen: boolean;
  completedProjects: number;
  learningHours: number;
  streakDays: number;
  badges: number;
  setFilter: (filter: FilterType) => void;
  setSelectedProject: (project: Project | null) => void;
  openModal: (project: Project) => void;
  closeModal: () => void;
}

export const useStore = create<AppState>((set) => ({
  filter: "全部",
  selectedProject: null,
  isModalOpen: false,
  completedProjects: 0,
  learningHours: 0,
  streakDays: 0,
  badges: 0,
  setFilter: (filter) => set({ filter }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  openModal: (project) =>
    set({ selectedProject: project, isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedProject: null }),
}));
