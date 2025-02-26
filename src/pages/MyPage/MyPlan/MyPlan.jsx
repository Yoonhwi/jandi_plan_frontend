import { Pagination, PlanCard } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAxios, usePagination } from "@/hooks";
import { useEffect } from "react";
import styles from "./MyPlan.module.css";

const MyPlan = ({ size }) => {
  const { fetchData, response } = useAxios();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: APIEndPoints.TRIP_MY,
      params: { page: currentPage - 1, size },
    }).then((res) => {
      setTotalPage(res.data.pageInfo?.totalPages || 0);
    });
  }, [currentPage, fetchData, setTotalPage, size]);

  return (
    <div className={styles.myplan_box}>
      <div className={styles.title_box}>
        <p className={styles.title}>여행 계획</p>
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
        <p>여행 계획이 없습니다.</p>
      )}
    </div>
  );
};

export default MyPlan;
