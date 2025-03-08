import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useSearchParams } from "react-router-dom";
import useQuillEvents from "./useQuillEvents";
import { APIEndPoints } from "@/constants";

const useQuillSetup = (formController, category, id, isEditMode = false) => {
  const [quill, setQuill] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchData: getTempId } = useAxios();
  const { setValue } = formController;

  const tempId = searchParams.get(`temp${category}Id`);

  useQuillEvents(quill, setValue, isEditMode ? id : tempId, category);

  useEffect(() => {
    if (isEditMode) {
      setValue(`temp${category}Id`, id);
      return;
    }

    getTempId({
      url: APIEndPoints.TEMP,
      method: "POST",
    })
      .then((res) => {
        const newTempId = res.data.tempPostId;
        setValue(`temp${category}Id`, newTempId);

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(`temp${category}Id`, newTempId);
        setSearchParams(newSearchParams);
      })
      .catch((err) => console.error(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTempId, setValue, category]);

  return { setQuill, tempId };
};

export default useQuillSetup;
