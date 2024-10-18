import { create } from 'zustand'

type ActiveComponentStore = {
  activeComponent: string | null
  setActiveComponent: (component: string) => void
}

export const useActiveComponent = create<ActiveComponentStore>((set) => ({
  activeComponent: null,
  setActiveComponent: (component) => set({ activeComponent: component }),
}))
