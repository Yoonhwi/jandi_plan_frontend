import { footerDescriptions } from "./constants";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.title}>JUST PLAN IT!</p>
        <div className={styles.des_container}>
          {footerDescriptions.map((description) => {
            return (
              <div className={styles.des_item} key={description.title}>
                <p className={styles.des_title}>{description.title}</p>
                <div className={styles.des_detail}>
                  {description.details.map((detail) => {
                    return <p key={detail}>{detail}</p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.copyright_container}>
        <div className={styles.divider} />
        <p className={styles.copyright_text}>
          &copy; Photo, Inc. 2019. We love our users!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
