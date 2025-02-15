import { Button, Editor, Input } from "@/components";
import { BaseLayout } from "@/layouts";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import styles from "./BoardWrite.module.css";

const Delta = Quill.import("delta");

const BoardWrite = () => {
  const [quill, setQuill] = useState(null);

  const ops = [
    {
      attributes: { color: "#e60000", background: "#ffebcc" },
      insert: "Hello",
    },
    { insert: "\n" },
    { attributes: { background: "#e60000" }, insert: "Wolrd" },
    { insert: "\n\n" },
  ];

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
            e.preventDefault();
            e.stopImmediatePropagation();
            handleImage(file);
            break;
          }
        }
      }
    });

    function handleImage(file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const range = quill.getSelection();
        console.log("hit cumstom image handler", range, evt);
        quill.insertEmbed(range.index, "image", evt.target.result, "user");
        quill.setSelection(range.index + 1);
      };
      reader.readAsDataURL(file);
    }
  }, [quill]);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div></div>
        <Input
          placeholder="제목을 입력해주세요"
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="lg"
        />
        <div className={styles.editor}>
          <Editor defaultValue={new Delta(ops)} onLoaded={setQuill} />
        </div>
        <Button
          onClick={() => {
            if (!quill) return;

            console.log("delta", quill.getContents());
            console.log("html", quill.root.innerHTML);
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
