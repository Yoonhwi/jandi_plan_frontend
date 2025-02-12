import { BaseLayout } from "@/layouts";
import styles from "./Notice.module.css";
import NoticeItem from "./NoticeItem";

const dummy = [
  {
    title: "점검안내 2월 10일",
    content:
      "안녕하세요. 2월 10일에 점검이 있을 예정입니다. 이에 따라 서비스 이용에 불편을 드려 죄송합니다.",
    created_at: "2025 .02 .08",
  },
  {
    title: "신규 서비스 오픈",
    content:
      "안녕하세요. 새로운 서비스가 오픈되었습니다. 많은 이용 부탁드립니다.",
    created_at: "2025 .02 .01",
  },
  {
    title: "이벤트 안내",
    content:
      "안녕하세요. 이번 주에 이벤트가 있을 예정입니다. 많은 참여 부탁드립니다.",
    created_at: "2025 .01 .25",
  },
  {
    title: "점검안내 1월 20일",
    content:
      "안녕하세요. 1월 20일에 점검이 있을 예정입니다. 이에 따라 서비스 이용에 불편을 드려 죄송합니다.",
    created_at: "2025 .01 .18",
  },
  {
    title: "신규 서비스 출시",
    content:
      "안녕하세요. 새로운 서비스가 출시되었습니다. 많은 이용 부탁드립니다.",
    created_at: "2025 .01 .11",
  },
  {
    title: "겨울 이벤트 안내",
    content:
      "안녕하세요. 이번 주에 이벤트가 있을 예정입니다. 많은 참여 부탁드립니다.",
    created_at: "2025 .01 .04",
  },
];

const Notice = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <p className={styles.title}>공지사항</p>
        <div className={styles.content_container}>
          {dummy.map((item, index) => {
            const data = {
              ...item,
              index,
            };

            return <NoticeItem key={item.title} item={data} />;
          })}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Notice;
