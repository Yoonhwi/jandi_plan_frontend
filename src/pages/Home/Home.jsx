import { BaseLayout } from "@/layouts";
import styles from "./Home.module.css";
import { descriptionItems } from "./constants";

const HomePage = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <img src="/banner_img.jpg" alt="banner" className={styles.banner_img} />

        <div className={styles.des_container}>
          <p className={styles.title}>WHERE TO GO?</p>
          <div className={styles.divider} />
          <div className={styles.des_img_container}>
            {descriptionItems.map((item) => {
              return (
                <div className={styles.img_relative_box} key={item.title}>
                  <p className={styles.des_img_title}>{item.title}</p>
                  <img
                    src={item.imgSrc}
                    alt="destination"
                    className={styles.des_img}
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.divider} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default HomePage;
