import Quill from "quill";
import { useEffect, useRef } from "react";
import BlotFormatter from "@enzedonline/quill-blot-formatter2";
import { uploadImageApi } from "@/pages/Board/apis";
import hljs from "highlight.js";
import "quill/dist/quill.core.css";
import "highlight.js/styles/github.css";

const Uploader = Quill.import("modules/uploader");

const toolbarOptions = {
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
        const res = await uploadImageApi(file);

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

class CustomUploader extends Uploader {
  upload() {}
}

Quill.register("modules/uploader", CustomUploader, true);
Quill.register("modules/blotFormmater", BlotFormatter);

const modules = {
  syntax: { hljs },
  toolbar: toolbarOptions,
  blotFormmater: {
    image: {
      allowAltTitleEdit: false,
    },
  },
  clipboard: true,
};

const Editor = ({ defaultValue, onLoaded }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) return;

    const quill = new Quill(quillRef.current, {
      theme: "snow",
      modules,
    });

    quill.setContents(defaultValue);
    onLoaded(quill);

    return () => {
      quillRef.current = null;
    };
  }, [defaultValue, onLoaded]);

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
