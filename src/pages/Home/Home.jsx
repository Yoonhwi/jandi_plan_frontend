import { BaseLayout } from "@/layouts";
import Banner from "./Banner";
import styles from "./Home.module.css";
import { Button, Slider } from "@/components";
import { useAxios } from "@/hooks";
import { PageEndPoints, APIEndPoints } from "@/constants";
import { useState, useEffect } from "react";

const HomePage = () => {
  const { loading, fetchData, response } = useAxios();
  const [destinations, setDestinations] = useState([]);
  const [plans, setPlans] = useState([]);
  const [filter, serFilter] = useState("");

  useEffect(()=> {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.DESTINATION_BEST}`,
      params: { filter },
    }).then((res)=>{
      setDestinations(res.data);
    }).catch((err) => {
      console.error(err);
    });

  },[fetchData]);

  useEffect(()=> {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.PLAN_BEST}`,
    }).then((res)=>{
      setPlans(res.data);
    }).catch((err) => {
      console.error(err);
    });

  },[fetchData]);


  return (
    <BaseLayout>
      <div className={styles.container}>
        <Banner />

        <div className={styles.interest_container}>
          <div className={styles.title_box}>
            <p className={styles.title}>WHERE TO GO?</p>
          </div>
          <Slider items={destinations} size="sm">
            {(item) => (
              <>
                <div
                  className={styles.img_container}
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                  }}
                />
                <div className={styles.dest_container}>
                  <div className={styles.dest_title}>
                    <p className={styles.dest_name}>{item.name}</p>
                  </div>
                </div>
              </>
            )}
        </Slider>
        </div>

        <div className={styles.interest_container}>
          <div className={styles.title_box}>
            <p className={styles.title}>POPULAR PLANS</p>
          </div>
          <Slider items={plans} size="sm">
            {(item) => (
              <>
                <div
                  className={styles.img_container}
                  style={{
                    backgroundImage: `url(${item.cityImageUrl})`,
                  }}
                />
                <div className={styles.plan_container}>
                  <div className={styles.plan_title}>
                    <p className={styles.plan_name}>{item.title}</p>
                  </div>
                </div>
              </>
            )}
        </Slider>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HomePage;
