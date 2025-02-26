import {
  Button,
  Field,
  Input,
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components";
import { BaseLayout } from "@/layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AddDestination from "./Constants/AddDestination";
import AddUser from "./Constants/AddUser";
import { createPlanSchema } from "./Constants/constants";
import styles from "./CreatePlan.module.css";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";
import Destination from "./ModalContents/Destination";

const CreatePlanPage = () => {
  const [withUser, setWithUser] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createPlanSchema),
  });

  const { fetchData } = useAxios();

  const selectedImg = watch("image");

  const handleConfirmDestination = (subtitle, destination, selectedImg) => {
    setValue("title", `${subtitle} / ${destination}`);
    setValue("image", selectedImg);
  };

  const handleConfirmUsers = (users) => {
    setWithUser(users.join(", "));
  };

  const onSubmit = useCallback(
    async (data) => {
      await fetchData({
        url: APIEndPoints.TRIP_CREATE,
        method: "POST",
        data: {
          ...data,
          private: "no",
        },
      });
    },
    [fetchData]
  );

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

          <form className={styles.plan_box} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.plan_columns}>
              <Field label="여행지">
                <div className={styles.place}>
                  <Input
                    style={{
                      flex: 1,
                    }}
                    size="sm"
                    value={watch("title") || ""}
                    readOnly
                  />
                  <Modal>
                    <ModalTrigger>
                      <Button type="button">선택</Button>
                    </ModalTrigger>
                    <ModalContent>
                      <Destination />
                    </ModalContent>
                  </Modal>
                </div>

                {errors.title && (
                  <p className={styles.error}>{errors.title.message}</p>
                )}
              </Field>
            </div>

            <div className={styles.plan_columns}>
              <Field label="플랜 제목" helperText="ex)오사카 가족여행">
                <Input
                  type="text"
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                  }}
                  size="sm"
                  register={register}
                  name="description"
                />
                {errors.description && (
                  <p className={styles.error}>{errors.description.message}</p>
                )}
              </Field>
            </div>

            <div className={styles.plan_columns}>
              <Field label="출발일" isRequire>
                <Input
                  type="date"
                  style={{ width: "100%" }}
                  size="sm"
                  register={register}
                  name="startDate"
                />
                {errors.startData && (
                  <p className={styles.error}>{errors.startData.message}</p>
                )}
              </Field>
            </div>

            <div className={styles.plan_columns}>
              <Field label="도착일" isRequire>
                <Input
                  type="date"
                  style={{ width: "100%" }}
                  size="sm"
                  register={register}
                  name="endDate"
                />
                {errors.endDate && (
                  <p className={styles.error}>{errors.endDate.message}</p>
                )}
              </Field>
            </div>

            <div className={styles.plan_columns}>
              <Field label="예산안" isRequire>
                <Input
                  type="number"
                  size="sm"
                  style={{ width: "100%" }}
                  register={register}
                  name="budget"
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
