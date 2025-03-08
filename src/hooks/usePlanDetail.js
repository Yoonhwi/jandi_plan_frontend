import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath, handleApiCall } from "@/utils";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useNavigate } from "react-router-dom";

// id에 해당하는 여행의 상세 정보를 다룹니다.
const usePlan = (id) => {
  const navigate = useNavigate();
  const { createToast } = useToast();

  const { response: tripDetail, fetchData: getApi } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: updateApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();

  const fetchTripDetail = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_DETAIL, { id });
    await getApi({ url, method: "GET" });
  }, [id, getApi]);

  const addPlan = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_CREATE);

      await handleApiCall(
        () => postApi({ url, method: "POST", data }),
        "계획이 추가되었습니다.",
        "계획 등록에 실패했습니다.",
        createToast,
        async (res) => {
          const path = buildPath(PageEndPoints.PLAN_DETAIL, {
            id: res.data.tripId,
          });
          navigate(path);
        }
      );
    },
    [createToast, navigate, postApi]
  );

  const updatePlan = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_MY_DETAIL, { id });

      await handleApiCall(
        () => updateApi({ url, method: "PATCH", data }),
        "계획이 수정되었습니다.",
        "계획 수정에 실패했습니다.",
        createToast,
        fetchTripDetail
      );
    },
    [createToast, fetchTripDetail, id, updateApi]
  );

  const deletePlan = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_MY_DETAIL, { id });

    await handleApiCall(
      () => deleteApi({ url, method: "DELETE" }),
      "계획이 삭제되었습니다.",
      "계획 삭제에 실패했습니다.",
      createToast,
      () => navigate(PageEndPoints.PLAN_LIST)
    );
  }, [createToast, deleteApi, id, navigate]);

  useEffect(() => {
    fetchTripDetail();
  }, [fetchTripDetail]);

  return {
    tripDetail,
    addPlan,
    updatePlan,
    deletePlan,
  };
};

export default usePlan;
