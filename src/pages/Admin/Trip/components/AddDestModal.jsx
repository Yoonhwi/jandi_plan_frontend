import styles from "./AddDestModal.module.css";
import FormCity from "./FormCity";
import FormCountry from "./FormCountry";

const AddDestModal = ({content,onSuccess}) => {

    return(
        <div className={styles.container}>
            <p className={styles.title}>{content} 추가하기</p>
            <div className={styles.content_container}>
                {content==="나라" ? (
                <FormCountry forUse="POST" data="" onSuccess={onSuccess}/> 
                ) : ( 
                <FormCity forUse="POST" data="" onSuccess={onSuccess}/> 
                )}
            </div>
        </div>
    );
};

export default AddDestModal;