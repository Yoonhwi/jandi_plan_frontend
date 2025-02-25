import { Button, Editor, Input } from "@/components";
import { BaseLayout } from "@/layouts";
import "quill/dist/quill.snow.css";

import { useAxios } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import styles from "./BoardWrite.module.css";

const BoardWrite = () => {
  const [quill, setQuill] = useState(null);

  const { fetchData: uploadImage } = useAxios();
  const handleUploadImage = useCallback(
    async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      return await uploadImage({
        url: "/images/upload/community",
        method: "POST",
        headers: {
          Authorization: `Bearer`,
        },
        data: formData,
        params: {
          targetId: 1,
        },
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    },
    [uploadImage]
  );

  useEffect(() => {
    if (!quill) return;
    const editorElement = quill.root;

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
        } = await handleUploadImage(file);
        quill.insertEmbed(range?.index ?? 0, "image", imageUrl, "user");
      } catch (error) {
        console.error("error", error);
      }

      quill.setSelection((range?.index ?? 0) + 1);
    }
  }, [handleUploadImage, quill]);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <Input
          placeholder="제목을 입력해주세요"
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="lg"
        />
        <div className={styles.editor}>
          <Editor onLoaded={setQuill} />
        </div>
        <Button
          onClick={() => {
            if (!quill) return;
            const delta = quill.getContents();
            const stringfy = JSON.stringify(delta);
            console.log("type", typeof stringfy);
            const parsed = JSON.parse(stringfy);
            console.log("delta", delta);
            console.log("stringfy", stringfy);
            console.log("parsed", parsed);
          }}
          variant="solid"
          size="md"
          style={{
            alignSelf: "end",
          }}
        >
          포스팅 완료
        </Button>
      </div>
    </BaseLayout>
  );
};

export default BoardWrite;
