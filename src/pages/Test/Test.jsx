import { Button } from "@/components";
import { Input } from "@/components";
import styles from "./Test.module.css";
import { BaseLayout } from "@/layouts";

const TestPage = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        {/** Button UI */}
        <div className={styles.button_container}>
          <div className={styles.button_solid}>
            <p>variant : solid</p>
            <Button size="sm">size-sm</Button>
            <Button size="md">size-md</Button>
            <Button size="lg">size-lg</Button>
          </div>
          <div className={styles.button_ghost}>
            <p>variant : ghost</p>
            <Button size="sm" variant="ghost">
              size-sm
            </Button>
            <Button size="md" variant="ghost">
              size-md
            </Button>
            <Button size="lg" variant="ghost">
              size-lg
            </Button>
          </div>
          <div className={styles.button_outline}>
            <p>variant : outline</p>
            <Button size="sm" variant="outline">
              size-sm
            </Button>
            <Button size="md" variant="outline">
              size-md
            </Button>
            <Button size="lg" variant="outline">
              size-lg
            </Button>
          </div>
          <div className={styles.button_none}>
            <p>variant : none</p>
            <Button size="sm" variant="none">
              size-sm
            </Button>
            <Button size="md" variant="none">
              size-md
            </Button>
            <Button size="lg" variant="none">
              size-lg
            </Button>
          </div>
        </div>
        {/** Input UI */}
        <div className={styles.button_container}>
          <div className={styles.input_title}>
          <p>variant : Input_title</p>
          <Input size="2xl" placeholder="Input_title" />
          <Input size="lg" placeholder="Input_title" />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default TestPage;
