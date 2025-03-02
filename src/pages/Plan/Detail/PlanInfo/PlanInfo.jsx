import styles from "./PlanInfo.module.css";
import { IoLocationSharp } from "react-icons/io5";
import { BsPersonArmsUp } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { usePlanDetail } from "../PlanDetailContext";

const PlanInfo = () => {
  const { tripDetail } = usePlanDetail();

  if (!tripDetail) return null;
  return (
    <div className={styles.container}>
      <p className={styles.title}>{tripDetail.title}</p>
      <div className={styles.info}>
        <div className={styles.flex_row}>
          <IoLocationSharp size={20} />
          <p>
            {"나라"}, {"목적지"}
          </p>
        </div>
        <div className={styles.flex_row}>
          <BsPersonArmsUp size={20} />
          <p>1 명</p>
        </div>
        <div className={styles.flex_row}>
          <MdDateRange size={20} />
          <p>
            {tripDetail.startDate} ~ {tripDetail.endDate}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PlanInfo;
