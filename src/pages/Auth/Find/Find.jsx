import styles from "./Find.module.css";
import { Button,Input, Field } from "@/components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";


const schema = z.object({
  email:z.string()
    .email({ message: "유효한 이메일을 입력하세요."})
    .nonempty({ message: "ID를 입력하세요." }),
})

const FindPWPage = () => {
    const { loading, fetchData, response } = useAxios();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
      });
    
      const handleAdd = (data) => {
        console.log(data.email);
        fetchData({
             method: "POST",
             url: APIEndPoints.FINDPW,
             body: JSON.stringify({ email: data.email }),
           })
      };

    return(
        <div className={styles.container}>
            <p className={styles.title}>비밀번호 찾기</p>
            <form className={styles.form_box} onSubmit={handleSubmit(handleAdd)}>
                <div className={styles.input_box}>
                    <Field
                    label="이메일"
                    error={errors.email}
                    isRequire
                    >
                    <Input 
                    type="text"
                    style={{
                        boxSizing: "border-box",
                        width: "100%",
                    }}
                    placeholder="아이디"
                    size="md"
                    register={register}
                    name={"email"}
                    />
                    </Field>
                </div>
                <div className={styles.btn_box}>
                    <Button size="md" variant="none">
                        이전
                    </Button>
                    <Button size="md" variant="solid">
                        확인
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FindPWPage;