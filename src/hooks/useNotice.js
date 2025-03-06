import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { buildPath } from "@/utils";

const useNotice = () => {
  const { createToast } = useToast();

  const { fetchData: getApi, response: allNotice } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();
  const { fetchData: updateApi } = useAxios();

  const getNotice = useCallback(async () => {
    await getApi({ url: APIEndPoints.NOTICEALL, method: "GET" });
  }, [getApi]);

  const addNotice = useCallback(
    async (data) => {
      console.log("Data", data);
      await postApi({
        method: "POST",
        url: APIEndPoints.NOTICE,
        data: {
          title: data.title,
          tempNoticeId: data.tempNoticeId,
          contents: data.content,
        },
      })
        .then(() => {
          createToast({ text: "공지사항이 등록되었습니다.", type: "success" });
        })
        .catch(() => {
          createToast({ text: "공지사항 등록에 실패했습니다.", type: "error" });
        });

      await getNotice();
    },
    [createToast, getNotice, postApi]
  );

  const updateNotice = useCallback(
    async (id, data) => {
      await updateApi({
        method: "PATCH",
        url: buildPath(APIEndPoints.NOTICE_DETAIL, { id }),
        data,
      })
        .then(() => {
          createToast({ text: "공지사항이 수정되었습니다.", type: "success" });
        })
        .catch(() => {
          createToast({ text: "공지사항 수정에 실패했습니다.", type: "error" });
        });

      await getNotice();
    },
    [createToast, getNotice, updateApi]
  );

  const deleteNotice = useCallback(
    async (id) => {
      await deleteApi({
        method: "DELETE",
        url: buildPath(APIEndPoints.NOTICE_DETAIL, { id }),
      })
        .then(() => {
          createToast({ text: "공지사항이 삭제되었습니다.", type: "success" });
        })
        .catch(() => {
          createToast({ text: "공지사항 삭제에 실패했습니다.", type: "error" });
        });

      await getNotice();
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
