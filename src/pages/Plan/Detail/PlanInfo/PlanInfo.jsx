import styles from "./PlanInfo.module.css";
import { IoLocationSharp } from "react-icons/io5";
import { BsPersonArmsUp } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { usePlanDetail } from "../PlanDetailContext";

const PlanInfo = () => {
  const { plan } = usePlanDetail();
  const { title, country, destination, startDate, endDate, peopleCount } = plan;

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.info}>
        <div className={styles.flex_row}>
          <IoLocationSharp size={20} />
          <p>
            {country}, {destination}
          </p>
        </div>
        <div className={styles.flex_row}>
          <BsPersonArmsUp size={20} />
          <p>{peopleCount} 명</p>
        </div>
        <div className={styles.flex_row}>
          <MdDateRange size={20} />
          <p>
            {startDate} ~ {endDate}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PlanInfo;
