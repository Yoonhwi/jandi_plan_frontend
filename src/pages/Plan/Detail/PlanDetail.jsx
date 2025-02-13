import { BaseLayout } from "@/layouts";
import styles from "./PlanDetail.module.css";
import PlanInfo from "./PlanInfo/PlanInfo";
import PlanMap from "./PlanMap/PlanMap";
import PlanBudget from "./PlanBudget/PlanBudget";
import PlanDes from "./PlanDes/PlanDes";

const dummy = {
  title: "오사카 가자아",
  country: "일본",
  destination: "오사카",
  startDate: "2023.06.30",
  endDate: "2023.07.04",
  peopleCount: 1,
  latitude: 34.6937,
  longitude: 135.5023,
};

const PlanDetail = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <PlanInfo plan={dummy} />
        <PlanMap plan={dummy} />
        <PlanBudget plan={dummy} />
        <PlanDes plan={dummy} />
      </div>
    </BaseLayout>
  );
};

export default PlanDetail;
