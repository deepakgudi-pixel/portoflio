import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index.js";

const useWindowStore = create(
  immer((set) => ({
    windows: structuredClone(WINDOW_CONFIG),

    nextZIndex: INITIAL_Z_INDEX + 1,

    // OPEN WINDOW
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),

    // CLOSE WINDOW
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    // FOCUS WINDOW (Bring To Front)
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.zIndex = state.nextZIndex++;
      }),

    // ⭐ TOGGLE WINDOW (Fixes Double Click Issue)
    toggleWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        if (win.isOpen) {
          win.isOpen = false;
          win.zIndex = INITIAL_Z_INDEX;
          win.data = null;
        } else {
          win.isOpen = true;
          win.zIndex = state.nextZIndex;
          win.data = data ?? win.data;
          state.nextZIndex++;
        }

        console.log("Updated:", windowKey, win.isOpen);
      }),
  }))
);

export default useWindowStore;
