import { BaseLayout } from "@/layouts";
import { Input, Button, Modal, ModalContent, ModalTrigger } from "@/components";
import styles from "./CreatePlan.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import Calendar from "./Constants/Calender";
import AddDestination from "./Constants/AddDestination";
import { useState } from "react";
import AddUser from "./Constants/AddUser";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";

const CreatePlanPage = () => {
  const [destination, setDestination] = useState(null);
  const [withUser, setWithUser] = useState(null);
  const [planName, setPlanName] = useState(null);
  const [budget, setBudget] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);

  const handlePlanNameChange = (event) => {
    setPlanName(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleConfirmUsers = (users) => {
    setWithUser(users.join(", "));
  };

  const handleConfirmDestination = (subtitle, destination, selectedImg) => {
    console.log(selectedImg);
    setDestination(subtitle + " / " + destination);
    setSelectedImg(selectedImg);
  };

  const handleAdd = () => {
    if (checkInfo()) {
      navigate(PageEndPoints.HOME);
    } else {
      console.log("입력되지 않은 항목이 있습니다.");
    }
  };

  const checkInfo = () => {
    if (
      destination === null ||
      budget === null ||
      departureDate === null ||
      arrivalDate === null ||
      planName === null
    ) {
      console.log("모든 항목을 입력하세요.");
      return false;
    }
    return true;
  };

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div
          className={`${styles.plan_photo_box} ${
            selectedImg ? styles.has_image : styles.no_image
          }`}
        >
          {selectedImg ? (
            <img
              src={selectedImg}
              alt="destination_img"
              className={styles.plan_photo}
            />
          ) : null}
        </div>

        <div className={styles.plan_container}>
          <p className={styles.title}>어디로 놀러가시나요?</p>
          <div className={styles.plan_inputs}>
            <div className={styles.plan_columns}>
              <div className={styles.input_name}>여행지</div>
              <div className={styles.input}>
                <p className={styles.input_text}>{destination || "-"}</p>
                <Modal>
                  <ModalTrigger>
                    <Button size="sm">여행지 선택하기</Button>
                  </ModalTrigger>
                  <ModalContent>
                    <AddDestination onConfirm={handleConfirmDestination} />
                  </ModalContent>
                </Modal>
              </div>
            </div>

            <div className={styles.plan_columns}>
              <div className={styles.input_name}>플랜 제목</div>
              <Input
                size="md"
                placeholder="플랜 제목을 입력하세요."
                type="text"
                style={{ flex: 1 }}
                value={planName}
                onChange={handlePlanNameChange}
              />
            </div>

            <div className={styles.plan_columns}>
              <div className={styles.input_name}>출발일</div>
              <div className={styles.input}>
                <p className={styles.input_text}>{arrivalDate || "-"}</p>
                <Modal>
                  <ModalTrigger>
                    <Button size="sm" variant="ghost">
                      <FaRegCalendarAlt className={styles.input_text} />
                    </Button>
                  </ModalTrigger>
                  <ModalContent>
                    <div className={styles.modal_container}>
                      <Calendar
                        onSelectDate={(date) => {
                          setArrivalDate(date);
                        }}
                      />
                    </div>
                  </ModalContent>
                </Modal>
              </div>
            </div>

            <div className={styles.plan_columns}>
              <div className={styles.input_name}>도착일</div>
              <div className={styles.input}>
                <p className={styles.input_text}>{departureDate || "-"}</p>
                <Modal>
                  <ModalTrigger>
                    <Button size="sm" variant="ghost">
                      <FaRegCalendarAlt className={styles.input_text} />
                    </Button>
                  </ModalTrigger>
                  <ModalContent>
                    <div className={styles.modal_container}>
                      <Calendar
                        onSelectDate={(date) => {
                          setDepartureDate(date);
                        }}
                      />
                    </div>
                  </ModalContent>
                </Modal>
              </div>
            </div>

            <div className={styles.plan_columns}>
              <div className={styles.input_name}>예산안</div>
              <Input
                size="md"
                placeholder="1인당 예산안(￦)"
                type="number"
                style={{ flex: 1 }}
                value={budget}
                onChange={handleBudgetChange}
              />
            </div>

            <div className={styles.plan_columns}>
              <div className={styles.input_name}>친구 추가</div>
              <div className={styles.input}>
                <p className={styles.input_text}>{withUser || "-"}</p>
                <Modal>
                  <ModalTrigger>
                    <Button size="sm">친구 추가하기</Button>
                  </ModalTrigger>
                  <ModalContent>
                    <AddUser onConfirm={handleConfirmUsers} />
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </div>

          <div className={styles.button_container}>
            <Button size="lg" variant="solid" onClick={() => handleAdd()}>
              플랜 추가하기
            </Button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default CreatePlanPage;
