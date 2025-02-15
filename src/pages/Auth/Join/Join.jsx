import styles from "./Join.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Field, Input } from "@/components";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";

const schema = z
  .object({
    firstName: z.string().nonempty({ message: "성을 입력하세요." }),
    lastName: z.string().nonempty({ message: "이름을 입력하세요." }),
    email: z
      .string()
      .email({ message: "유효한 이메일을 입력하세요." })
      .nonempty({ message: "이메일을 입력하세요." }),
    password: z
      .string()
      .min(6, { message: "6자 이상 입력하세요." })
      .nonempty({ message: "비밀번호를 입력하세요." }),
    passwordConfirm: z
      .string()
      .min(6, { message: "6자 이상 입력하세요." })
      .nonempty({ message: "비밀번호를 입력하세요." }),
    nickname: z
      .string()
      .min(2, { message: "2자 이상 입력하세요." })
      .nonempty({ message: "닉네임을 입력하세요." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

const JoinPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>회원가입</p>
      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <Field
            label="성"
            error={errors.firstName}
            isRequire
            style={{
              flex: 1,
            }}
          >
            <Input
              register={register}
              name={"firstName"}
              style={{
                boxSizing: "border-box",
                width: "100%",
              }}
              size="sm"
            />
          </Field>
          <Field
            label="이름"
            error={errors.lastName}
            isRequire
            style={{
              flex: 1,
            }}
          >
            <Input
              register={register}
              name={"lastName"}
              style={{
                boxSizing: "border-box",
                width: "100%",
              }}
              size="sm"
            />
          </Field>
        </div>

        <Field label={"이메일"} error={errors.email} isRequire>
          <div className={styles.email}>
            <Input
              type="text"
              register={register}
              name={"email"}
              style={{
                boxSizing: "border-box",
                width: "100%",
              }}
              size="sm"
            />
            <Button
              type="button"
              size="sm"
              style={{ width: "5.5rem" }}
              onClick={() => {
                if (errors.email) {
                  //disabled
                  console.log("eamil error");
                }
              }}
            >
              전송
            </Button>
          </div>
        </Field>

        <Field label={"비밀번호"} error={errors.password} isRequire>
          <Input
            type="password"
            register={register}
            name={"password"}
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
            size="sm"
          />
        </Field>

        <Field label={"비밀번호 확인"} error={errors.passwordConfirm} isRequire>
          <Input
            type="password"
            register={register}
            name={"passwordConfirm"}
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
            size="sm"
          />
        </Field>

        <Field label={"닉네임"} error={errors.nickname} isRequire>
          <div className={styles.nickname}>
            <Input
              type="text"
              register={register}
              name={"nickname"}
              style={{
                boxSizing: "border-box",
                width: "100%",
              }}
              size="sm"
            />
            <Button
              type="button"
              size="sm"
              style={{
                width: "5.5rem",
              }}
            >
              중복확인
            </Button>
          </div>
        </Field>

        <div className={styles.footer}>
          <Button
            style={{
              width: "100%",
            }}
            size="lg"
          >
            JOIN
          </Button>
          <div className={styles.divider} />
          <div className={styles.login_link_box}>
            <div>Already have an account?</div>
            <Button
              type="button"
              style={{
                color: "var(--color-blue-500)",
              }}
              variant="none"
              onClick={() => navigate(PageEndPoints.LOGIN)}
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JoinPage;
