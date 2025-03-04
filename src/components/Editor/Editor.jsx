import Quill from "quill";
import { useEffect, useMemo, useRef } from "react";
import BlotFormatter from "@enzedonline/quill-blot-formatter2";
import hljs from "highlight.js";
import "quill/dist/quill.core.css";
import "highlight.js/styles/github.css";
import { uploadCommunityImage } from "@/apis/image";

const Uploader = Quill.import("modules/uploader");

class CustomUploader extends Uploader {
  upload() {}
}

Quill.register("modules/uploader", CustomUploader, true);
Quill.register("modules/blotFormmater", BlotFormatter);

const Editor = ({ defaultValue, onLoaded, tempPostId }) => {
  const tempPostIdRef = useRef(tempPostId);
  tempPostIdRef.current = tempPostId;

  const toolbarOptions = useMemo(() => {
    return {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        ["blockquote", "code-block"],
        ["image", "link"],
        ["clean"],
      ],

      handlers: {
        image: function () {
          const quill = this.quill;
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async function () {
            const file = input.files[0];
            if (!file) return;

            const range = quill.getSelection();
            const res = await uploadCommunityImage(file, tempPostIdRef.current);

            quill.insertEmbed(
              range?.index ?? 0,
              "image",
              res.data.imageUrl,
              "user"
            );
            quill.setSelection((range?.index ?? 0) + 1);
          };
        },
      },
    };
  }, [tempPostId]);

  const modules = useMemo(() => {
    return {
      syntax: { hljs },
      toolbar: toolbarOptions,
      blotFormmater: {
        image: {
          allowAltTitleEdit: false,
        },
      },
      clipboard: true,
    };
  }, [toolbarOptions]);

  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) return;

    const quill = new Quill(quillRef.current, {
      theme: "snow",
      modules,
    });

    if (defaultValue) {
      quill.setContents(defaultValue);
    }

    onLoaded(quill);

    return () => {
      quillRef.current = null;
    };
  }, [defaultValue, modules, onLoaded]);

  return (
    <div
      ref={quillRef}
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    />
  );
};

export default Editor;
