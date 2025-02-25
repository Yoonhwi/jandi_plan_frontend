import { BaseLayout } from "@/layouts";
import {
  Field,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components";
import styles from "./CreatePlan.module.css";
import { useState } from "react";
import AddDestination from "./Constants/AddDestination";
import AddUser from "./Constants/AddUser";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  destination: z.string().nonempty({ message: "여행지를 입력하세요." }),
  planName: z.string().nonempty({ message: "제목을 입력하세요." }),
  arrivalDate: z.string().nonempty({ message: "출발일을 입력하세요." }),
  departureDate: z.string().nonempty({ message: "도착일을 입력하세요." }),
  budget: z.string().nonempty({ message: "예산안을 입력하세요." }),
});

const CreatePlanPage = () => {
  const [destination, setDestination] = useState(null);
  const [withUser, setWithUser] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleConfirmDestination = (subtitle, destination, selectedImg) => {
    setDestination(`${subtitle} / ${destination}`);
    setSelectedImg(selectedImg);
  };

  const handleConfirmUsers = (users) => {
    setWithUser(users.join(", "));
  };

  const handleAdd = (data) => {
    if (data) {
      navigate(PageEndPoints.HOME);
    }
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

          <form className={styles.plan_box} onSubmit={handleSubmit(handleAdd)}>
            <div className={styles.plan_columns}>
              <Field label="여행지" isRequire>
                <div className={styles.place}>
                  <Input
                    style={{
                      boxSizing: "border-box",
                      flex: 1,
                    }}
                    size="sm"
                    value={destination || ""}
                    readOnly
                  />
                  <Modal>
                    <ModalTrigger>
                      <Button type="button">선택</Button>
                    </ModalTrigger>
                    <ModalContent>
                      <AddDestination onConfirm={handleConfirmDestination} />
                    </ModalContent>
                  </Modal>
                </div>
                {errors.destination && (
                  <p className={styles.error}>{errors.destination.message}</p>
                )}
              </Field>
            </div>

            <div className={styles.plan_columns}>
              <Field
                label="플랜 제목"
                helperText="ex)오사카 가족여행"
                isRequire
              >
                <Input
                  type="text"
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                  }}
                  size="sm"
                  {...register("planName")}
                />
                {errors.planName && (
                  <p className={styles.error}>{errors.planName.message}</p>
                )}
              </Field>
            </div>

            <div className={styles.plan_columns}>
              <Field label="출발일" isRequire>
                <Input
                  type="date"
                  style={{ width: "100%" }}
                  size="sm"
                  {...register("arrivalDate")}
                />
                {errors.arrivalDate && (
                  <p className={styles.error}>{errors.arrivalDate.message}</p>
                )}
              </Field>
            </div>

            <div className={styles.plan_columns}>
              <Field label="도착일" isRequire>
                <Input
                  type="date"
                  style={{ width: "100%" }}
                  size="sm"
                  {...register("departureDate")}
                />
                {errors.departureDate && (
                  <p className={styles.error}>{errors.departureDate.message}</p>
                )}
              </Field>
            </div>

            <div className={styles.plan_columns}>
              <Field label="예산안" isRequire>
                <Input
                  type="number"
                  size="sm"
                  style={{ width: "100%" }}
                  {...register("budget")}
                />
                {errors.budget && (
                  <p className={styles.error}>{errors.budget.message}</p>
                )}
              </Field>
            </div>

            <div className={styles.plan_columns}>
              <Field label="친구 추가">
                <div className={styles.place}>
                  <Input
                    type="text"
                    style={{ flex: 1 }}
                    size="sm"
                    value={withUser || ""}
                    readOnly
                  />
                  <Modal>
                    <ModalTrigger>
                      <Button size="md" type="button">
                        추가
                      </Button>
                    </ModalTrigger>
                    <ModalContent>
                      <AddUser onConfirm={handleConfirmUsers} />
                    </ModalContent>
                  </Modal>
                </div>
              </Field>
            </div>

            <div className={styles.button_container}>
              <Button size="lg" variant="ghost" type="submit">
                플랜 추가하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
};

export default CreatePlanPage;
