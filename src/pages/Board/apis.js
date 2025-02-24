import { axiosInstance } from "@/apis";
import { APIEndPoints } from "@/constants";

export const uploadImageApi = async (file, targetId = 1) => {
  const accessToken = localStorage.getItem("access-token");
  const formData = new FormData();
  formData.append("file", file);

  return await axiosInstance({
    url: APIEndPoints.IMAGE_UPLOAD_COMMUNITY,
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: formData,
    params: {
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
