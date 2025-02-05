import { BaseLayout } from "@/layouts";
import { formatPrice } from "@/utils";
import { TiHeartFullOutline } from "react-icons/ti";
import styles from "./Home.module.css";
import { descriptionItems } from "./constants";

const HomePage = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <img src="/banner_img.jpg" alt="banner" className={styles.banner_img} />

        {descriptionItems.map((item) => {
          const { title, data } = item;

          return (
            <div key={title} className={styles.des_container}>
              <p className={styles.title}>{title}</p>
              <div className={styles.divider} />

              <div className={styles.des_img_container}>
                {data.map((item) => {
                  const isDetail = item.price && item.like_count;
                  return (
                    <div className={styles.img_relative_box} key={item.name}>
                      <p className={styles.des_img_title}>{item.name}</p>
                      <img
                        src={item.imgSrc}
                        alt="destination"
                        className={styles.des_img}
                      />
                      {isDetail && (
                        <div className={styles.des_detail}>
                          <p>{formatPrice(item.price)}₩</p>
                          <div className={styles.like_box}>
                            <TiHeartFullOutline className={styles.icon_heart} />
                            <p>{item.like_count}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={styles.divider} />
            </div>
          );
        })}
      </div>
    </BaseLayout>
  );
};

export default HomePage;
