import styles from "./CityCard.module.css";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils";
import { PageEndPoints } from "@/constants";

const CityCard = ({ item }) => {
  const navigate = useNavigate();

  const goDetail = () =>{
   const path = buildPath(PageEndPoints.DESTINATION_DETAIL, { id: item.cityId });
   navigate(path,{ state: { cityName: item.name } });
 }

  return (
    <div className={styles.container} onClick={goDetail}>
      <div
        className={styles.img_container}
        style={{
          backgroundImage: `url(${item.imageUrl})`,
        }}
      />

      <div className={styles.plan_container}>
        <div className={styles.destination}>
          <p className={styles.city}>{item.name}</p>
          <p className={styles.country}>
            {item.country.continent.name}/{item.country.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
