import { useEffect, useState } from "react";
import styles from "./AddNotice.module.css";
import { useAxios, useQuillEvents } from "@/hooks";
import { APIEndPoints } from "@/constants";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormEditor from "@/pages/Board/FormEditor";
import { Button } from "@/components";
import { noticeWriteSchema } from "./constants";

const AddNotice = ({ callback }) => {
  const [quill, setQuill] = useState(null);
  const formController = useForm({
    resolver: zodResolver(noticeWriteSchema),
  });

  const { setValue } = formController;
  const [searchParams, setSearchParams] = useSearchParams();
  const tempNoticeId = searchParams.get("tempNoticeId");

  const { fetchData: getTempId } = useAxios();

  useQuillEvents(quill, setValue, tempNoticeId, "notice");

  useEffect(() => {
    getTempId({
      url: APIEndPoints.TEMP,
      method: "POST",
    }).then((res) => {
      const tempNoticeId = res.data.tempPostId;
      setValue("tempNoticeId", tempNoticeId);

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("tempNoticeId", tempNoticeId);
      setSearchParams(newSearchParams);
    });

    return () => {
      setValue("tempNoticeId", "");
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("tempNoticeId");
      setSearchParams(newSearchParams);
    };
  }, []);

  return (
    <div className={styles.container}>
      <p>공지사항 추가</p>

      <FormEditor
        formController={formController}
        onSubmit={callback}
        setQuill={setQuill}
        tempPostId={tempNoticeId}
        category="notice"
      >
        <Button
          type="submit"
          variant="solid"
          size="md"
          style={{
            marginLeft: "auto",
          }}
        >
          공지 등록
        </Button>
      </FormEditor>
    </div>
  );
};

export default AddNotice;
