import { create } from "zustand";

const useUiStore = create((set) => ({
  alerts: [],
  setAlerts: (alert) => {
    set((state) => ({ alerts: [...state.alerts, alert] }));

    setTimeout(
      () =>
        set((state) => ({
          alerts: state.alerts.filter(
            (el, idx) => idx !== state.alerts.length - 1,
          ),
        })),
      3000,
    );
  },

  removeAlert: (index) =>
    set((state) => ({
      alerts: state.alerts.filter((el, idx) => index !== idx),
    })),
}));

export default useUiStore;
