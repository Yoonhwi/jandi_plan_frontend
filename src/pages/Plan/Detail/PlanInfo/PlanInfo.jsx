import styles from "./PlanInfo.module.css";
import { FaRegHeart,FaHeart } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BsPersonArmsUp } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { usePlanDetail } from "../PlanDetailContext";
import { useState, useCallback } from "react";
import { useAxios } from "@/hooks";
import { useAuth, useToast } from "@/contexts";
import { APIEndPoints } from "@/constants";
import { buildPath } from "@/utils";


const PlanInfo = (user) => {
  const { tripDetail } = usePlanDetail();
  const [liked, setLiked] = useState(false);//나중에 trip좋아요 정보 넘어오면 여기 수정
  console.log(user.user.userId);
  console.log(tripDetail);
  const { loading, fetchData } = useAxios();
  const { createToast } = useToast();
  const { fetchData: postApi } = useAxios();

  const likedTrip = (setMethod, id) =>{
    postApi({
      method: setMethod,
      url: buildPath(APIEndPoints.TRIP_SET_LIKED, { id }),
    }).then(() => {
      setLiked((prev) => !prev);
    }).catch((err) => {
      console.log(err);
      createToast({
        type: "error",
        text: err.data.message,
      });
    })
  }
    

  if (!tripDetail) return null;
  return (
    <div className={styles.container}>
      <div className={styles.header_box}>
        <p className={styles.title}>{tripDetail.title}</p>
        {tripDetail.user.userId === user.user.userId ?
          <div className={styles.header_menu}>
            <p className={styles.username}>수정</p>
            <p className={styles.username}>삭제</p>
          </div>
        : 
        <div className={styles.header_menu}>
          {/* <p className={styles.username}>{user.user.username}</p> */}
          {liked? <FaHeart size={24} onClick={()=> likedTrip("DELETE",tripDetail.tripId)}/> : <FaRegHeart size={24} onClick={()=> likedTrip("POST",tripDetail.tripId)}/>}
        </div>
        }
      </div>
      <div className={styles.info}>
        <div className={styles.flex_row}>
          <IoLocationSharp size={20} />
          <p>
            {tripDetail.countryName}, {tripDetail.cityName}
          </p>
        </div>
        <div className={styles.flex_row}>
          <BsPersonArmsUp size={20} />
          <p>1 명</p>
        </div>
        <div className={styles.flex_row}>
          <MdDateRange size={20} />
          <p>
            {tripDetail.startDate} ~ {tripDetail.endDate}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PlanInfo;
