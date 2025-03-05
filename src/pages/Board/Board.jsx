import { Button, Loading, Pagination } from "@/components";
import { PageEndPoints } from "@/constants";
import { useCommunity } from "@/hooks";
import { usePagination } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Board.module.css";
import BoardItem from "./BoardItem";

const BoardPage = () => {
  const navigate = useNavigate();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const { communities, fetchCommunities, getLoading } = useCommunity();

  useEffect(() => {
    fetchCommunities(currentPage - 1, setTotalPage);
  }, [currentPage, fetchCommunities, setTotalPage]);

  return (
    <BaseLayout>
      {getLoading && <Loading />}
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
            {communities?.items.map((item) => {
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
