import styles from "./ViewEditorContent.module.css";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import { parseContent } from "@/utils";

const ViewEditorContent = ({ content, ...props }) => {
  const contentRef = useRef(null);
  const parsed = parseContent(content);

  useEffect(() => {
    if (!contentRef.current) return;

    contentRef.current.querySelectorAll("pre").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [content]);

  return (
    <div
      className={`ql-editor ${styles.content}`}
      dangerouslySetInnerHTML={{ __html: parsed }}
      {...props}
    />
  );
};

export default ViewEditorContent;
