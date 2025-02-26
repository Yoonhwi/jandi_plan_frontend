import { Button, Editor, Input } from "@/components";
import { BaseLayout } from "@/layouts";
import { useAxios } from "@/hooks";
import { useCallback, useState } from "react";
import styles from "./BoardWrite.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { boardWriteScheme } from "../constants";
import { APIEndPoints } from "@/constants";
import "quill/dist/quill.snow.css";
import { useQuillEvents } from "@/hooks";

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

  const accessToken = localStorage.getItem("access-token");

  const { fetchData: postBoard } = useAxios();

  const onSubmit = useCallback(
    async (data) => {
      await postBoard({
        url: APIEndPoints.BOARD,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data,
      })
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.error("error", error);
        });
    },
    [accessToken, postBoard]
  );

  useQuillEvents(quill, setValue);

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
