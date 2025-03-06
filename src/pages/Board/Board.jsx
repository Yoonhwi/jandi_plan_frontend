import { Button, Input, Loading, Pagination } from "@/components";
import { PageEndPoints } from "@/constants";
import { useCommunity } from "@/hooks";
import { usePagination } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Board.module.css";
import BoardItem from "./BoardItem";
import { FiSearch } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchBoardScheme } from "./constants";

const BoardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const navigate = useNavigate();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const { communities, fetchCommunities, getLoading } = useCommunity();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchBoardScheme),
  });

  const onSubmit = (data) => {
    const searchKeyword = data.keyword;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    newSearchParams.set("keyword", searchKeyword);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    fetchCommunities(
      { page: currentPage - 1, keyword, category: "BOTH" },
      setTotalPage
    );
  }, [currentPage, fetchCommunities, keyword, setTotalPage]);

  return (
    <BaseLayout>
      {getLoading && <Loading />}
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <p>잡담부터 정보까지 !</p>
            <Button
              variant="solid"
              onClick={() => navigate(PageEndPoints.BOARD_WRITE)}
              size="sm"
            >
              게시글 작성하기
            </Button>
          </div>

          <form
            className={styles.search_input}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              size="md"
              placeholder="Search ..."
              style={{
                width: "100%",
                borderRadius: "28px",
                boxSizing: "border-box",
                padding: "0.7rem 3rem 0.7rem 1.5rem",
              }}
              register={register}
              name="keyword"
            />
            {errors.keyword && (
              <p className={styles.error_message}>{errors.keyword.message}</p>
            )}

            <Button
              variant="none"
              type="submit"
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
              }}
            >
              <FiSearch size={24} className={styles.icon_search} />
            </Button>
          </form>
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

        <div className={styles.pagination}>
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
