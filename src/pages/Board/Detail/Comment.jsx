import { Button, Input } from "@/components";
import styles from "./Comment.module.css";

const currentUserDummy = {
  id: 1,
  name: "승휘",
  profile_img: "/user2.jpg",
};

const Comment = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.comment_count}>댓글 {item.comment_count} 개</p>
        <div className={styles.form_box}>
          <img
            src={currentUserDummy.profile_img}
            className={styles.current_user_img}
          />
          <Input
            placeholder="댓글을 입력해주세요."
            style={{
              borderRadius: "var(--radius-3xl)",
              padding: "0.8rem 1rem",
              flex: 1,
            }}
          />
          <Button variant="ghost" size="lg">
            등록하기
          </Button>
        </div>
      </div>

      <div className={styles.comment_container}>
        {item.comment.map((comment) => {
          console.log("comment", comment);
          return (
            <div key={comment.id} className={styles.comment_item}>
              <div className={styles.comment}>
                <img
                  src={comment.user.profile_img}
                  className={styles.comment_user_img}
                />
                <div className={styles.flex_column}>
                  <div className={styles.comment_info}>
                    <p className={styles.comment_user_name}>
                      {comment.user.name}
                    </p>
                    <p className={styles.comment_date}>1일전</p>
                    <p className={styles.recomment}>답글</p>
                    <p className={styles.report}>신고</p>
                  </div>
                  <p className={styles.comment_text}>{comment.content}</p>
                </div>
              </div>

              {comment.recomment_count > 0 && (
                <div className={styles.recomment_container}>
                  <p>답글 {comment.recomment_count}개</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
