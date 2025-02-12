import { BaseLayout } from "@/layouts";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./BoardDetail.module.css";
import Comment from "./Comment";

const dummy = {
  id: 10,
  title: "후쿠오카 후기 ㅋ",
  date: "12 .31",
  recommended_count: 123456,
  comment_count: 2,
  isRecommended: true,
  content: `<p>테스트 내용입니다.</p><img src="/fukuoka.jpg"/><p>테스트 내용입니다.</p><p>테스트 내용입니다.</p><p>테스트 내용입니다.</p><p>테스트 내용입니다.</p>`,
  user: {
    id: 1,
    name: "민근123123",
    profile_img: "/user1.png",
  },
  comment: [
    {
      id: 1,
      content: "댓글입니다.",
      date: "12.31",
      recomment_count: 10,
      user: {
        id: 1,
        name: "민근123123",
        profile_img: "/user1.png",
      },
    },
    {
      id: 2,
      recomment_count: 3,
      content: "댓글입니다.",
      date: "12.31",
      user: {
        id: 2,
        name: "민근123123",
        profile_img: "/user1.png",
      },
    },
    {
      id: 3,
      recomment_count: 0,
      content: "댓글입니다.",
      date: "12.31",
      user: {
        id: 2,
        name: "승휘",
        profile_img: "/user2.jpg",
      },
    },
  ],
};

const BoardDetail = ({ item = dummy }) => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <p className={styles.title}>{item.title}</p>
        <div className={styles.header}>
          <div className={styles.user_info}>
            <img src={item.user.profile_img} className={styles.user_img} />
            <p className={styles.user_name}>{item.user.name}</p>
            <p className={styles.recommend}>조회수 654818</p>
            <p className={styles.recommend}>추천 {item.recommended_count}</p>
          </div>
          <p className={styles.date}>2 days ago</p>
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
          <p className={styles.recommend_count}>{item.recommended_count}</p>
        </div>
        <div className={styles.divider} />

        <Comment item={item} />
      </div>
    </BaseLayout>
  );
};

export default BoardDetail;
