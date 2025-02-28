import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./CreatePlan.module.css";
import FormCreatePlan from "./FormCreatePlan";
import { createPlanSchema } from "../constants";
import { useToast } from "@/contexts";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils";

const CreatePlanPage = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const planUseForm = useForm({
    resolver: zodResolver(createPlanSchema),
  });

  const { handleSubmit, setValue } = planUseForm;
  const { fetchData } = useAxios();
  const { createToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data) => {
      await fetchData({
        url: APIEndPoints.TRIP_CREATE,
        method: "POST",
        data,
      }).then((res) => {
        createToast({
          type: "success",
          text: "여행 계획이 성공적으로 등록되었습니다.",
        });

        const path = buildPath(PageEndPoints.PLAN_DETAIL, {
          id: res.data.tripId,
        });

        navigate(path);
      });
    },
    [createToast, fetchData, navigate]
  );

  useEffect(() => {
    if (selectedCity) {
      setValue("cityId", selectedCity.cityId);
    } else {
      setValue("cityId", null);
    }
  }, [selectedCity, setValue]);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div
          className={`${styles.plan_photo_box} ${
            selectedCity?.imageUrl ? styles.has_image : styles.no_image
          }`}
        >
          {selectedCity?.imageUrl ? (
            <img
              src={selectedCity.imageUrl}
              alt="destination_img"
              className={styles.plan_photo}
            />
          ) : null}
        </div>

        <div className={styles.plan_container}>
          <p className={styles.title}>어디로 놀러가시나요?</p>

          <FormCreatePlan
            onSubmit={handleSubmit(onSubmit)}
            setSelectedCity={setSelectedCity}
            selectedCity={selectedCity}
            useForm={planUseForm}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default CreatePlanPage;
