import { BaseLayout } from "@/layouts";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./BoardDetail.module.css";
import Comment from "./Comment";
import { APIEndPoints } from "@/constants";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Loading, Modal, ModalContent, ModalTrigger } from "@/components";
import { useAxios } from "@/hooks";
import { formatDistanceToNow } from "date-fns";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { buildPath, parseContent } from "@/utils";
import { useAuth, useToast } from "@/contexts";
import ReportModal from "./components/ReportModal";

const BoardDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [likes, setLikes] = useState();
  const contentRef = useRef(null);
  const { loading, fetchData, response } = useAxios();
  const { fetchData: likeFetch } = useAxios();
  const { user } = useAuth();

  const { createToast } = useToast();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: buildPath(APIEndPoints.BOARD_DETAIL, { id }),
    })
      .then((res) => {
        const items = res.data.items;
        const content = parseContent(items.content);

        setItem(() => {
          return {
            ...items,
            content,
          };
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [fetchData, id]);

  useEffect(() => {
    if (!contentRef.current) return;

    if (contentRef.current) {
      contentRef.current.querySelectorAll("pre").forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [item]);

  // response가 변경될때, 좋아요 갯수를 업데이트
  // 추후 isLiked가 추가되면, 좋아요 또는 좋아요취소 시, 게시글 fetch를 다시한다면, 자동적으로 업데이트 가능
  useEffect(() => {
    if (!response) return;

    const likeCount = response.items.likeCount || 0;
    setLikes(likeCount);
  }, [response]);

  // 추후 좋아요 또는 좋아요 취소 시 게시글 fetch를 다시합니다.
  // 그렇다면, likes state또한 제거 가능합니다.
  const handleLike = () => {
    likeFetch({
      method: "POST",
      url: buildPath(APIEndPoints.BOARD_LIKE, { id }),
    })
      .then(() => {
        setLikes(likes + 1);
      })
      .catch((err) => {
        console.log(err);
        createToast({
          type: "error",
          text: err.data.message,
        });
      });
  };

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
                <img
                  src={item.user.profileImageUrl}
                  className={styles.user_img}
                />
                <p className={styles.user_name}>{item.user.userName}</p>
                <p className={styles.recommend}>조회수 654818</p>
                <p className={styles.recommend}>추천 {likes}</p>
              </div>
              <div className={styles.header_right_box}>
                <p className={styles.date}>
                  {formatDistanceToNow(item.createdAt)}
                </p>
                {item.user.userId == user.userId ? (
                  <>
                    <div className={styles.dropdown_menu}>수정</div>
                    <div className={styles.dropdown_menu}>삭제</div>
                  </>
                ) : (
                  <>
                    <Modal>
                      <ModalTrigger>
                        <div className={styles.dropdown_menu}>신고</div>
                      </ModalTrigger>
                      <ModalContent>
                        <ReportModal id={item.postId} />
                      </ModalContent>
                    </Modal>
                  </>
                )}
              </div>
            </div>

            <div className={styles.divider} />

            <div
              dangerouslySetInnerHTML={{ __html: item.content }}
              className={`ql-editor ${styles.content}`}
              ref={contentRef}
            />

            <div className={styles.recommend_box}>
              <FaThumbsUp
                size={32}
                color={
                  item.isRecommended
                    ? "var(--color-amber-400)"
                    : "var( --color-gray-300)"
                }
                onClick={() => handleLike()}
              />
              <p className={styles.recommend_count}>{likes}</p>
            </div>
            <div className={styles.divider} />

            {id && <Comment id={id} />}
          </div>
        )
      )}
    </BaseLayout>
  );
};

export default BoardDetail;
