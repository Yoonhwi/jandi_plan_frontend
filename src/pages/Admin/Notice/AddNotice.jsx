import { useCallback, useEffect, useState } from "react";
import styles from "./AddNotice.module.css";
import { useAxios, useQuillEvents } from "@/hooks";
import { APIEndPoints } from "@/constants";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormEditor from "@/pages/Board/FormEditor";
import { Button } from "@/components";
import { noticeWriteSchema } from "./constants";
import { useModal } from "@/components/Modal/ModalContext";

const AddNotice = ({ callback }) => {
  const [quill, setQuill] = useState(null);
  const { closeModal } = useModal();

  const formController = useForm({
    resolver: zodResolver(noticeWriteSchema),
  });

  const { setValue } = formController;
  const [searchParams, setSearchParams] = useSearchParams();
  const tempNoticeId = searchParams.get("tempNoticeId");

  const { fetchData: getTempId } = useAxios();

  useQuillEvents(quill, setValue, tempNoticeId, "notice");

  const onSubmit = useCallback(
    (data) => {
      callback(data);
      closeModal();
    },
    [callback, closeModal]
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTempId, setValue]);

  return (
    <div className={styles.container}>
      <p>공지사항 추가</p>

      <FormEditor
        formController={formController}
        onSubmit={onSubmit}
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
