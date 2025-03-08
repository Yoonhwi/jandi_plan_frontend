import styles from "./DestMoreInfo.module.css";
import FormCity from "./FormCity";
import FormCountry from "./FormCountry";

const DestMoreInfo = ({content,data,onSuccess}) => {


    return(
        <div className={styles.container}>
            <p className={styles.title}>{content} 수정하기</p>
            <div className={styles.content_container}>
                {content==="나라" ? (
                <FormCountry forUse="PATCH" data={data} onSuccess={onSuccess}/> 
                ) : ( 
                <FormCity forUse="PATCH" data={data} onSuccess={onSuccess}/> 
                )}
            </div>
        </div>
    );
};

export default DestMoreInfo;