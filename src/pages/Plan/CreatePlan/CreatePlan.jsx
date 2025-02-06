import { BaseLayout } from "@/layouts";
// import {Input} from "@/components";
import styles from "./CreatePlan.module.css";

const CreatePlanPage = () => {

    return(
        <BaseLayout>
        <div className={styles.background}>
            <div className={styles.plan_container}>
                <p className={styles.title}>어디로 놀러가시나요?</p>
                <div className={styles.plan_inputs}>
                    
                </div>
            </div>
        </div>
        </BaseLayout>
    );
};

export default CreatePlanPage;