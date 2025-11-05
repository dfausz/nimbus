import { create } from 'zustand';

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

type DateState = {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
};

export const useDateStore = create<DateState>((set) => ({
  selectedDate: startOfDay(new Date()),
  setSelectedDate: (d) => set({ selectedDate: startOfDay(d) }),
}));

