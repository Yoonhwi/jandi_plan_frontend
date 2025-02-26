import { Slider } from "@/components";
import styles from "./MyPlan.module.css";
import { useAxios } from "@/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { APIEndPoints } from "@/constants";
import DetailItem from "./DetailItem";

const MyPlan = () => {
  const [data, setData] = useState([]);
  const { fetchData } = useAxios();

  const hash = useMemo(() => new Set(), []);

  const getMyPlanList = useCallback(async () => {
    await fetchData({
      url: APIEndPoints.TRIP_MY,
      method: "GET",
      params: {
        page: 0,
        size: 10,
      },
    }).then((res) => {
      const itesm = res.data.items;
      const filtered = itesm.filter((item) => {
        if (hash.has(item.tripId)) return false;
        hash.add(item.tripId);
        return true;
      });

      setData((prev) => {
        return [...prev, ...filtered];
      });
    });
  }, [fetchData, hash]);

  useEffect(() => {
    getMyPlanList();
  }, [getMyPlanList]);

  return (
    <div className={styles.myplan_box}>
      <div className={styles.title_box}>
        <p className={styles.title}>여행 계획</p>
      </div>

      {data.length > 0 ? (
        <Slider items={data} size="md">
          {(item) => <DetailItem key={item.tripId} item={item} />}
        </Slider>
      ) : (
        <p>여행 계획이 없습니다.</p>
      )}
    </div>
  );
};

export default MyPlan;
