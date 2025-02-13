import { formatPrice } from "@/utils";
import styles from "./PlanBudget.module.css";

const dummyA = {
  transportation: 400000,
  accommodation: 300000,
  etc: 100000,
  total: 800000,
  budget: 1500000,
};

const keys = ["transportation", "accommodation", "etc"];
const map = {
  transportation: "교통비",
  accommodation: "숙박비",
  etc: "기타",
};
const resultArray = keys.map((key) => ({ [key]: dummyA[key] }));

const dummyB = [200000, 150000, 150000, 10000, 50000, 1, 2, 3, 4];
const total = dummyB.reduce((acc, cur) => acc + cur, 0);

const PlanBudget = ({ plan }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>BUDGET PLAN</p>
      <div className={styles.budget_column_container}>
        <div className={styles.budget_row_container}>
          <div className={styles.budget_container}>
            <p>총 예산</p>
            <p>{formatPrice(dummyA.budget)}원</p>
          </div>

          <div className={styles.budget_item}>
            {resultArray.map((item, index) => (
              <div key={index} className={styles.flex_column}>
                <p className={styles.budget_title}>
                  {map[Object.keys(item)[0]]}
                </p>
                <p>{formatPrice(Object.values(item)[0])}원</p>
              </div>
            ))}
          </div>

          <div className={styles.budget_item}>
            {dummyB.map((item, index) => (
              <div key={index} className={styles.flex_column}>
                <p className={styles.budget_title}>{index + 1}일차</p>
                <p>{formatPrice(item)}원</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.remain_container}>
          <p className={styles.remain_title}>남은 예산</p>
          <p className={styles.remain_price}>
            {formatPrice(dummyA.budget - dummyA.total - total)}원
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanBudget;
