import { Button, Editor, Input } from "@/components";
import { BaseLayout } from "@/layouts";
import { useAxios } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import styles from "./BoardWrite.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { boardWriteScheme } from "../constants";
import { APIEndPoints, PageEndPoints } from "@/constants";
import "quill/dist/quill.snow.css";
import { useQuillEvents } from "@/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/contexts";
import { buildPath } from "@/utils";

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

  const navigate = useNavigate();
  const { createToast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();
  const tempPostId = searchParams.get("tempPostId");

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
          createToast({
            type: "success",
            text: "게시글이 성공적으로 등록되었습니다.",
          });
          navigate(
            buildPath(PageEndPoints.BOARD_DETAIL, { id: response.data.postId })
          );
        })
        .catch(() => {
          createToast({
            type: "error",
            text: "게시글 등록에 실패했습니다.",
          });
        });
    },
    [createToast, navigate, postBoard]
  );

  useQuillEvents(quill, setValue, tempPostId);

  useEffect(() => {
    getTempId({
      url: APIEndPoints.TEMP,
      method: "POST",
    }).then((res) => {
      const tempPostId = res.data.tempPostId;
      setValue("tempPostId", tempPostId);
      setSearchParams({ tempPostId });
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
          <Editor onLoaded={setQuill} tempPostId={tempPostId} />
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
