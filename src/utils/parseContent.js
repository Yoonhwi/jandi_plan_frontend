import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

// 게시글 본문에 있는 이미지들의 align 속성을 적용하기 위한 함수입니다.
export const parseContent = (content) => {
  let parsedContent;
  try {
    const parsed = JSON.parse(content);
    const converter = new QuillDeltaToHtmlConverter(parsed?.ops ?? "", {
      customTagAttributes: (op) => {
        if (op.insert?.type === "image" && op.attributes?.imageAlign) {
          if (op.attributes.imageAlign.align === "center") {
            return {
              style: `display: block; margin: 0 auto; width: ${
                op.attributes.width || "auto"
              };`,
            };
          } else
            return {
              style: `float: ${op.attributes.imageAlign?.align}; width: ${
                op.attributes.width || "auto"
              };`,
            };
        }
      },
    });
    parsedContent = converter.convert();
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    parsedContent = content;
  }

  return parsedContent;
};
