import { APIEndPoints, PageEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { buildPath, handleApiCall } from "@/utils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// 게시판을 다룹니다.
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
      const url = buildPath(APIEndPoints.BOARD);
      await getApi({
        method: "GET",
        url,
        params: { page },
      }).then((res) => {
        setTotalPage(res.data.pageInfo.totalPages || 0);
      });
    },
    [getApi]
  );

  const addCommunity = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.BOARD);

      await handleApiCall(
        () =>
          postApi({
            method: "POST",
            url,
            data,
          }),
        "게시글이 등록되었습니다.",
        "게시글 등록에 실패했습니다.",
        createToast,
        (res) =>
          navigate(
            buildPath(PageEndPoints.BOARD_DETAIL, { id: res.data.postId })
          )
      );
    },
    [createToast, navigate, postApi]
  );

  const updateCommunity = useCallback(
    async (data) => {
      const id = data.tempPostId;
      const url = buildPath(APIEndPoints.BOARD_DETAIL, { id });

      await handleApiCall(
        () => updateApi({ method: "PATCH", url, data }),
        "게시글이 수정되었습니다.",
        "게시글 수정에 실패했습니다.",
        createToast,
        () => navigate(buildPath(PageEndPoints.BOARD_DETAIL, { id }))
      );
    },
    [createToast, navigate, updateApi]
  );

  const deleteCommunity = useCallback(
    async (id) => {
      const url = buildPath(APIEndPoints.BOARD_DETAIL, { id });

      await handleApiCall(
        () => deleteApi({ method: "DELETE", url }),
        "게시글이 삭제되었습니다.",
        "게시글 삭제에 실패했습니다.",
        createToast,
        () => navigate(PageEndPoints.BOARD)
      );
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
