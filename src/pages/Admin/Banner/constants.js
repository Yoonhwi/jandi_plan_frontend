import { z } from "zod";

export const bannerScheme = z.object({
  file: z.instanceof(File).nullable().optional(),
  title: z.string().nonempty({ message: "제목을 입력하세요." }),
  linkUrl: z.string().nonempty({ message: "링크 URL을 입력하세요." }),
});
