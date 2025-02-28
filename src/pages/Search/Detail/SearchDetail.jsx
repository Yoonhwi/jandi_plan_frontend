import { Button, PlanCard } from "@/components";
import styles from "./SearhDetail.module.css";
import { useEffect } from "react";

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

      {/* <div className={styles.data_container}>
        {dummy.map((item) => (
          <PlanCard key={item.plan.id} item={item} />
        ))}
      </div> */}

      {/** UI확인 용 임시 페이지네이션 */}
      <div className={styles.footer}>
        <Button variant="ghost">이전</Button>
        <Button variant="ghost">1</Button>
        <Button variant="ghost">2</Button>
        <Button variant="ghost">3</Button>
        <Button variant="ghost">다음</Button>
      </div>
    </div>
  );
};

export default SearchDetail;
