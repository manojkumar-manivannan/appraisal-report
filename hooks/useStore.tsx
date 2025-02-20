import { StoreState } from "@/types/types";
import { create } from "zustand";

/**
 * Store for the application
 * @type {StoreState}
 * @property {boolean} sidebarOpen - Whether the sidebar is open or not
 * @property {function} toggleSidebar - Function to toggle the sidebar
 */
export const useStore = create<StoreState>((set) => ({
    sidebarOpen: false,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
