import { z } from "zod";

export const boardWriteScheme = z.object({
  title: z.string().nonempty({ message: "제목을 입력하세요." }),
  content: z.preprocess((content) => {
    if (typeof content === "object" && content !== null) {
      return JSON.stringify(content);
    }

    return content;
  }, z.string().nonempty({ message: "내용을 입력하세요." })),
  tempPostId: z
    .number({
      required_error: "tempPostId는 필수 입력값입니다.",
      invalid_type_error: "tempPostId는 숫자여야 합니다.",
    })
    .refine((value) => value < 0, {
      message: "tempPostId는 음수여야 합니다.",
    }),
});
