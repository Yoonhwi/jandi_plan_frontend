import styles from "./PlanList.module.css";
import { useEffect } from "react";
import { BaseLayout } from "@/layouts";
import { Input, Loading, Pagination, PlanCard } from "@/components";
import { FiSearch } from "react-icons/fi";
import { useAxios, usePagination } from "@/hooks";
import { APIEndPoints } from "@/constants";

const PlanList = () => {
  const { response, fetchData, loading } = useAxios();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

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
            <form className={styles.search_input}>
              <Input
                size="md"
                placeholder="Search Plans ..."
                style={{
                  width: "100%",
                  borderRadius: "28px",
                  boxSizing: "border-box",
                  padding: "0.5rem 3rem 0.5rem 1.5rem",
                }}
              />

              <div className={styles.icon_search_box}>
                <FiSearch
                  size={24}
                  className={styles.icon_search}
                  type="submit"
                />
              </div>
            </form>
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
