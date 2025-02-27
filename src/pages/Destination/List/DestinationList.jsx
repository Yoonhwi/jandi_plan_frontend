import styles from "./DestinationList.module.css";
import { useState, useEffect } from "react";
import { BaseLayout } from "@/layouts";
import { CityCard, Input } from "@/components";
import { FiSearch } from "react-icons/fi";
import { PageEndPoints, APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";

const DestinationList = () => {
  const { loading, fetchData, response } = useAxios();
  const [filter, serFilter] = useState("");

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.DESTINATION}`,
      params: { filter },
    });
  }, [fetchData]);

  console.log(response);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.title_box}>
          <p className={styles.title}>어디로 놀러가고 싶으신가요?</p>
          <form className={styles.search_input}>
            <Input
              size="lg"
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
        <div className={styles.plan_container}>
          {response?.map((item) => (
            <CityCard key={item.destinationId} item={item} />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default DestinationList;
