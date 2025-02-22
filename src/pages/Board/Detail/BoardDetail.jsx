import { BaseLayout } from "@/layouts";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./BoardDetail.module.css";
import Comment from "./Comment";
import { APIEndPoints } from "@/constants";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { Loading } from "@/components";
import { useAxios } from "@/hooks";
import {formatISO} from "@/utils";

const BoardDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const { loading, fetchData, response } = useAxios();

    useEffect(() => {
      fetchData({
        method: "GET",
        url: `${APIEndPoints.BOARD}/${id}`,
      }).then((res)=>{
        console.log(res);
        setItem(res.data.items);
      }).catch((err) => {
        console.error(err);
      });
    }, [fetchData]);

    console.log(item);

  return (
    <BaseLayout>
    {loading ? (
        <Loading />
      ) : (
        item && (
      <div className={styles.container}>
        <p className={styles.title}>{item.title}</p>
        <div className={styles.header}>
          <div className={styles.user_info}>
            <img src={item.user.profileImageUrl} className={styles.user_img} />
            <p className={styles.user_name}>{item.user.userName}</p>
            <p className={styles.recommend}>조회수 654818</p>
            <p className={styles.recommend}>추천 {item.likeCount}</p>
          </div>
          <p className={styles.date}>{formatISO(item.createdAt)}</p>
        </div>

        <div className={styles.divider} />

        <div
          dangerouslySetInnerHTML={{ __html: item.content }}
          className={styles.content}
        />

        <div className={styles.recommend_box}>
          <FaThumbsUp
            size={32}
            color={
              item.isRecommended
                ? "var(--color-amber-400)"
                : "var( --color-gray-300)"
            }
          />
          <p className={styles.recommend_count}>{item.likeCount}</p>
        </div>
        <div className={styles.divider} />

        <Comment item={item} />
      </div>
        )
      )}
    </BaseLayout>
  );
};

export default BoardDetail;
