import styles from "./FormAddCity.module.css";
import {Button,Input,Field} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCitySchema } from "./constants";

const FormAddCity = () =>{
    const formController = useForm({
            resolver: zodResolver(createCitySchema),
          });
    
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = formController;
    
        const onSubmit = (data) => {
            console.log(data);
            // addCity(data);
            formController.reset();
          };

    return(
        <div>
             <form className={styles.form_box} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.columns}>
                    <Field label="나라 이름" helperText="ex) 대한민국, 일본..." isRequire error={errors.country}>
                        <Input 
                            type="text"
                            style={{
                            boxSizing: "border-box",
                            width: "100%",
                            }}
                            size="sm"
                            register={register}
                            name="country"
                        />
                        {/* {errors.continent && (
                            <p className={styles.error}>{errors.continent.message}</p>
                        )} */}
                    </Field>
                </div>
                <div className={styles.columns}>
                    <Field label="도시 이름" helperText="ex) 서울, 오사카..." isRequire error={errors.city}>
                        <Input 
                            type="text"
                            style={{
                            boxSizing: "border-box",
                            width: "100%",
                            }}
                            size="sm"
                            register={register}
                            name="city"
                        />
                        {/* {errors.country && (
                            <p className={styles.error}>{errors.country.message}</p>
                        )} */}
                    </Field>
                </div>
                <div className={styles.columns}>
                    <Field label="도시 설명" helperText="ex) 대표 여행지입니다." isRequire error={errors.description}>
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
                        {/* {errors.country && (
                            <p className={styles.error}>{errors.country.message}</p>
                        )} */}
                    </Field>
                </div>
                <div className={styles.columns}>
                    <Field label="도시 사진" helperText="도시 사진을 넣어주세요." isRequire error={errors.file}>
                        <Input 
                        type="file"
                        style={{
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                        size="sm"
                        register={register}
                        name="file"
                        />
                    </Field>
                </div>
                <div className={styles.columns}>
                    <Field label="위도" isRequire error={errors.latitude}>
                        <Input 
                            type="text"
                            style={{
                            boxSizing: "border-box",
                            width: "100%",
                            }}
                            size="sm"
                            register={register}
                            name="latitude"
                        />
                        {/* {errors.country && (
                            <p className={styles.error}>{errors.country.message}</p>
                        )} */}
                    </Field>
                </div>
                <div className={styles.columns}>
                    <Field label="경도" isRequire error={errors.longtitude}>
                        <Input 
                            type="text"
                            style={{
                            boxSizing: "border-box",
                            width: "100%",
                            }}
                            size="sm"
                            register={register}
                            name="longtitude"
                        />
                        {/* {errors.country && (
                            <p className={styles.error}>{errors.country.message}</p>
                        )} */}
                    </Field>
                </div>
                <div className={styles.button_container}>
                    <Button size="lg" variant="ghost" type="submit">
                        나라 추가하기
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default FormAddCity;