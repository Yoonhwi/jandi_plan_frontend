import { APIEndPoints } from "@/constants";
import axiosInstance from "./axiosInstance";

export const uploadCommunityImage = async (file, targetId, category) => {
  const urlMap = {
    notice: APIEndPoints.IMAGE_UPLOAD_NOTICE,
    community: APIEndPoints.IMAGE_UPLOAD_COMMUNITY,
  };

  const url = urlMap[category];

  const formData = new FormData();
  formData.append("file", file);
  formData.append("targetId", targetId);

  return await axiosInstance({
    url,
    method: "POST",
    data: formData,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
