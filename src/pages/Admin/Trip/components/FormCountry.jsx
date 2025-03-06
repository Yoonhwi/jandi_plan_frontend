import { createCountrySchema } from "./constants";
import styles from "./FormCountry.module.css";
import {Button,Input,Field} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";

const FormCountry = () =>{
    const { fetchData, response } = useAxios();
    const { createToast } = useToast();

    const formController = useForm({
        resolver: zodResolver(createCountrySchema),
      });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = formController;

    const onSubmit = (data) => {
        console.log(data);
        addCountry(data);
      };

    const addCountry=(data)=>{
        console.log(data); 
        const formData = new FormData();
        formData.append("continent", data.continent);
        formData.append("country", data.country);
        fetchData({
            method: "POST",
            url: APIEndPoints.CONTINENT_ADD,
            data: formData,
        }).then(()=>{
            createToast({ type: "success", text: "등록에 성공하였습니다" });
            formController.reset();
        }).catch((err)=> {
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
                    />
                    {/* {errors.continent && (
                        <p className={styles.error}>{errors.continent.message}</p>
                    )} */}
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
    );
}

export default FormCountry;