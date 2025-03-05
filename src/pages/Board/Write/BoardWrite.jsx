import { Button } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAxios, useCommunity, useQuillEvents } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { boardWriteScheme } from "../constants";
import FormEditor from "../FormEditor";

const BoardWrite = () => {
  const [quill, setQuill] = useState(null);
  const formController = useForm({
    resolver: zodResolver(boardWriteScheme),
  });

  const { setValue } = formController;
  const [searchParams, setSearchParams] = useSearchParams();
  const tempPostId = searchParams.get("tempPostId");

  const { fetchData: getTempId } = useAxios();
  const { addCommunity } = useCommunity();

  useQuillEvents(quill, setValue, tempPostId);

  useEffect(() => {
    getTempId({
      url: APIEndPoints.TEMP,
      method: "POST",
    }).then((res) => {
      const tempPostId = res.data.tempPostId;
      setValue("tempPostId", tempPostId);
      setSearchParams({ tempPostId });
    });
  }, []);

  return (
    <BaseLayout>
      <FormEditor
        formController={formController}
        onSubmit={addCommunity}
        setQuill={setQuill}
        tempPostId={tempPostId}
      >
        <Button
          type="submit"
          variant="solid"
          size="md"
          style={{
            marginLeft: "auto",
          }}
        >
          포스팅 완료
        </Button>
      </FormEditor>
    </BaseLayout>
  );
};

export default BoardWrite;
