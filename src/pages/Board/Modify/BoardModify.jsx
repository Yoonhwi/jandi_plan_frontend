import { Button, Loading } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAuth } from "@/contexts";
import { useAxios, useCommunity, useQuillEvents } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { buildPath } from "@/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { boardWriteScheme } from "../constants";
import FormEditor from "../FormEditor";

const BoardModify = () => {
  const [defaultContent, setDefaultContent] = useState(null);
  const [quill, setQuill] = useState(null);
  const { id } = useParams();
  const { fetchData, response, loading } = useAxios();
  const { user } = useAuth();

  const formController = useForm({
    resolver: zodResolver(boardWriteScheme),
  });

  const { setValue } = formController;
  const { updateCommunity } = useCommunity();

  useQuillEvents(quill, setValue, id);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: buildPath(APIEndPoints.BOARD_DETAIL, { id }),
    });
  }, [fetchData, id]);

  useEffect(() => {
    if (!response) return;
    const parsed = JSON.parse(response.items.content);
    setValue("title", response.items.title);
    setValue("tempPostId", Number(id));
    setValue("content", parsed);
    setDefaultContent(parsed);
  }, [id, response, setValue]);

  if (loading || !defaultContent) return <Loading />;
  if (!response || !user || response.items.user.userId !== user.userId)
    return <p>권한이 없습니다.</p>;

  return (
    <BaseLayout>
      <FormEditor
        formController={formController}
        setQuill={setQuill}
        tempPostId={id}
        onSubmit={updateCommunity}
        defaultValue={defaultContent}
      >
        <Button
          type="submit"
          variant="solid"
          size="md"
          style={{
            marginLeft: "auto",
          }}
        >
          포스팅 수정 완료
        </Button>
      </FormEditor>
    </BaseLayout>
  );
};

export default BoardModify;
