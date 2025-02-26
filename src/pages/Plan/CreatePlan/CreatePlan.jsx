import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./CreatePlan.module.css";
import FormCreatePlan from "./FormCreatePlan";
import { createPlanSchema } from "../constants";

const CreatePlanPage = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const planUseForm = useForm({
    resolver: zodResolver(createPlanSchema),
  });

  const { handleSubmit, setValue } = planUseForm;
  const { fetchData } = useAxios();

  const onSubmit = useCallback(
    async (data) => {
      console.log("hit");
      await fetchData({
        url: APIEndPoints.TRIP_CREATE,
        method: "POST",
        params: data,
      });
    },
    [fetchData]
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
