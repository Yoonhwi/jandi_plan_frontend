import { createContext, useContext } from "react";

export const PlanDetailContext = createContext({
  tripDetail: null, // 여행 계획의 기본 정보
  focusDay: null, // 현재 보고 있는 일자
  tripItinerary: null, // 여행 계획의 일정 정보
  tripReservation: null, // 여행 계획의 예약 정보
  setFocusDay: () => {}, // 현재 보고 있는 일자를 변경하는 함수
  addReservation: () => {}, // 여행 계획에 예약 정보를 추가하는 함수
  addItinerary: () => {}, // 여행 계획에 일정 정보를 추가하는 함수
  flattendItinerary: [], // 여행 계획의 일정 정보를 날짜별로 정리한 정보
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
