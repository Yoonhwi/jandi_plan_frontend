import { createContext, useContext } from "react";

export const PlanDetailContext = createContext({
  tripDetail: null,
  focusDay: null,
  tripItinerary: null,
  tripReservation: null,
  setFocusDay: () => {},
  addReservation: () => {},
  addSchedule: () => {},
});

export const usePlanDetail = () => {
  const context = useContext(PlanDetailContext);

  if (!context) {
    throw new Error(
      "usePlanDetail 는 PlanDetailProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
