import { z } from "zod";

export const noticeWriteScheme = z.object({
  title: z.string().nonempty(),
  content: z.preprocess((content) => {
    if (typeof content === "object" && content !== null) {
      return JSON.stringify(content);
    }

    return content;
  }, z.string().nonempty({ message: "내용을 입력하세요." })),

  tempNoticeId: z.number({
    required_error: "tempNoticeId 필수 입력값입니다.",
    invalid_type_error: "tempNoticeId는 숫자여야 합니다.",
  }),
});

export const noticeModifyScheme = z.object({
  title: z.string().nonempty(),
  content: z.preprocess((content) => {
    if (typeof content === "object" && content !== null) {
      return JSON.stringify(content);
    }

    return content;
  }, z.string().nonempty({ message: "내용을 입력하세요." })),
});
