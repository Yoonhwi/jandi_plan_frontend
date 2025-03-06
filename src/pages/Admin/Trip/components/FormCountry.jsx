import { createCountrySchema } from "./constants";
import styles from "./FormCountry.module.css";
import {Button,Input,Field} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";

const FormCountry = ({forUse,data,onSuccess}) =>{
    const { fetchData, response } = useAxios();
    const { createToast } = useToast();

    console.log(data);
    const formController = useForm({
        resolver: zodResolver(createCountrySchema),
      });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = formController;

    useEffect(() => {
        if (forUse === "PATCH" && data) {
            setValue("continent", data.continent.name);
            setValue("country", data.name);
        }
    }, [forUse, data, setValue]);

    const onSubmit = (data) => {
        console.log(data);
        if (forUse === "PATCH") {
            // 수정 로직 추가
            updateCity(data);
          } else {
            // 추가 로직
            addCountry(data);
          }
      };

    const addCountry=(data)=>{ 
        const formData = new FormData();
        formData.append("continent", data.continent);
        formData.append("country", data.country);
        fetchData({
            method: "POST",
            url: APIEndPoints.COUNTRY_ADD,
            data: formData,
        }).then(()=>{
            createToast({ type: "success", text: "등록에 성공하였습니다" });
            formController.reset();
            onSuccess?.();
        }).catch((err)=> {
            createToast({ type: "error", text: err.data.message });
        })
    }

    const updateCity=(changeData)=>{
        const formData = new FormData();
        formData.append("country", changeData.country);
        fetchData({
            method: "PATCH",
            url: buildPath(APIEndPoints.COUNTRY_MANAGE, { id: data.countryId }),
            data: formData,
        }).then(()=>{
            createToast({ type: "success", text: "수정에 성공하였습니다" });
            onSuccess?.();
        }).catch((err)=> {
            console.log(err);
            createToast({ type: "error", text: err.data.message });
        })
    }

    return(
        <form className={styles.form_box} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.columns}>
                <Field label="대륙 이름" helperText="아시아,북미,남미,아프리카,유럽,오세아니아/대양주" isRequire error={errors.continent}>
                    <Input 
                        type="text"
                        style={{
                        boxSizing: "border-box",
                        width: "100%",
                        }}
                        size="sm"
                        register={register}
                        name="continent"
                        disabled={forUse === "PATCH"}
                    />
                </Field>
            </div>
            <div className={styles.columns}>
                <Field label="국가 이름" helperText="ex) 대한민국, 일본..." isRequire error={errors.country}>
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
                </Field>
            </div>
            <div className={styles.button_container}>
                <Button size="lg" variant="ghost" type="submit">
                    {forUse === "PATCH" ? "나라 수정하기" : "나라 추가하기"}
                </Button>
            </div>
        </form>
    );
}

export default FormCountry;