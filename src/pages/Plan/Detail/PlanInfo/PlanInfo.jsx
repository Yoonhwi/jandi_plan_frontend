import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import { BsPersonArmsUp } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import DeletePlan from "../ModalContents/DeletePlan";
import ModifyPlan from "../ModalContents/ModifyPlan";
import { usePlanDetail } from "../PlanDetailContext";
import styles from "./PlanInfo.module.css";

const PlanInfo = (user) => {
  const { tripDetail } = usePlanDetail();

  if (!tripDetail) return null;
  const isMine = tripDetail.user.userId === user?.user.userId;

  return (
    <div className={styles.container}>
      <div className={styles.header_box}>
        <p className={styles.title}>{tripDetail.title}</p>
        {isMine ? (
          <div className={styles.header_menu}>
            <Modal>
              <ModalTrigger>
                <Button variant="ghost">수정</Button>
              </ModalTrigger>
              <ModalContent>
                <ModifyPlan plan={tripDetail} />
              </ModalContent>
            </Modal>
            <Modal>
              <ModalTrigger>
                <Button variant="ghost">삭제</Button>
              </ModalTrigger>
              <ModalContent>
                <DeletePlan />
              </ModalContent>
            </Modal>
          </div>
        ) : (
          <div className={styles.header_menu}>
            <p className={styles.username}>{user.user.username}</p>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.flex_row}>
          <IoLocationSharp size={20} />
          <p>
            {tripDetail.countryName}, {tripDetail.cityName}
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
