import { Button, Field, Input } from "@/components";
import { useMemo, useState } from "react";
import styles from "./CreateReservation.module.css";
import { useForm } from "react-hook-form";
import { usePlanDetail } from "../PlanDetailContext";

const CreateReservation = () => {
  const [category, setCategory] = useState("transportation");
  const { register, handleSubmit } = useForm();
  const { addReservation } = usePlanDetail();

  const onSubmit = (e) => {
    addReservation({
      ...e,
      category,
    });
  };

  const publicFormField = useMemo(() => {
    return (
      <div className={styles.public_container}>
        <Field
          label="제목"
          helperText="ex)출국 비행기, OO호텔, 보험료"
          isRequire
        >
          <Input
            type="text"
            style={{ width: "100%" }}
            register={register}
            name="title"
          />
        </Field>

        <Field
          label="비용"
          helperText="현지 통화로 입력시 자동 환율 계산(당일기준)"
          isRequire
        >
          <Input
            type="text"
            style={{ width: "100%" }}
            register={register}
            name="cost"
          />
        </Field>
      </div>
    );
  }, []);

  const renderItem = useMemo(() => {
    if (category === "accommodation") {
      return (
        <div className={styles.public_container}>
          {publicFormField}
          <Field label="주소" isRequire>
            <Input
              type="text"
              style={{ width: "100%" }}
              register={register}
              name="place"
            />
          </Field>
        </div>
      );
    } else {
      return publicFormField;
    }
  }, [category, publicFormField, register]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>예약항목을 추가하세요!</p>
      <Field label="카테고리" isRequire helperText="카테고리를 선택해주세요">
        <select
          className={styles.select_container}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="transportation">교통편</option>
          <option value="accommodation">숙박</option>
          <option value="etc">기타</option>
        </select>
      </Field>

      <form className={styles.form_container}>
        {renderItem}

        <Button
          variant="ghost"
          style={{
            alignSelf: "end",
          }}
          onClick={handleSubmit(onSubmit)}
        >
          추가하기
        </Button>
      </form>
    </div>
  );
};

export default CreateReservation;
