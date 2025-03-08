import styles from "./PlanList.module.css";
import { useEffect } from "react";
import { BaseLayout } from "@/layouts";
import { Button, Loading, Pagination, PlanCard } from "@/components";
import { useAxios, usePagination } from "@/hooks";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useNavigate } from "react-router-dom";

const PlanList = () => {
  const { response, fetchData, loading } = useAxios();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const navigate = useNavigate();

  useEffect(() => {
    fetchData({
      url: APIEndPoints.TRIP_ALL,
      method: "GET",
      params: { page: currentPage - 1 },
    }).then((res) => {
      setTotalPage(res.data.pageInfo?.totalPages || 0);
    });
  }, [currentPage, fetchData, setTotalPage]);

  return (
    <BaseLayout>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.title_box}>
            <p className={styles.title}>이런 여행 일정은 어때요?</p>
            <Button
              variant={"ghost"}
              onClick={() => navigate(PageEndPoints.PLAN_CREATE)}
            >
              계획 만들기
            </Button>
          </div>

          {response && (
            <div className={styles.plan_container}>
              {response.items.map((item) => (
                <PlanCard key={item.tripId} item={item} />
              ))}
            </div>
          )}

          <div className={styles.footer}>
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              callback={handlePageChange}
            />
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default PlanList;
