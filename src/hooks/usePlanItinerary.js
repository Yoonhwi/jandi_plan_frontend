import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath, handleApiCall } from "@/utils";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";

// id에 해당하는 여행의 일정 정보를 다룹니다.
const usePlanItinerary = (id) => {
  const { createToast } = useToast();

  const { response: itineraries, fetchData: getApi } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: updateApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();

  const fetchItineraries = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id });
    await getApi({ url, method: "GET" });
  }, [id, getApi]);

  const addItinerary = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id });

      await handleApiCall(
        () => postApi({ url, method: "POST", data }),
        "일정이 추가되었습니다.",
        "일정 추가에 실패했습니다.",
        createToast
      ).then(async () => await fetchItineraries());
    },
    [id, postApi, fetchItineraries, createToast]
  );

  const updateItinerary = useCallback(
    async (itemId, data) => {
      const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id: itemId });

      await handleApiCall(
        () => updateApi({ url, method: "PATCH", data }),
        "일정이 수정되었습니다.",
        "일정 수정에 실패했습니다.",
        createToast
      ).then(async () => await fetchItineraries());
    },
    [updateApi, fetchItineraries, createToast]
  );

  const deleteItinerary = useCallback(
    async (itemId) => {
      const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id: itemId });

      await handleApiCall(
        () => deleteApi({ url, method: "DELETE" }),
        "일정이 삭제되었습니다.",
        "일정 삭제에 실패했습니다.",
        createToast
      ).then(async () => await fetchItineraries());
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
