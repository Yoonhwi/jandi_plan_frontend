import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";

const usePlanReservation = (id) => {
  const { response: reservations, fetchData: getApi } = useAxios();

  const { fetchData: postApi } = useAxios();
  const { fetchData: updateApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();

  // 예약 데이터를 가져오는 함수
  const fetchReservations = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_RESERVATION, { id });
    await getApi({ url, method: "GET" });
  }, [id, getApi]);

  // 예약 데이터를 추가하는 함수
  const addReservation = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, { id });
      await postApi({ url, method: "POST", data });
      await fetchReservations();
    },
    [id, postApi, fetchReservations]
  );

  // 예약 데이터를 수정하는 함수
  const updateReservation = useCallback(
    async (reservationId, data) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, {
        id: reservationId,
      });
      await updateApi({ url, method: "PATCH", data });
      await fetchReservations();
    },
    [fetchReservations, updateApi]
  );

  // 예약 데이터를 삭제하는 함수
  const deleteReservation = useCallback(
    async (reservationId) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, {
        id: reservationId,
      });
      await deleteApi({ url, method: "DELETE" });
      await fetchReservations();
    },
    [deleteApi, fetchReservations]
  );

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return {
    reservations,
    addReservation,
    updateReservation,
    deleteReservation,
  };
};

export default usePlanReservation;
