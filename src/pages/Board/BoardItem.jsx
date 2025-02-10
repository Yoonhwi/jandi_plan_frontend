import { useNavigate } from "react-router-dom";
import styles from "./BoardItem.module.css";
import { PageEndPoints } from "@/constants";
import { buildPath } from "@/utils";
import { useCallback } from "react";

const BoardItem = ({ item }) => {
  const navigate = useNavigate();
  const commentCount = Number(item.comment_count);

  const handleClick = useCallback(() => {
    const path = buildPath(PageEndPoints.BOARD_DETAIL, { id: item.id });
    navigate(path);
  }, [item.id, navigate]);

  return (
    <li key={item.id} className={styles.container} onClick={handleClick}>
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
