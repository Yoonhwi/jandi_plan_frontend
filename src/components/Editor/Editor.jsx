import Quill from "quill";
import { useEffect, useRef } from "react";
import BlotFormatter from "@enzedonline/quill-blot-formatter2";

const Uploader = Quill.import("modules/uploader");

const toolbarOptions = {
  container: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image", "link"],
    ["clean"],
  ],

  handlers: {
    image: function () {
      console.log("hit image toolbar");
    },
  },
};

class CustomUploader extends Uploader {
  upload() {}
}

Quill.register("modules/uploader", CustomUploader, true);
Quill.register("modules/blotFormmater", BlotFormatter);

const modules = {
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

    console.log(quillRef.current);
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
