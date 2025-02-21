import { useState } from "react";
import styles from "./CommentItem.module.css";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import { formatDistanceToNow } from "date-fns";
import ReplyComment from "./ReplyComment";

const CommentItem = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const formmatDate = formatDistanceToNow(new Date(comment.createdAt));

  return (
    <div className={styles.comment_item}>
      <div className={styles.comment}>
        <img src={"/user1.png"} className={styles.comment_user_img} />
        <div className={styles.flex_column}>
          <div className={styles.comment_info}>
            <p className={styles.comment_user_name}>유저네임</p>
            <p className={styles.comment_date}>{formmatDate}</p>
            <p className={styles.recomment}>답글</p>
            <p className={styles.report}>신고</p>
          </div>
          <p className={styles.comment_text}>{comment.contents}</p>
        </div>
      </div>

      {comment.repliesCount > 0 && (
        <div
          className={styles.recomment_container}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.recomment_info}>
            {isOpen ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
            <p>답글 {comment.repliesCount}개</p>
          </div>
          {isOpen && <ReplyComment commentId={comment.commentId} />}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
