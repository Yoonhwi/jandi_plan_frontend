import { useAxios } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import styles from "./ReplyComment.module.css";
import { formatDistanceToNow } from "date-fns";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";

const ReplyComment = ({ commentId }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const { response, fetchData } = useAxios();

  const hashId = useMemo(() => new Set(), []);

  const isNextPage = useMemo(() => {
    if (!response) return false;
    return response.pageInfo.totalPage > response.pageInfo.currentPage + 1;
  }, [response]);

  useEffect(() => {
    fetchData({
      url: buildPath(APIEndPoints.COMMENTS_REPLIES, { id: commentId }),
      method: "GET",
      params: {
        page,
      },
    });
  }, [commentId, fetchData, page]);

  useEffect(() => {
    if (!response) return;

    const newItems = response.items.filter((item) => {
      if (hashId.has(item.commentId)) {
        return false;
      }

      hashId.add(item.commentId);
      return true;
    });

    setData((prev) => [...prev, ...newItems]);
  }, [hashId, response]);

  return (
    <div className={styles.container}>
      {data.map((comment) => {
        const formatDate = formatDistanceToNow(new Date(comment.createdAt));

        return (
          <div className={styles.comment} key={comment.commentId}>
            <img src={"/user1.png"} className={styles.comment_user_img} />
            <div className={styles.flex_column}>
              <div className={styles.comment_info}>
                <p className={styles.comment_user_name}>유저네임</p>
                <p className={styles.comment_date}>{formatDate}</p>
                <p className={styles.recomment}>답글</p>
                <p className={styles.report}>신고</p>
              </div>
              <p className={styles.comment_text}>{comment.contents}</p>
            </div>
          </div>
        );
      })}

      {isNextPage && (
        <p
          className={styles.more_button}
          onClick={() => setPage((prev) => prev + 1)}
        >
          더보기
        </p>
      )}
    </div>
  );
};

export default ReplyComment;
