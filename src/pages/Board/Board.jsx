import { BaseLayout } from "@/layouts";
import styles from "./Board.module.css";
import { Button } from "@/components";
import BoardItem from "./BoardItem";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";

const dummy = [
  {
    id: 10,
    title: "테스트제목",
    date: "12 .31",
    recommended_count: 123456789,
    comment_count: 0,
    user: {
      id: 1,
      name: "민근123123",
      profile_img: "/user1.png",
    },
  },
  {
    id: 9,
    title: "테스트제목",
    date: "12 .31",
    recommended_count: 123456789,
    comment_count: 0,
    user: {
      id: 1,
      name: "민근123123",
      profile_img: "/user1.png",
    },
  },
  {
    id: 8,
    title: "테스트제목",
    date: "12 .31",
    recommended_count: 123456789,
    comment_count: 0,
    user: {
      id: 1,
      name: "민근123123",
      profile_img: "/user1.png",
    },
  },

  {
    id: 7,
    title: "테스트제목 한국어 제목 가나다라마바사 숫자123457671231225125",
    date: "02 .08",
    recommended_count: 123,
    comment_count: 0,
    user: {
      id: 1,
      name: "민근",
      profile_img: "/user1.png",
    },
  },
  {
    id: 6,
    title:
      "asdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvND SLCK",
    date: "02 .08",
    recommended_count: 99899,
    comment_count: 1,
    user: {
      id: 1,
      name: "승휘승휘승휘승휘",
      profile_img: "/user2.jpg",
    },
  },
  {
    id: 5,
    title:
      "asdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvND SLCK",
    date: "02 .08",
    recommended_count: 99899,
    comment_count: 1,
    user: {
      id: 1,
      name: "승휘승휘승휘승휘",
      profile_img: "/user2.jpg",
    },
  },
  {
    id: 4,
    title:
      "asdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvND SLCK",
    date: "02 .08",
    recommended_count: 99899,
    comment_count: 1,
    user: {
      id: 1,
      name: "승휘승휘승휘승휘",
      profile_img: "/user2.jpg",
    },
  },
  {
    id: 3,
    title:
      "asdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvND SLCK",
    date: "02 .08",
    recommended_count: 99899,
    comment_count: 10,
    user: {
      id: 1,
      name: "승휘승휘승휘승휘",
      profile_img: "/user2.jpg",
    },
  },
  {
    id: 2,
    title:
      "asdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvNDSLCKasdasdfasdlvklsdvkALKdkvND SLCK",
    date: "02 .08",
    recommended_count: 998,
    comment_count: 3,
    user: {
      id: 1,
      name: "승휘2323dDv2",
      profile_img: "/user2.jpg",
    },
  },
  {
    id: 1,
    title: "asdasdfasdlvklsdvkALKdkvNDSLCK",
    date: "02 .08",
    recommended_count: 998,
    comment_count: 5,
    user: {
      id: 1,
      name: "승휘",
      profile_img: "/user2.jpg",
    },
  },
];

const BoardPage = () => {
  const navigate = useNavigate();

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.header_title}>Community</p>
          <Button
            variant="ghost"
            onClick={() => navigate(PageEndPoints.BOARD_WRITE)}
          >
            게시글 작성하기
          </Button>
        </div>

        <div className={styles.content}>
          <div className={styles.content_header}>
            <div className={styles.index}>번호</div>
            <div className={styles.title}>제목</div>
            <div className={styles.writer}>작성자</div>
            <div className={styles.date}>작성일</div>
            <div className={styles.recommend}>추천</div>
          </div>

          <ul className={styles.content_list}>
            {dummy.map((item) => {
              return <BoardItem item={item} key={item.id} />;
            })}
          </ul>
        </div>

        {/** UI확인 용 임시 페이지네이션 */}
        <div className={styles.footer}>
          <Button variant="ghost">이전</Button>
          <Button variant="ghost">1</Button>
          <Button variant="ghost">2</Button>
          <Button variant="ghost">3</Button>
          <Button variant="ghost">다음</Button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default BoardPage;
