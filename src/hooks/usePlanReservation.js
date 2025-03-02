import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";

const usePlanReservation = (id) => {
  const { createToast } = useToast();

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
      await postApi({ url, method: "POST", data })
        .then(() =>
          createToast({ text: "예약이 추가되었습니다.", type: "success" })
        )
        .catch(() =>
          createToast({ text: "예약 추가에 실패했습니다.", type: "error" })
        );

      await fetchReservations();
    },
    [createToast, fetchReservations, id, postApi]
  );

  // 예약 데이터를 수정하는 함수
  const updateReservation = useCallback(
    async (reservationId, data) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, {
        id: reservationId,
      });
      await updateApi({ url, method: "PATCH", data })
        .then(() =>
          createToast({ text: "예약이 수정되었습니다.", type: "success" })
        )
        .catch(() =>
          createToast({ text: "예약 수정에 실패했습니다.", type: "error" })
        );

      await fetchReservations();
    },
    [createToast, fetchReservations, updateApi]
  );

  // 예약 데이터를 삭제하는 함수
  const deleteReservation = useCallback(
    async (reservationId) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, {
        id: reservationId,
      });
      await deleteApi({ url, method: "DELETE" })
        .then(() =>
          createToast({ text: "예약이 삭제되었습니다.", type: "success" })
        )
        .catch(() =>
          createToast({ text: "예약 삭제에 실패했습니다.", type: "error" })
        );

      await fetchReservations();
    },
    [createToast, deleteApi, fetchReservations]
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
