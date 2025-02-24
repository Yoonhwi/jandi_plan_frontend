import { Button, Editor, Input } from "@/components";
import { BaseLayout } from "@/layouts";
import { useAxios } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import styles from "./BoardWrite.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { boardWriteScheme } from "../constants";
import { APIEndPoints } from "@/constants";
import { uploadImageApi } from "../apis";
import "quill/dist/quill.snow.css";

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

  /** Quill이 load되면 해당 Quill에 이벤트리스너를 달아줍니다 */
  useEffect(() => {
    if (!quill) return;
    const editorElement = quill.root;
    quill.on("text-change", () => {
      setValue("content", quill.getContents());
    });

    editorElement.addEventListener("paste", (e) => {
      const clipboardData = e.clipboardData;
      if (clipboardData && clipboardData.items) {
        for (let i = 0; i < clipboardData.items.length; i++) {
          const item = clipboardData.items[i];
          if (item.type.indexOf("image") !== -1) {
            e.preventDefault();
            e.stopImmediatePropagation();
            const file = item.getAsFile();
            console.log("file", file);
            handleImage(file);
            break;
          }
        }
      }
    });

    // 드래그앤드롭 이벤트 처리
    editorElement.addEventListener("drop", (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length) {
        for (let i = 0; i < dt.files.length; i++) {
          const file = dt.files[i];
          if (file.type.indexOf("image") !== -1) {
            handleImage(file);
            return;
          }
        }
      }
    });

    async function handleImage(file) {
      const range = quill.getSelection();

      try {
        const {
          data: { imageUrl },
        } = await uploadImageApi(file);
        quill.insertEmbed(range?.index ?? 0, "image", imageUrl, "user");
      } catch (error) {
        console.error("error", error);
      }

      quill.setSelection((range?.index ?? 0) + 1);
    }
  }, [accessToken, quill, setValue]);

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
