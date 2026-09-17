import { create } from 'zustand';
import type { Application } from '@/types/application';

interface ApplicationStore {
  applications: Application[];
  currentApplication: Application | null;
  wizardStep: number;
  selectedState: string | null;
  selectedCategory: string | null;
  selectedType: string | null;

  setApplications: (apps: Application[]) => void;
  setCurrentApplication: (app: Application | null) => void;
  setWizardStep: (step: number) => void;
  setSelectedState: (state: string | null) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedType: (type: string | null) => void;
  resetWizard: () => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applications: [],
  currentApplication: null,
  wizardStep: 1,
  selectedState: null,
  selectedCategory: null,
  selectedType: null,

  setApplications: (apps) => set({ applications: apps }),
  setCurrentApplication: (app) => set({ currentApplication: app }),
  setWizardStep: (step) => set({ wizardStep: step }),
  setSelectedState: (state) => set({ selectedState: state }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedType: (type) => set({ selectedType: type }),
  resetWizard: () =>
    set({
      wizardStep: 1,
      selectedState: null,
      selectedCategory: null,
      selectedType: null,
      currentApplication: null,
    }),
}));
