import { formatPrice } from "@/utils";
import styles from "./PlanBudget.module.css";
import { usePlanDetail } from "../PlanDetailContext";

const keys = ["transportation", "accommodation", "etc"];
const map = {
  transportation: "교통비",
  accommodation: "숙박비",
  etc: "기타",
};

const PlanBudget = () => {
  const { plan } = usePlanDetail();
  const { reserved, data, budget } = plan;
  const resultArray = keys.map((key) => ({ [key]: reserved[key].total }));
  const totalCost = data.reduce((acc, cur) => acc + cur.total, 0);
  const remain = budget - totalCost - reserved.total;

  return (
    <div className={styles.container}>
      <p className={styles.title}>BUDGET PLAN</p>
      <div className={styles.budget_column_container}>
        <div className={styles.budget_row_container}>
          <div className={styles.budget_container}>
            <p>총 예산</p>
            <p>{formatPrice(budget)}원</p>
          </div>

          <div className={styles.budget_item}>
            {resultArray.map((item) => {
              const key = Object.keys(item)[0];

              return (
                <div key={key} className={styles.flex_column}>
                  <p className={styles.budget_title}>
                    {map[Object.keys(item)[0]]}
                  </p>
                  <p>{formatPrice(Object.values(item)[0])}원</p>
                </div>
              );
            })}
          </div>

          <div className={styles.budget_item}>
            {data.map((item) => {
              return (
                <div key={item.day} className={styles.flex_column}>
                  <p className={styles.budget_title}>{item.day}일차</p>
                  <p>{formatPrice(item.total)}원</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.remain_container}>
          <p className={styles.remain_title}>남은 예산</p>
          <p className={styles.remain_price}>{formatPrice(remain)}원</p>
        </div>
      </div>
    </div>
  );
};

export default PlanBudget;
