import { useCallback, useEffect, useState } from "react";
import { PlanDetailContext } from "./PlanDetailContext";
import { useAxios } from "@/hooks";
import { useParams } from "react-router-dom";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";

const PlanDetailProvider = ({ children }) => {
  const [flattendItinerary, setFlattendItinerary] = useState([]);
  const [focusDay, setFocusDay] = useState(null);
  const { id } = useParams();

  const { response: tripDetail, fetchData: tripFetch } = useAxios();
  const { response: tripItinerary, fetchData: tripItineraryFetch } = useAxios();
  const { response: tripReservation, fetchData: tripReservationFetch } =
    useAxios();

  const { fetchData: postReservation } = useAxios();
  const { fetchData: postItinerary } = useAxios();

  // 여행 계획의 기본 정보를 가져오는 함수
  const fetchPlanDetail = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_DETAIL, { id });
    await tripFetch({ url, method: "GET" });
  }, [id, tripFetch]);

  // 여행 계획의 일정을 가져오는 함수
  const fetchPlanItinerary = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id });
    await tripItineraryFetch({ url, method: "GET" });
  }, [id, tripItineraryFetch]);

  // 여행 계획의 예약 정보를 가져오는 함수
  const fetchPlanReservation = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_RESERVATION, { id });
    await tripReservationFetch({ url, method: "GET" });
  }, [id, tripReservationFetch]);

  // 여행 계획에 예약 정보를 추가하는 함수
  const addReservation = useCallback(
    (data) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, { id });
      postReservation({ url, method: "POST", data }).then(() =>
        fetchPlanReservation()
      );
    },
    [fetchPlanReservation, id, postReservation]
  );

  // 여행 계획에 일정 정보를 추가하는 함수
  const addItinerary = useCallback(
    (data) => {
      console.log("data", data);
      const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id });
      postItinerary({ url, method: "POST", data }).then(() =>
        fetchPlanItinerary()
      );
    },
    [fetchPlanItinerary, id, postItinerary]
  );

  useEffect(() => {
    fetchPlanDetail();
    fetchPlanItinerary();
    fetchPlanReservation();
  }, [fetchPlanDetail, fetchPlanItinerary, fetchPlanReservation]);

  // 일정 정보를 날짜별로 정리하는 코드
  useEffect(() => {
    if (!tripItinerary || !tripDetail) return;

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

    tripItinerary.forEach((item) => {
      const { date, cost } = item;
      const index = temp.findIndex((day) => day.date === date);
      temp[index].data.push(item);
      temp[index].cost += cost;
    });

    setFlattendItinerary(temp);
  }, [tripItinerary, tripDetail]);

  return (
    <PlanDetailContext.Provider
      value={{
        tripDetail,
        focusDay,
        setFocusDay,
        tripItinerary,
        tripReservation,
        addReservation,
        addItinerary,
        flattendItinerary,
      }}
    >
      {children}
    </PlanDetailContext.Provider>
  );
};

export default PlanDetailProvider;
