import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { joinScheme } from "../constants";
import styles from "./Join.module.css";
import JoinForm from "./JoinForm";
import { useCallback, useState } from "react";

const JoinPage = () => {
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: false,
    nickname: false,
  });

  const { fetchData: fetchResister } = useAxios();
  const { fetchData: fetchDuplicateEmail } = useAxios();
  const { fetchData: fetchDuplicateNickname } = useAxios();

  const { createToast } = useToast();

  const joinUseForm = useForm({
    resolver: zodResolver(joinScheme),
  });

  const { setError } = joinUseForm;

  const handleDuplicateCheck = useCallback(() => {
    if (!duplicateCheck.email) {
      setError("email", {
        type: "custom",
        message: "이메일 중복확인을 해주세요.",
      });
      return false;
    }

    if (!duplicateCheck.nickname) {
      setError("nickname", {
        type: "custom",
        message: "닉네임 중복확인을 해주세요.",
      });
      return false;
    }

    return true;
  }, [duplicateCheck.email, duplicateCheck.nickname, setError]);

  const onSubmit = useCallback(
    async (data) => {
      const isDuplicateCheck = handleDuplicateCheck();
      if (!isDuplicateCheck) return;

      // eslint-disable-next-line no-unused-vars
      const { passwordConfirm, nickname, ...rest } = data;

      await fetchResister({
        url: APIEndPoints.USER_RESISTER,
        method: "POST",
        data: {
          ...rest,
          userName: nickname,
        },
      })
        .then(() => {
          createToast({
            type: "success",
            text: "회원가입 성공",
          });
          // 해당 아이디 비밀번호로 로그인 처리 후 메인페이지로 이동
        })
        .catch((err) => {
          createToast({
            type: "error",
            text: err.message,
          });
        });
    },
    [createToast, fetchResister, handleDuplicateCheck]
  );

  const handleDuplicateEmail = useCallback(
    async (email) => {
      await fetchDuplicateEmail({
        url: APIEndPoints.USER_CHECK_EMAIL,
        method: "GET",
        params: {
          email,
        },
      })
        .then(() => {
          setDuplicateCheck((prev) => ({
            ...prev,
            email: true,
          }));
          createToast({
            type: "success",
            text: "사용가능한 이메일입니다.",
          });
        })
        .catch((err) => {
          setError("email", {
            type: "custom",
            message: err.message ?? "사용 불가능한 이메일 입니다.",
          });
        });
    },
    [createToast, fetchDuplicateEmail, setError]
  );

  const handleDuplicateNickname = useCallback(
    async (name) => {
      await fetchDuplicateNickname({
        url: APIEndPoints.USER_CHECK_NICKNAME,
        method: "GET",
        params: {
          name,
        },
      })
        .then(() => {
          setDuplicateCheck((prev) => ({
            ...prev,
            nickname: true,
          }));
          createToast({
            type: "success",
            text: "사용가능한 닉네임입니다.",
          });
        })
        .catch((err) => {
          createToast({
            type: "error",
            text: err.message || "사용 불가능한 닉네임 입니다.",
          });
          setError("nickname", {
            type: "custom",
            message: "사용 불가능한 닉네임 입니다.",
          });
        });
    },
    [createToast, fetchDuplicateNickname, setError]
  );

  return (
    <div className={styles.container}>
      <p className={styles.title}>회원가입</p>
      <JoinForm
        joinUseForm={joinUseForm}
        onSubmit={onSubmit}
        handleDuplicateEmail={handleDuplicateEmail}
        handleDuplicateNickname={handleDuplicateNickname}
      />
    </div>
  );
};

export default JoinPage;
