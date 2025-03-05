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


const CommentItem = ({ comment,deleteComment, user, fetchComments,handleLike }) => {
  console.log(comment);
  const [isOpen, setIsOpen] = useState(false);
  const formmatDate = formatDistanceToNow(new Date(comment.createdAt));
  const id = comment.commentId; 
  const [likes, setLikes] = useState(comment.likeCount);
  const [isLiked, setIsLiked] = useState(comment.liked);
  const { loading, fetchData } = useAxios();
  const [isReplying, setIsReplying] = useState(false); 
  const [commentText, setCommentText] = useState("");
  
  const { createToast } = useToast();

  const addReply = () =>{
    if(commentText===""){
      createToast({
        type: "error",
        text: "답글 내용을 입력해주세요",
      });
    }else{
      fetchData({
        method: "POST",
        url: buildPath(APIEndPoints.COMMENTS_REPLIES, {id}),
        data: {
          contents: commentText,
        }
      }).then((res) => {
        console.log("성공")
        setCommentText("");
        fetchComments();
      }).catch((err) => {
        createToast({
          type: "error",
          text: "답글 등록에 실패하였습니다",
        });
      })
    }
  }

  return (
    <div className={styles.comment_item}>
      <div className={styles.comment}>
        <img src={comment.user.profileImageUrl} className={styles.comment_user_img} />
        <div className={styles.flex_column}>
          <div className={styles.comment_info}>
            <p className={styles.comment_user_name}>{comment.user.userName}</p>
            <p className={styles.comment_date}>{formmatDate}</p>
            <p className={styles.recomment}  onClick={() => setIsReplying(!isReplying)}>답글</p>
            {comment.mine ? 
              <>
                <p className={styles.report} onClick={()=> deleteComment(comment.commentId)}>삭제</p> 
              </>
            : 
              <>
                <p className={styles.report}>신고</p>
                <FaThumbsUp size={12} color={comment.liked? "var(--color-amber-400)": "var( --color-gray-300)"} onClick={()=>{handleLike(comment.commentId,comment.liked)}} />
                <p className={styles.likeCount}> {likes}</p>
              </>}

          </div>
          <p className={styles.comment_text}>{comment.contents}</p>
        </div>
      </div>

      {isReplying && (
        <div className={styles.form_box}>
          <img src={user?.profileImageUrl} className={styles.current_user_img} />
          <Input
            size="sm"
            placeholder="답글을 입력해주세요."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{
              borderRadius: "var(--radius-3xl)",
              padding: "0.8rem 1rem",
              flex: 1,
            }}
          />
          <Button variant="ghost" size="md" onClick={()=>{addReply()}}>
            등록하기
          </Button>
        </div>
      )}

      {comment.repliesCount > 0 && (
        <div
          className={styles.recomment_container}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.recomment_info}>
            {isOpen ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
            <p>답글 {comment.repliesCount}개</p>
          </div>
          {isOpen && <ReplyComment commentId={comment.commentId} user={user}/>}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
