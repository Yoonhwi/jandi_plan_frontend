import { Pagination, PlanCard } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAxios, usePagination } from "@/hooks";
import { useEffect } from "react";
import styles from "./MyPlan.module.css";
import { useSearchParams } from "react-router-dom";

const MyPlan = ({ title, fetchUrl, queryKey, size }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const { fetchData, response } = useAxios();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination(queryKey);

  // size가 변경될때, 변경된 totalPages보다 높은 페이지를 보고 있을 수도 있기에, 페이지를 1로 초기화
  useEffect(() => {
    setSearchParams({ [queryKey]: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: fetchUrl,
      params: { page: currentPage - 1, size },
    }).then((res) => {
      setTotalPage(res.data.pageInfo?.totalPages || 0);
    });
  }, [currentPage, fetchData, setTotalPage, size]);

  return (
    <div className={styles.myplan_box}>
      <div className={styles.title_box}>
        <p className={styles.title}>{title}</p>
      </div>

      {response?.items?.length > 0 ? (
        <div className={styles.flex_column}>
          <div
            className={styles.grid_container}
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
          >
            {response.items.map((item) => {
              return <PlanCard key={item.tripId} item={item} />;
            })}
          </div>

          <div className={styles.pagination}>
            <Pagination
              callback={handlePageChange}
              currentPage={currentPage}
              totalPage={totalPage}
            />
          </div>
        </div>
      ) : (
        <p>{title}이 없습니다.</p>
      )}
    </div>
  );
};

export default MyPlan;
