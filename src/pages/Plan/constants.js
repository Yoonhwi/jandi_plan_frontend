import { z } from "zod";

export const createPlanSchema = z.object({
  cityId: z
    .number()
    .nonnegative("도시를 선택해주세요")
    .nullable()
    .refine((value) => value !== null, {
      message: "도시를 선택해주세요",
    }),
  title: z.string().nonempty("플랜 제목을 입력해주세요"),
  startDate: z.string().nonempty("시작일을 선택해주세요"),
  endDate: z.string().nonempty("종료일을 선택해주세요"),
  private: z.string().nonempty("공개 여부를 선택해주세요"),
  budget: z.coerce
    .number()
    .positive("예산을 입력해주세요")
    .refine((value) => !isNaN(value), {
      message: "숫자만 입력해주세요",
    }),
});
