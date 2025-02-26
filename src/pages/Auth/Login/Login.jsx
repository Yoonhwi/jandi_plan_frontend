import { Button,Input, Field } from "@/components";
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { PageEndPoints, APIEndPoints } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAuth, useToast } from "@/contexts";


const schema = z.object({
  id:z.string()
    .email({ message: "유효한 이메일을 입력하세요."})
    .nonempty({ message: "ID를 입력하세요." }),
  password:z.string().nonempty({ message: "비밀번호를 입력하세요." }),

})

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, signIn } = useAuth(); //로그인 관리
  const [errorMessage, setErrorMessage] = useState("");

  const { createToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleAdd = async (data) => {
    setErrorMessage("");
    try{
      await signIn(data);
    }catch(error){
      setErrorMessage(error.message);
      console.log(error.message);
      createToast({
        type: "error",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const redirectPath = location.state?.from || PageEndPoints.HOME;
      navigate(redirectPath, { replace: true });
    }
  }, [isLoggedIn]);



  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <div className={styles.logo}>Just Plan It !</div>
        <form className={styles.form_box} onSubmit={handleSubmit(handleAdd)}>
        <div className={styles.input_box}>
          <Field
            label="이메일"
            error={errors.id}
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
              name={"id"}
            />
          </Field>
          <Field
            label="비밀번호"
            error={errors.password}
            isRequire
          >
            <Input 
              type="password"
              style={{
                boxSizing: "border-box",
                width: "100%",
              }}
              size="md"
              placeholder="비밀번호"
              register={register}
              name={"password"}
            />
          </Field>
          
        </div>
        <div className={styles.btn_box}>
          <p>Find ID / PW</p>
          <Button size="md" variant="solid">
            로그인
          </Button>
        </div>
        </form>
        <div className={styles.divider} />
        <div className={styles.social_login_btns}>
          <img src="/naver_icon.png" className={styles.social_btn} />
          <img src="/kakao_icon.png" className={styles.social_btn} />
          <img src="/google_icon.png" className={styles.social_btn} />
        </div>
      </div>

      <Button
        variant="none"
        style={{
          color: `var(--color-text-dynamic)`,
        }}
        onClick={() => navigate(PageEndPoints.JOIN)}
      >
        새로운 계정을 만들어보세요
      </Button>
    </div>
  );
};

export default LoginPage;
