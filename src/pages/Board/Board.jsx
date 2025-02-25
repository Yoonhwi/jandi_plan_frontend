import { BaseLayout } from "@/layouts";
import styles from "./Board.module.css";
import { Button,Loading } from "@/components";
import BoardItem from "./BoardItem";
import { useNavigate, useSearchParams  } from "react-router-dom";
import { useAxios } from "@/hooks";
import { PageEndPoints, APIEndPoints } from "@/constants";
import { useState, useEffect } from "react";


const BoardPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParams = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromParams - 1);
  const [totalPage, setTotalPage] = useState(0);
  const { loading, fetchData, response } = useAxios();

    useEffect(()=> {
      fetchData({
        method: "GET",
        url: `${APIEndPoints.BOARD}`,
        params: { page },
      });
    },[fetchData,page]);

    useEffect(() => {
      if (response?.pageInfo.totalPages) {
        setTotalPage(response.pageInfo.totalPages);
      }
    }, [response]);

    const handlePrevPage = () => {
      if (page > 0) {
        setPage((prev) => prev - 1);
        setSearchParams({ page: page });
      };
    };
  
    const handleNextPage = () => {
      if(page < totalPage - 1) setPage((prev) => prev + 1);
      setSearchParams({ page: page + 2 });
    };

    const handlePageChange = (num) => {
      setPage(num);
      setSearchParams({ page: num + 1 });
    };

  return (
    <BaseLayout>
    {loading ? (
        <Loading />
      ) : (
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

        {/** UI확인 용 임시 페이지네이션 */}
        <div className={styles.footer}>
          <Button variant="ghost" onClick={handlePrevPage} disabled={page === 0}>이전</Button>
          <Button variant={page === 0 ? "solid" : "ghost"} onClick={() => handlePageChange(0)} disabled={page === 0}>
            1
          </Button>
          {page > 2 && <span>...</span>}
          {page > 1 && (
            <Button variant={page === page - 1 ? "solid" : "ghost"} onClick={() => handlePageChange(page - 1)}>
              {page}
            </Button>
          )}
          {page !== 0 && page !== totalPage - 1 && (
            <Button variant="solid" disabled>
              {page+1}
            </Button>
          )}
          {page < totalPage - 2 && (
            <Button variant={page === page - 1 ? "solid" : "ghost"} onClick={() => handlePageChange(page + 1)}>
              {page + 2}
            </Button>
          )}
          {page < totalPage - 3 && <span>...</span>}

          {totalPage > 1 && (
            <Button
              variant={page === totalPage - 1 ? "solid" : "ghost"}
              onClick={() => handlePageChange(totalPage-1)}
              disabled={page === totalPage-1}
            >
              {totalPage}
            </Button>
          )}
          <Button variant="ghost" onClick={handleNextPage} disabled={page === totalPage - 1}>다음</Button>
        </div>
      </div>
      )}
    </BaseLayout>
  );
};

export default BoardPage;
