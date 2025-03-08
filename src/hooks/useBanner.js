import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { buildPath, handleApiCall } from "@/utils";

const useBanner = () => {
  const { createToast } = useToast();

  const { fetchData: getApi, response: allBanner } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();
  const { fetchData: updateApi } = useAxios();

  const getBanner = useCallback(async () => {
    const url = buildPath(APIEndPoints.BANNER);
    await getApi({ url, method: "GET" });
  }, [getApi]);

  const addBanner = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.BANNER);

      await handleApiCall(
        () =>
          postApi({
            url,
            method: "POST",
            data,
          }),
        "배너가 등록되었습니다.",
        "배너 등록에 실패했습니다.",
        createToast,
        getBanner
      );
    },
    [createToast, getBanner, postApi]
  );

  const updateBanner = useCallback(
    async (id, data) => {
      const url = buildPath(APIEndPoints.BANNER_DETAIL, { id });

      await handleApiCall(
        () =>
          updateApi({
            url,
            method: "PATCH",
            data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
        "배너가 수정되었습니다.",
        "배너 수정에 실패했습니다.",
        createToast,
        getBanner
      );
    },
    [createToast, getBanner, updateApi]
  );

  const deleteBanner = useCallback(
    async (id) => {
      const url = buildPath(APIEndPoints.BANNER_DETAIL, { id });

      await handleApiCall(
        () =>
          deleteApi({
            url,
            method: "DELETE",
          }),
        "배너가 삭제되었습니다.",
        "배너 삭제에 실패했습니다.",
        createToast,
        getBanner
      );
    },
    [createToast, deleteApi, getBanner]
  );

  useEffect(() => {
    getBanner();
  }, [getBanner]);

  return { allBanner, addBanner, updateBanner, deleteBanner };
};

export default useBanner;
