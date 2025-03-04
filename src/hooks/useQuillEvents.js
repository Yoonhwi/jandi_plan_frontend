import { uploadCommunityImage } from "@/apis/image";
import { useToast } from "@/contexts";
import { useEffect } from "react";

const useQuillEvents = (quill, setValue, targetId) => {
  const { createToast } = useToast();

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

      await uploadCommunityImage(file, targetId)
        .then((res) => {
          createToast({
            type: "success",
            text: "이미지가 성공적으로 업로드되었습니다.",
          });
          const imageUrl = res.data.imageUrl;
          quill.insertEmbed(range?.index ?? 0, "image", imageUrl, "user");
          quill.setSelection((range?.index ?? 0) + 1);
        })
        .catch(() =>
          createToast({
            type: "error",
            text: "이미지 업로드에 실패했습니다.",
          })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId, quill]);
};

export default useQuillEvents;
