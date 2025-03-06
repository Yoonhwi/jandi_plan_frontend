import { z } from "zod";

export const createCountrySchema = z.object({
  continent: z.enum(["아시아", "북미", "유럽", "남미", "아프리카", "오세아니아/대양주"]),
  country: z.string().nonempty("나라 이름을 입력해주세요"),
});

export const createCitySchema = z.object({
  country:  z.string().nonempty("나라 이름을 입력해주세요"),
  city: z.string().nonempty("도시 이름을 입력해주세요"),
  description: z.string().nonempty("도시 설명을 입력해주세요"),
  file: z
  .instanceof(FileList) // FileList로 받아야 함
  .refine((files) => files.length > 0, {
    message: "도시 파일을 넣어주세요", // 파일이 없을 경우 메시지
  }),
  latitude: z.coerce
  .number()
  .positive("위도를 입력해주세요")
  .refine((value) => !isNaN(value), {
    message: "숫자만 입력해주세요",
  }),

longitude: z.coerce
.number()
.positive("경도를 입력해주세요")
.refine((value) => !isNaN(value), {
  message: "숫자만 입력해주세요",
}),

});
