import { Button, Editor, Input } from "@/components";
import { BaseLayout } from "@/layouts";
import { useAxios } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import styles from "./BoardWrite.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { boardWriteScheme } from "../constants";
import { APIEndPoints } from "@/constants";
import "quill/dist/quill.snow.css";
import { useQuillEvents } from "@/hooks";
import { useSearchParams } from "react-router-dom";

const BoardWrite = () => {
  const [quill, setQuill] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(boardWriteScheme),
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const { fetchData: getTempId } = useAxios();
  const { fetchData: postBoard } = useAxios();

  const onSubmit = useCallback(
    async (data) => {
      await postBoard({
        url: APIEndPoints.BOARD,
        method: "POST",
        data,
      })
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.error("error", error);
        });
    },
    [postBoard]
  );

  useQuillEvents(quill, setValue);

  useEffect(() => {
    getTempId({
      url: APIEndPoints.TEMP,
      method: "POST",
    }).then((res) => {
      const tempPostId = res.data.tempPostId;
      setSearchParams({ tempId: tempPostId });
    });
  }, []);

  return (
    <BaseLayout>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="제목을 입력해주세요"
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="lg"
          register={register}
          name="title"
        />
        <div className={styles.editor}>
          <Editor onLoaded={setQuill} />
        </div>

        <div className={styles.submit}>
          {(errors.content || errors.title) && (
            <p style={{ color: "red" }}>제목 또는 내용을 입력해주세요.</p>
          )}
          <Button
            type="submit"
            variant="solid"
            size="md"
            style={{
              marginLeft: "auto",
            }}
          >
            포스팅 완료
          </Button>
        </div>
      </form>
    </BaseLayout>
  );
};

export default BoardWrite;
