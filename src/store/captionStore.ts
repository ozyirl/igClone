import { create } from "zustand";

interface CaptionState {
  caption: string;
  setCaption: (caption: string) => void;
}

export const useCaptionStore = create<CaptionState>((set) => ({
  caption: "",
  setCaption: (caption) => set({ caption }),
}));
