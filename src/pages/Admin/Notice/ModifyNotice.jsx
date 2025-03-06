import { useForm } from "react-hook-form";
import styles from "./ModifyNotice.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { noticeModifySchema } from "./constants";
import FormEditor from "@/pages/Board/FormEditor";
import { useEffect, useState } from "react";
import { Button } from "@/components";
import { useQuillEvents } from "@/hooks";

const ModifyNotice = ({ notice, callback }) => {
  const [quill, setQuill] = useState(null);

  const formController = useForm({
    resolver: zodResolver(noticeModifySchema),
    defaultValues: {
      title: notice.title,
      contents: notice.contents,
    },
  });

  const { setValue } = formController;

  useQuillEvents(quill, setValue, notice.noticeId);

  useEffect(() => {
    const parsed = JSON.parse(notice.contents);
    setValue("title", notice.title);
    setValue("contents", parsed);
  }, [notice.contents, notice.title, setValue]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <p>공지사항 수정</p>
      <FormEditor
        formController={formController}
        onSubmit={onSubmit}
        setQuill={setQuill}
        tempPostId={notice.noticeId}
        category="notice"
      >
        <Button
          type="submit"
          variant="solid"
          size="sm"
          className={styles.submit}
        >
          수정하기
        </Button>
      </FormEditor>
    </div>
  );
};

export default ModifyNotice;
