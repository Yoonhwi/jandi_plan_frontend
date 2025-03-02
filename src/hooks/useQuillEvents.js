import { uploadCommunityImage } from "@/apis/image";
import { useEffect } from "react";

const useQuillEvents = (quill, setValue) => {
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
        } = await uploadCommunityImage(file);
        quill.insertEmbed(range?.index ?? 0, "image", imageUrl, "user");
      } catch (error) {
        console.error("error", error);
      }

      quill.setSelection((range?.index ?? 0) + 1);
    }
  }, [quill, setValue]);
};

export default useQuillEvents;
