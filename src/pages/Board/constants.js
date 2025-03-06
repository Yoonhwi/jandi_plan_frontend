import { z } from "zod";

export const boardWriteScheme = z.object({
  title: z.string().nonempty({ message: "제목을 입력하세요." }),
  content: z.preprocess((content) => {
    if (typeof content === "object" && content !== null) {
      return JSON.stringify(content);
    }

    return content;
  }, z.string().nonempty({ message: "내용을 입력하세요." })),
  tempCommunityId: z.number({
    required_error: "tempCommunityId는 필수 입력값입니다.",
    invalid_type_error: "tempCommunityId는 숫자여야 합니다.",
  }),
});
