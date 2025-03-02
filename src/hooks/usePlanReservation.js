import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";

const usePlanReservation = (id) => {
  const { response: reservations, fetchData: fetchReservation } = useAxios();

  const { fetchData: postReservation } = useAxios();
  const { fetchData: updateReservation } = useAxios();
  const { fetchData: deleteReservation } = useAxios();

  // 예약 데이터를 가져오는 함수
  const fetchPlanReservation = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_RESERVATION, { id });
    await fetchReservation({ url, method: "GET" });
  }, [id, fetchReservation]);

  // 예약 데이터를 추가하는 함수
  const addReservation = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, { id });
      await postReservation({ url, method: "POST", data });
      await fetchPlanReservation();
    },
    [id, postReservation, fetchPlanReservation]
  );

  // 예약 데이터를 수정하는 함수
  const updatePlanReservation = useCallback(
    async (reservationId, data) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, {
        reservationId,
      });
      await updateReservation({ url, method: "PATCH", data });
      await fetchPlanReservation();
    },
    [fetchPlanReservation, updateReservation]
  );

  // 예약 데이터를 삭제하는 함수
  const deletePlanReservation = useCallback(
    async (reservationId) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, {
        reservationId,
      });
      await deleteReservation({ url, method: "DELETE" });
      await fetchPlanReservation();
    },
    [deleteReservation, fetchPlanReservation]
  );

  useEffect(() => {
    fetchPlanReservation();
  }, [fetchPlanReservation]);

  return {
    reservations,
    fetchPlanReservation,
    addReservation,
    updatePlanReservation,
    deletePlanReservation,
  };
};

export default usePlanReservation;
