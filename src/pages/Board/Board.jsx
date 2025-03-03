import { Button, Loading, Pagination } from "@/components";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { usePagination } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Board.module.css";
import BoardItem from "./BoardItem";

const BoardPage = () => {
  const navigate = useNavigate();
  const { loading, fetchData, response } = useAxios();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.BOARD}`,
      params: { page: currentPage - 1 },
    }).then((res) => {
      setTotalPage(res.data.pageInfo.totalPages || 0);
    });
  }, [currentPage, fetchData, setTotalPage]);

  return (
    <BaseLayout>
      {loading && <Loading />}
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.header_title}>잡담부터 정보까지 !</p>
          <Button
            variant="ghost"
            onClick={() => navigate(PageEndPoints.BOARD_WRITE)}
          >
            게시글 작성하기
          </Button>
        </div>

        <div className={styles.content}>
          <div className={styles.content_header}>
            <div className={styles.index}>번호</div>
            <div className={styles.title}>제목</div>
            <div className={styles.writer}>작성자</div>
            <div className={styles.date}>작성일</div>
            <div className={styles.recommend}>추천</div>
          </div>

          <ul className={styles.content_list}>
            {response?.items.map((item) => {
              return <BoardItem item={item} key={item.postId} />;
            })}
          </ul>
        </div>

        <div className={styles.center}>
          <Pagination
            callback={handlePageChange}
            currentPage={currentPage}
            totalPage={totalPage}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default BoardPage;
