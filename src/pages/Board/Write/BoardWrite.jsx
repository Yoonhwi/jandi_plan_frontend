import { Button } from "@/components";
import { useCommunity, useQuillSetup } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boardWriteScheme } from "../constants";
import FormEditor from "../FormEditor";

const BoardWrite = () => {
  const { addCommunity } = useCommunity();

  const formController = useForm({
    resolver: zodResolver(boardWriteScheme),
  });

  const { setQuill, tempId } = useQuillSetup(
    formController,
    "Community",
    null,
    false
  );

  return (
    <BaseLayout>
      <FormEditor
        formController={formController}
        onSubmit={addCommunity}
        setQuill={setQuill}
        tempPostId={tempId}
        category="Community"
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
