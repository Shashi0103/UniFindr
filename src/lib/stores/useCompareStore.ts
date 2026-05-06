import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareState {
  collegeIds: number[];
  addCollege: (id: number) => void;
  removeCollege: (id: number) => void;
  clearColleges: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      collegeIds: [],
      addCollege: (id) => {
        const { collegeIds } = get();
        if (collegeIds.length < 3 && !collegeIds.includes(id)) {
          set({ collegeIds: [...collegeIds, id] });
        }
      },
      removeCollege: (id) => set((state) => ({
        collegeIds: state.collegeIds.filter(cId => cId !== id)
      })),
      clearColleges: () => set({ collegeIds: [] }),
    }),
    {
      name: 'unifindr-compare',
    }
  )
);
