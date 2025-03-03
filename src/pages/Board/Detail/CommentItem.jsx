import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./CommentItem.module.css";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import { formatDistanceToNow } from "date-fns";
import ReplyComment from "./ReplyComment";
import { Input, Button } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useAuth, useToast } from "@/contexts";
import { buildPath } from "@/utils";


const CommentItem = ({ comment,deleteComment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const formmatDate = formatDistanceToNow(new Date(comment.createdAt));
  const id = comment.commentId; 
  const [likes, setLikes] = useState(comment.likeCount);
  const { loading, fetchData } = useAxios();
  
  const { createToast } = useToast();

  const handleLike = () =>{
    fetchData({
      method: "POST",
      url: buildPath(APIEndPoints.COMMENTS_LIKE, { id }),
    }).then(() => {
      setLikes(likes+1);
    }).catch((err) => {
      console.log(err);
      createToast({
        type: "error",
        text: err.data.message,
      });
    })
  }

  return (
    <div className={styles.comment_item}>
      <div className={styles.comment}>
        <img src={comment.user.profileImageUrl} className={styles.comment_user_img} />
        <div className={styles.flex_column}>
          <div className={styles.comment_info}>
            <p className={styles.comment_user_name}>{comment.user.userName}</p>
            <p className={styles.comment_date}>{formmatDate}</p>
            <p className={styles.recomment}>답글</p>
            <p className={styles.report}>신고</p>
            {/* <FaThumbsUp
            size={16}
            color={
              comment.isRecommended
                ? "var(--color-amber-400)"
                : "var( --color-gray-300)"
            }
          /> */}
            {comment.mine ? 
              <p className={styles.report} onClick={()=> deleteComment(comment.commentId)}>삭제</p> 
            : 
              <>
                <FaThumbsUp size={12} color={comment.isRecommended? "var(--color-amber-400)": "var( --color-gray-300)"} onClick={()=>{handleLike()}} />
                <p className={styles.likeCount}> {likes}</p>
              </>}

          </div>
          <p className={styles.comment_text}>{comment.contents}</p>
        </div>
      </div>
      {/* {isReplyOpen && <div className={styles.form_box}>
          <img
            // src={user?.profileImageUrl}
            className={styles.current_user_img}
          />
          <Input
            placeholder="댓글을 입력해주세요."
            // value={commentText}
            // onChange={(e) => setCommentText(e.target.value)}
            style={{
              borderRadius: "var(--radius-3xl)",
              padding: "0.8rem 1rem",
              flex: 1,
            }}
          />
          <Button variant="ghost" size="lg" >
            등록하기
          </Button>
        </div>} */}

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
