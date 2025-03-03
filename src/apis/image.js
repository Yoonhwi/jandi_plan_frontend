import { APIEndPoints } from "@/constants";
import axiosInstance from "./axiosInstance";

export const uploadCommunityImage = async (file, targetId) => {
  const formData = new FormData();
  formData.append("file", file);

  return await axiosInstance({
    url: APIEndPoints.IMAGE_UPLOAD_COMMUNITY,
    method: "POST",
    data: {
      file: formData,
      targetId,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
