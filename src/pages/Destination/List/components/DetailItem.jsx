import styles from "./DetailItem.module.css";

const DetailItem = ({ item }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.img_container}
        style={{
          backgroundImage: `url(${item.imageUrl})`,
        }}
      />
      <div className={styles.content_container}>
        <div className={styles.plan_container}>
          <div className={styles.plan_title}>
            <p className={styles.destination}>{item.name}</p>
            <p className={styles.title}>{item.country.continent.name}/{item.country.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
