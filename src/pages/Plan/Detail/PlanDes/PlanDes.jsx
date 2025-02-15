import styles from "./PlanDes.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useMemo, useState } from "react";
import Reserved from "./Reserved";
import DayDetail from "./DayDetail";
import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import CreateReservation from "../ModalContents/CreateReservation";
import CreateSchedule from "../ModalContents/CreateSchedule";
import { usePlanDetail } from "../PlanDetailContext";

const PlanDes = () => {
  const { plan, focusDay, setFocusDay } = usePlanDetail();
  const { reserved, data } = plan;

  const renderItem = useMemo(() => {
    if (focusDay === null) {
      return <Reserved reserved={reserved} />;
    } else {
      return <DayDetail data={data} focus={focusDay} />;
    }
  }, [data, focusDay, reserved]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>PLAN DETAILS</div>
        <div className={styles.buttons}>
          <Modal>
            <ModalTrigger>
              <Button variant="ghost">예약추가</Button>
            </ModalTrigger>
            <ModalContent>
              <CreateReservation />
            </ModalContent>
          </Modal>

          <Modal>
            <ModalTrigger>
              <Button variant="ghost">일정추가</Button>
            </ModalTrigger>
            <ModalContent>
              <CreateSchedule />
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className={styles.des_container}>
        <div className={styles.des_nav}>
          <Swiper
            spaceBetween={10}
            slidesPerView="auto"
            style={{
              margin: 0,
            }}
          >
            <SwiperSlide
              style={{ width: "auto", marginRight: "1px" }}
              onClick={() => setFocusDay(null)}
            >
              <div
                className={`${styles.des_nav_item} ${
                  !focusDay && styles.focus
                }`}
              >
                <p>RESERVED</p>
              </div>
            </SwiperSlide>

            {data.map((item) => {
              return (
                <SwiperSlide
                  key={item.day}
                  style={{ width: "auto", marginRight: "1px" }}
                  onClick={() => setFocusDay(item.date)}
                >
                  <div
                    className={`${styles.des_nav_item} ${
                      item.date === focusDay && styles.focus
                    }`}
                  >
                    <p>
                      {item.date} ({item.day}일차)
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {renderItem}
      </div>
    </div>
  );
};

export default PlanDes;
