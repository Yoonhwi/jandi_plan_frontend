import { Button, Input, Loading } from "@/components";
import styles from "./Comment.module.css";
import { useEffect } from "react";
import { useAxios } from "@/hooks";
import CommentItem from "./CommentItem";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";
import { useAuth } from "@/contexts";

const Comment = ({ id }) => {
  const { loading, response, fetchData } = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      await fetchData({
        url: buildPath(APIEndPoints.COMMUNITY_COMMENTS, { id }),
        method: "GET",
      });
    })();
  }, [fetchData, id]);

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.comment_count}>
          댓글 {response?.pageInfo.totalSize} 개
        </p>
        <div className={styles.form_box}>
          <img
            src={user?.profileImageUrl}
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
        {response?.items.map((comment) => {
          return <CommentItem key={comment.commentId} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default Comment;
