import styles from "./BoardItem.module.css";

const BoardItem = ({ item }) => {
  const commentCount = Number(item.comment_count);
  console.log(commentCount);

  return (
    <li key={item.id} className={styles.container}>
      <div className={styles.index}>{item.id}</div>

      <div className={styles.title_box}>
        <p className={styles.title}>{item.title}</p>
        {commentCount > 0 && (
          <p className={styles.comment_count}>[{commentCount}]</p>
        )}
      </div>

      <div className={styles.writer}>
        <img src={item.user.profile_img} className={styles.writer_img} />
        <p className={styles.writer_name}>{item.user.name}</p>
      </div>
      <div className={styles.date}>{item.date}</div>
      <div className={styles.recommend}>{item.recommended_count}</div>
    </li>
  );
};

export default BoardItem;
