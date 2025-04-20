import { create } from "zustand";

type EditBudgetState = {
  isOpen: boolean;
  budgetId: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useEditBudget = create<EditBudgetState>((set) => ({
  isOpen: false,
  budgetId: null,
  onOpen: (id) => set({ isOpen: true, budgetId: id }),
  onClose: () => set({ isOpen: false, budgetId: null }),
}));