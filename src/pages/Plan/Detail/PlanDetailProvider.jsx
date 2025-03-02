import { useCallback, useEffect, useState } from "react";
import { PlanDetailContext } from "./PlanDetailContext";
import { useAxios, usePlanReservation, usePlanItinerary } from "@/hooks";
import { useParams } from "react-router-dom";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";

const PlanDetailProvider = ({ children }) => {
  const [flattendItinerary, setFlattendItinerary] = useState([]);
  const [focusDay, setFocusDay] = useState(null);
  const { id } = useParams();

  const { response: tripDetail, fetchData: tripFetch } = useAxios();

  const { reservations, addReservation, updateReservation, deleteReservation } =
    usePlanReservation(id);

  const { itineraries, addItinerary, updateItinerary, deleteItinerary } =
    usePlanItinerary(id);

  // 여행 계획의 기본 정보를 가져오는 함수
  const fetchPlanDetail = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_DETAIL, { id });
    await tripFetch({ url, method: "GET" });
  }, [id, tripFetch]);

  useEffect(() => {
    fetchPlanDetail();
  }, [fetchPlanDetail]);

  // 일정 정보를 날짜별로 정리하는 코드
  useEffect(() => {
    if (!itineraries || !tripDetail) return;

    const { startDate, endDate } = tripDetail;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const temp = [];
    while (start <= end) {
      const date = start.toISOString().split("T")[0];
      const day =
        Math.floor((start - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
      temp.push({ date, day, data: [], cost: 0 });
      start.setDate(start.getDate() + 1);
    }

    itineraries.forEach((item) => {
      const { date, cost } = item;
      const index = temp.findIndex((day) => day.date === date);
      temp[index].data.push(item);
      temp[index].cost += cost;
    });

    setFlattendItinerary(temp);
  }, [itineraries, tripDetail]);

  return (
    <PlanDetailContext.Provider
      value={{
        focusDay,
        setFocusDay,

        tripDetail,
        itineraries,
        reservations,

        addReservation,
        updateReservation,
        deleteReservation,

        addItinerary,
        updateItinerary,
        deleteItinerary,

        flattendItinerary,
      }}
    >
      {children}
    </PlanDetailContext.Provider>
  );
};

export default PlanDetailProvider;
