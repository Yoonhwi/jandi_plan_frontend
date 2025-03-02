import { Button, Input, Loading } from "@/components";
import styles from "./Comment.module.css";
import { useEffect, useState } from "react";
import { useAxios, usePagination } from "@/hooks";
import CommentItem from "./CommentItem";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";
import { useAuth, useToast} from "@/contexts";

const Comment = ({ id }) => {
  const { loading, fetchData } = useAxios();
  const [items, setItems] = useState();
  const [totalSize, setTotalSize] = useState();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
  usePagination(); 
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const { createToast } = useToast();

  console.log(user);

  useEffect(() => {
    fetchComments();
  }, [id]);

  const fetchComments = () => {
    (async () => {
      await fetchData({
        url: buildPath(APIEndPoints.COMMUNITY_COMMENTS, { id }),
        method: "GET",
      }).then((res)=>{
        const itemsWithMine = res.data.items.map((comment) => ({
          ...comment,
          mine: comment.user.userId === user?.userId,
        }));

        console.log(itemsWithMine); 
        setTotalPage(res.data.pageInfo?.totalPages || 0);
        setItems(itemsWithMine);
        setTotalSize(res.data.pageInfo?.totalSize);
      });
    })();
  }

  if (loading) return <Loading />;

  const addComment = () =>{
    if(commentText===""){
      createToast({
        type: "error",
        text: "댓글 내용을 입력해주세요",
      });
    }else{
      fetchData({
        method: "POST",
        url: buildPath(APIEndPoints.COMMUNITY_COMMENTS, {id}),
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
          text: "댓글 등록에 실패하였습니다",
        });
      })
    }
  }

  const deleteComment = (id) => {
    fetchData({
      method: "DELETE",
      url: buildPath(APIEndPoints.COMMUNITY_COMMENTS, {id}),
    }).then((res) => {
      fetchComments();
    }).catch((err) => {
      createToast({
        type: "error",
        text: "댓글 삭제에 실패하였습니다",
      });
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.comment_count}>
          댓글 {totalSize} 개
        </p>
        <div className={styles.form_box}>
          <img
            src={user?.profileImageUrl}
            className={styles.current_user_img}
          />
          <Input
            placeholder="댓글을 입력해주세요."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{
              borderRadius: "var(--radius-3xl)",
              padding: "0.8rem 1rem",
              flex: 1,
            }}
          />
          <Button variant="ghost" size="lg" onClick={()=>{addComment()}}>
            등록하기
          </Button>
        </div>
      </div>

      <div className={styles.comment_container}>
        {items?.map((comment) => {
          return <CommentItem key={comment.commentId} comment={comment} deleteComment={deleteComment}/>;
        })}
      </div>
    </div>
  );
};

export default Comment;
