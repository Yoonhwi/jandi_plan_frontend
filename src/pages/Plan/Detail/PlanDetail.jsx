import { BaseLayout } from "@/layouts";
import { APIProvider } from "@vis.gl/react-google-maps";
import PlanBudget from "./PlanBudget/PlanBudget";
import PlanDes from "./PlanDes/PlanDes";
import styles from "./PlanDetail.module.css";
import PlanDetailProvider from "./PlanDetailProvider";
import PlanInfo from "./PlanInfo/PlanInfo";
import PlanMap from "./PlanMap/PlanMap";

const PlanDetail = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <BaseLayout>
      <PlanDetailProvider>
        <APIProvider apiKey={API_KEY}>
          <div className={styles.container}>
            <PlanInfo />
            <PlanMap />
            <PlanDes />
            <PlanBudget />
          </div>
        </APIProvider>
      </PlanDetailProvider>
    </BaseLayout>
  );
};

export default PlanDetail;
