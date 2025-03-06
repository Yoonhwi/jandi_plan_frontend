import { APIEndPoints, PageEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useCommunity = () => {
  const navigate = useNavigate();
  const { createToast } = useToast();

  const {
    response: communities,
    fetchData: getApi,
    loading: getLoading,
  } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: updateApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();

  const fetchCommunities = useCallback(
    async (page, setTotalPage) => {
      await getApi({
        method: "GET",
        url: APIEndPoints.BOARD,
        params: { page },
      }).then((res) => {
        setTotalPage(res.data.pageInfo.totalPages || 0);
      });
    },
    [getApi]
  );

  const addCommunity = useCallback(
    async (data) => {
      await postApi({
        method: "POST",
        url: APIEndPoints.BOARD,
        data,
      })
        .then((res) => {
          createToast({ text: "게시글이 등록되었습니다.", type: "success" });
          navigate(
            buildPath(PageEndPoints.BOARD_DETAIL, { id: res.data.postId })
          );
        })
        .catch(() => {
          createToast({ text: "게시글 등록에 실패했습니다.", type: "error" });
        });
    },
    [createToast, navigate, postApi]
  );

  const updateCommunity = useCallback(
    async (data) => {
      const id = data.tempPostId;
      await updateApi({
        method: "PATCH",
        url: buildPath(APIEndPoints.BOARD_DETAIL, { id }),
        data,
      })
        .then(() => {
          createToast({ text: "게시글이 수정되었습니다.", type: "success" });
          navigate(buildPath(PageEndPoints.BOARD_DETAIL, { id }));
        })
        .catch(() => {
          createToast({ text: "게시글 수정에 실패했습니다.", type: "error" });
        });
    },
    [createToast, navigate, updateApi]
  );

  const deleteCommunity = useCallback(
    async (id) => {
      await deleteApi({
        method: "DELETE",
        url: buildPath(APIEndPoints.BOARD_DETAIL, { id }),
      })
        .then(() => {
          createToast({ text: "게시글이 삭제되었습니다.", type: "success" });
          navigate(PageEndPoints.BOARD);
        })
        .catch(() => {
          createToast({ text: "게시글 삭제에 실패했습니다.", type: "error" });
        });
    },
    [createToast, deleteApi, navigate]
  );

  return {
    communities,
    fetchCommunities,
    getLoading,
    addCommunity,
    updateCommunity,
    deleteCommunity,
  };
};

export default useCommunity;
