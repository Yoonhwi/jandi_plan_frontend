import { Button } from "@/components";
import styles from "./SearhDetail.module.css";
import { useEffect } from "react";
import DetailItem from "./DetailItem";

const dummy = [
  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "https://avatars.githubusercontent.com/u/77326480?v=4",
      nickname: "승휘",
    },

    plan: {
      id: 1,
      title: "오사카 가즈아",
      profile_url: "/fukuoka.jpg",
      like: 10,
      comment: 2,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "오사카",
    },
  },

  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "https://avatars.githubusercontent.com/u/77326480?v=4",
      nickname: "승휘",
    },
    plan: {
      id: 2,
      title: "도쿄 놀러갑니다",
      profile_url: "/osaka.jpg",
      like: 999,
      comment: 0,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "도쿄",
    },
  },

  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "https://avatars.githubusercontent.com/u/77326480?v=4",
      nickname: "승휘",
    },
    plan: {
      id: 3,
      title: "후쿠오카 1박2일 가즈아",
      profile_url: "/tokyo.jpg",
      like: 50,
      comment: 20,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "후쿠오카",
    },
  },
  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "https://avatars.githubusercontent.com/u/77326480?v=4",
      nickname: "승휘",
    },

    plan: {
      id: 4,
      title: "오사카 가즈아",
      profile_url: "/fukuoka.jpg",
      like: 10,
      comment: 2,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "오사카",
    },
  },

  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "https://avatars.githubusercontent.com/u/77326480?v=4",
      nickname: "승휘",
    },
    plan: {
      id: 5,
      title: "도쿄 놀러갑니다",
      profile_url: "/osaka.jpg",
      like: 999,
      comment: 0,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "도쿄",
    },
  },

  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "https://avatars.githubusercontent.com/u/77326480?v=4",
      nickname: "승휘",
    },
    plan: {
      id: 6,
      title: "후쿠오카 1박2일 가즈아",
      profile_url: "/tokyo.jpg",
      like: 50,
      comment: 20,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "후쿠오카",
    },
  },
];

const SearchDetail = ({ keyword }) => {
  useEffect(() => {
    //keyword가 변경될 때마다 데이터페칭 로직
    //페이지네이션이라면 페이지가 변경될때 데이터페칭 로직
    console.log("검색어", keyword);
  }, [keyword]);

  return (
    <div className={styles.container}>
      <div className={styles.sort_btns}>
        <Button size="sm" variant="ghost">
          인기순
        </Button>
        <Button size="sm" variant="ghost">
          최신순
        </Button>
      </div>

      <div className={styles.data_container}>
        {dummy.map((item) => (
          <DetailItem key={item.plan.id} item={item} />
        ))}
      </div>

      {/** 페이지네이션 */}
    </div>
  );
};

export default SearchDetail;
