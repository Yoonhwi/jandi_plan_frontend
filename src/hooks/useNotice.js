import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { buildPath, handleApiCall } from "@/utils";

// 공지사항을 다룹니다.
const useNotice = () => {
  const { createToast } = useToast();

  const { fetchData: getApi, response: allNotice } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();
  const { fetchData: updateApi } = useAxios();

  const getNotice = useCallback(async () => {
    const url = buildPath(APIEndPoints.NOTICEALL);
    await getApi({ url, method: "GET" });
  }, [getApi]);

  const addNotice = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.NOTICE);

      await handleApiCall(
        () =>
          postApi({
            url,
            method: "POST",
            data,
          }),
        "공지사항이 등록되었습니다.",
        "공지사항 등록에 실패했습니다.",
        createToast,
        getNotice
      );
    },
    [createToast, getNotice, postApi]
  );

  const updateNotice = useCallback(
    async (id, data) => {
      const url = buildPath(APIEndPoints.NOTICE_DETAIL, { id });

      await handleApiCall(
        () =>
          updateApi({
            url,
            method: "PATCH",
            data,
          }),
        "공지사항이 수정되었습니다.",
        "공지사항 수정에 실패했습니다.",
        createToast,
        getNotice
      );
    },
    [createToast, getNotice, updateApi]
  );

  const deleteNotice = useCallback(
    async (id) => {
      const url = buildPath(APIEndPoints.NOTICE_DETAIL, { id });

      await handleApiCall(
        () => deleteApi({ url, method: "DELETE" }),
        "공지사항이 삭제되었습니다.",
        "공지사항 삭제에 실패했습니다.",
        createToast,
        getNotice
      );
    },
    [createToast, deleteApi, getNotice]
  );

  useEffect(() => {
    getNotice();
  }, [getNotice]);

  return {
    allNotice,
    addNotice,
    updateNotice,
    deleteNotice,
  };
};

export default useNotice;
