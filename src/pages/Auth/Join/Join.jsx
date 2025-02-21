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

  const { fetchData, isSuccess, error } = useAxios();
  const { createToast } = useToast();

  const joinUseForm = useForm({
    resolver: zodResolver(joinScheme),
  });

  const {
    formState: { errors },
    setError,
  } = joinUseForm;

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

      await fetchData({
        url: APIEndPoints.USER_RESISTER,
        method: "POST",
        data: {
          ...rest,
          userName: nickname,
        },
      });

      if (isSuccess) {
        createToast({
          type: "success",
          text: "회원가입 성공",
        });
        return;
      }

      if (!isSuccess && error) {
        createToast({
          type: "error",
          text: error.message,
        });
      }
    },
    [createToast, error, fetchData, handleDuplicateCheck, isSuccess]
  );

  const handleDuplicateEmail = useCallback(async (email) => {
    // 중복체크
  }, []);

  const handleDuplicateNickname = useCallback(async (nickname) => {
    // 중복체크
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.title}>회원가입</p>
      <JoinForm joinUseForm={joinUseForm} onSubmit={onSubmit} />
    </div>
  );
};

export default JoinPage;
