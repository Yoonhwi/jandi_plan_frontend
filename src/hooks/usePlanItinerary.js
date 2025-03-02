import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";

const usePlanItinerary = (id) => {
  const { response: itineraries, fetchData: fetchItinerary } = useAxios();
  const { fetchData: postItinerary } = useAxios();
  const { fetchData: updateItinerary } = useAxios();
  const { fetchData: deleteItinerary } = useAxios();

  // 일정 데이터를 가져오는 함수
  const fetchPlanItinerary = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id });
    await fetchItinerary({ url, method: "GET" });
  }, [id, fetchItinerary]);

  // 일정 데이터를 추가하는 함수
  const addItinerary = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id });
      await postItinerary({ url, method: "POST", data });
      await fetchPlanItinerary();
    },
    [id, postItinerary, fetchPlanItinerary]
  );

  // 일정 데이터를 수정하는 함수
  const updatePlanItinerary = useCallback(
    async (itemId, data) => {
      const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id, itemId });
      await updateItinerary({ url, method: "PATCH", data });
      await fetchPlanItinerary();
    },
    [id, updateItinerary, fetchPlanItinerary]
  );

  // 일정 데이터를 삭제하는 함수
  const deletePlanItinerary = useCallback(
    async (itemId) => {
      const url = buildPath(APIEndPoints.TRIP_ITINERARY, { id, itemId });
      await deleteItinerary({ url, method: "DELETE" });
      await fetchPlanItinerary();
    },
    [id, deleteItinerary, fetchPlanItinerary]
  );

  useEffect(() => {
    fetchPlanItinerary();
  }, [fetchPlanItinerary]);

  return {
    itineraries,
    fetchPlanItinerary,
    addItinerary,
    updatePlanItinerary,
    deletePlanItinerary,
  };
};

export default usePlanItinerary;
