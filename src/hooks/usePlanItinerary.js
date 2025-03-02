import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";

const usePlanItinerary = (id) => {
  const { createToast } = useToast();

  const { response: itineraries, fetchData: getApi } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: updateApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();

  // 일정 데이터를 가져오는 함수
  const fetchItineraries = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id });
    await getApi({ url, method: "GET" });
  }, [id, getApi]);

  // 일정 데이터를 추가하는 함수
  const addItinerary = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id });
      await postApi({ url, method: "POST", data })
        .then(() =>
          createToast({ text: "일정이 추가되었습니다.", type: "success" })
        )
        .catch(() =>
          createToast({ text: "일정 추가에 실패했습니다.", type: "error" })
        );

      await fetchItineraries();
    },
    [id, postApi, fetchItineraries, createToast]
  );

  // 일정 데이터를 수정하는 함수
  const updateItinerary = useCallback(
    async (itemId, data) => {
      const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id: itemId });
      await updateApi({ url, method: "PATCH", data })
        .then(() =>
          createToast({ text: "일정이 수정되었습니다.", type: "success" })
        )
        .catch(() =>
          createToast({ text: "일정 수정에 실패했습니다.", type: "error" })
        );

      await fetchItineraries();
    },
    [updateApi, fetchItineraries, createToast]
  );

  // 일정 데이터를 삭제하는 함수
  const deleteItinerary = useCallback(
    async (itemId) => {
      const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id: itemId });
      await deleteApi({ url, method: "DELETE" })
        .then(() =>
          createToast({ text: "일정이 삭제되었습니다.", type: "success" })
        )
        .catch(() =>
          createToast({ text: "일정 삭제에 실패했습니다.", type: "error" })
        );

      await fetchItineraries();
    },
    [createToast, deleteApi, fetchItineraries]
  );

  useEffect(() => {
    fetchItineraries();
  }, [fetchItineraries]);

  return {
    itineraries,
    fetchItineraries,
    addItinerary,
    updateItinerary,
    deleteItinerary,
  };
};

export default usePlanItinerary;
