import { Button, Field, Input } from "@/components";
import styles from "./ModifyBanner.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bannerScheme } from "./constants";
import { useCallback, useState } from "react";

const ModifyBanner = ({ item, callback }) => {
  const [bannerImg, setBannerImg] = useState(item.imageUrl);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bannerScheme),
    defaultValues: item,
  });

  const onSubmit = useCallback(
    (data) => {
      const formData = new FormData();

      if (data.file) {
        formData.append("file", data.file);
      }

      formData.append("title", data.title);
      formData.append("linkUrl", data.linkUrl);

      callback(item.bannerId, formData);
    },
    [callback, item.bannerId]
  );

  return (
    <div className={styles.container}>
      <p className={styles.title}>배너 수정</p>

      <div className={styles.img_container}>
        <img src={bannerImg} alt="banner" className={styles.banner_img} />
      </div>
      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <Field label="배너 이미지">
          <Input
            type="file"
            style={{ width: "100%" }}
            onChange={(e) => {
              const file = e.target.files[0];
              setValue("file", file);
              setBannerImg(URL.createObjectURL(file));
            }}
          />
        </Field>

        <Field label="제목" isRequire error={errors.title}>
          <Input
            placeholder="제목을 입력해주세요"
            register={register}
            name="title"
            style={{ width: "100%" }}
          />
        </Field>

        <Field label="링크" isRequire error={errors.linkUrl}>
          <Input
            placeholder="링크를 입력해주세요"
            register={register}
            name="linkUrl"
            style={{ width: "100%" }}
          />
        </Field>

        <Button
          variant="ghost"
          style={{
            alignSelf: "end",
          }}
          type="submit"
        >
          수정완료
        </Button>
      </form>
    </div>
  );
};

export default ModifyBanner;
