import { useCallback, useEffect, useState } from "react";
import { PlanDetailContext } from "./PlanDetailContext";
import { useAxios } from "@/hooks";
import { useParams } from "react-router-dom";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";

const PlanDetailProvider = ({ children }) => {
  const [focusDay, setFocusDay] = useState(null);
  const { id } = useParams();

  const { response: tripDetail, fetchData: tripFetch } = useAxios();
  const { response: tripItinerary, fetchData: tripItineraryFetch } = useAxios();
  const { response: tripReservation, fetchData: tripReservationFetch } =
    useAxios();
  const { fetchData: postReservation } = useAxios();

  console.log("tripItinerary", tripItinerary);
  console.log("tripReservation", tripReservation);

  const fetchPlanDetail = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_DETAIL, { id });
    await tripFetch({ url, method: "GET" });
  }, [id, tripFetch]);

  const fetchPlanItinerary = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id });
    await tripItineraryFetch({ url, method: "GET" });
  }, [id, tripItineraryFetch]);

  const fetchPlanReservation = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_RESERVATION, { id });
    await tripReservationFetch({ url, method: "GET" });
  }, [id, tripReservationFetch]);

  const addReservation = useCallback(
    (data) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, { id });
      postReservation({ url, method: "POST", params: data }).then(() => {
        fetchPlanReservation();
      });
    },
    [fetchPlanReservation, id, postReservation]
  );

  const addSchedule = useCallback(
    (data) => {
      const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id });
      tripItineraryFetch({ url, method: "POST", data }).then(() => {
        fetchPlanItinerary();
      });
    },
    [fetchPlanItinerary, id, tripItineraryFetch]
  );

  useEffect(() => {
    fetchPlanDetail();
    fetchPlanItinerary();
    fetchPlanReservation();
  }, [fetchPlanDetail, fetchPlanItinerary, fetchPlanReservation]);

  return (
    <PlanDetailContext.Provider
      value={{
        tripDetail,
        focusDay,
        setFocusDay,
        tripItinerary,
        tripReservation,
        addReservation,
        addSchedule,
      }}
    >
      {children}
    </PlanDetailContext.Provider>
  );
};

export default PlanDetailProvider;
