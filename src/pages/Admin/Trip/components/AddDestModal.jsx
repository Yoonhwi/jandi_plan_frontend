import styles from "./AddDestModal.module.css";
import FormAddCity from "./FormAddCity";
import FormAddCountry from "./FormAddCountry";

const AddDestModal = ({content}) => {

    return(
        <div className={styles.container}>
            <p className={styles.title}>{content} 추가하기</p>
            <div className={styles.content_container}>
                {content==="나라" ? (
                <FormAddCountry /> 
                ) : ( 
                <FormAddCity /> 
                )}
            </div>
        </div>
    );
};

export default AddDestModal;