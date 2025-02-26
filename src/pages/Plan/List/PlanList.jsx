import styles from "./PlanList.module.css";
import { useEffect } from "react";
import { BaseLayout } from "@/layouts";
import DetailItem from "@/pages/Search/Detail/DetailItem";
import { Button, Input, Loading } from "@/components";
import { FiSearch } from "react-icons/fi";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";

const PlanList = () => {
  const { response, fetchData, loading } = useAxios();

  useEffect(() => {
    fetchData({
      url: APIEndPoints.TRIP_ALL,
      method: "GET",
    });
  }, [fetchData]);

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
                <DetailItem key={item.tripId} item={item} />
              ))}
            </div>
          )}

          <div className={styles.footer}>
            <Button variant="ghost">이전</Button>
            <Button variant="ghost">1</Button>
            <Button variant="ghost">2</Button>
            <Button variant="ghost">3</Button>
            <Button variant="ghost">다음</Button>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default PlanList;
