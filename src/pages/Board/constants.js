import { z } from "zod";

export const boardWriteScheme = z.object({
  title: z.string().nonempty({ message: "제목을 입력하세요." }),
  content: z.preprocess((content) => {
    if (typeof content === "object" && content !== null) {
      return JSON.stringify(content);
    }

    return content;
  }, z.string().nonempty({ message: "내용을 입력하세요." })),
});
