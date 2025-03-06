import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useNavigate } from "react-router-dom";

const usePlan = (id) => {
  const navigate = useNavigate();
  const { createToast } = useToast();

  const { response: tripDetail, fetchData: getApi } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: updateApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();

  // 여행계획 데이터를 가져오는 함수
  const fetchTripDetail = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_DETAIL, { id });
    await getApi({ url, method: "GET" });
  }, [id, getApi]);

  const addPlan = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_CREATE);
      await postApi({ url, method: "POST", data })
        .then((res) => {
          createToast({ text: "계획이 추가되었습니다.", type: "success" });

          const path = buildPath(PageEndPoints.PLAN_DETAIL, {
            id: res.data.tripId,
          });

          navigate(path);
        })
        .catch(() =>
          createToast({ text: "게획등록에 실패했습니다.", type: "error" })
        );

      await fetchTripDetail();
    },
    [createToast, fetchTripDetail, navigate, postApi]
  );

  const updatePlan = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_MY_DETAIL, { id });
      await updateApi({ url, method: "PATCH", data })
        .then(() =>
          createToast({ text: "계획이 수정되었습니다.", type: "success" })
        )
        .catch(() =>
          createToast({ text: "계획 수정에 실패했습니다.", type: "error" })
        );

      await fetchTripDetail();
    },
    [createToast, fetchTripDetail, id, updateApi]
  );

  const deletePlan = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_MY_DETAIL, { id });
    await deleteApi({ url, method: "DELETE" })
      .then(() => {
        createToast({ text: "계획이 삭제되었습니다.", type: "success" });
        navigate(PageEndPoints.PLAN_LIST);
      })
      .catch(() =>
        createToast({ text: "계획 삭제에 실패했습니다.", type: "error" })
      );

    await fetchTripDetail();
  }, [createToast, deleteApi, fetchTripDetail, id, navigate]);

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
