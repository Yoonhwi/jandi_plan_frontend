import { BaseLayout } from "@/layouts";
import styles from "./Destination.module.css";
import { planItems,dummy } from "./constants";
import Weather from "./components/Weather";
import { useEffect, useState } from "react";
import DestinationMap from "./components/DestinationMap";
import {Slider, Loading} from "@/components";
import { IoIosStar } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";

const Destination = () => {
    const location = useLocation();
    const cityName = location.state?.cityName;
    const { loading, fetchData, response } = useAxios();
    const [item,setItem]= useState();
    const [selectedPlace, setSelectedPlace] = useState("오사카");

    useEffect(()=>{
        fetchData({
            method:"GET",
            url: `${APIEndPoints.DESTINATION}`,
            params: {
                category:"CITY",
                filter: cityName,
            }
        }).then((res) => {
            console.log(res);
            const items = res.data[0];
            setItem(items);
        }).catch((err) => {
            console.log(err);
        })
    },[fetchData])

    return(
        <BaseLayout>
        {loading ? (
        <Loading />
      ) : (
        item &&(
            <div className={styles.container}>
                <div className={styles.title_box}>
                    <p className={styles.main_title}>{item.name}</p>
                </div>
                <div className={styles.info_container}>
                    <div className={styles.map_container}>
                        <DestinationMap latitude={item.latitude} longitude={item.longitude}/>
                    </div>
                    <div className={styles.info_box}>
                        <div className={styles.weather_box}>
                            <Weather latitude={item.latitude} longitude={item.longitude}/>
                        </div>
                        <div className={styles.plane_box}>
                            <p className={styles.item_title}>비행기 값 알아보기</p>
                        </div>
                        <div className={styles.hotel_box}>
                            <p className={styles.item_title}>숙소 알아보기</p>
                        </div>
                    </div>
                </div>
                <div className={styles.restraunt_container}>
                    <div className={styles.title_box}>
                            <p className={styles.title}>Famous Restraunt</p>
                    </div>
                    <Slider items={dummy} size="sm">
                        {(item) => (
                            <>
                                <div
                                className={styles.img_container}
                                style={{
                                    backgroundImage: `url(${item.profile_url})`,
                                }}
                                />
                                <div className={styles.plan_box}>
                                <div className={styles.plan_title}>
                                    <p className={styles.plan_name}>{item.title}</p>
                                    <p className={styles.plan_destination}><IoIosStar size={16} color={"yellow"}/>{item.rate} ({item.likeCount})</p>
                                </div>
                                </div>
                            </>
                        )}
                    </Slider>
                </div>
                <div className={styles.plan_container}>
                    <div className={styles.title_box}>
                            <p className={styles.title}>Like / Favorite Trip</p>
                    </div>
                    <Slider items={planItems} size="sm">
                        {(item) => (
                        <>
                            <div
                            className={styles.img_container}
                            style={{
                                backgroundImage: `url(${item.plan.profile_url})`,
                            }}
                            />
                            <div className={styles.plan_box}>
                            <div className={styles.plan_title}>
                                <p className={styles.plan_name}>{item.plan.title}</p>
                                <p className={styles.plan_destination}>{item.plan.destination}</p>
                            </div>
                            </div>
                        </>
                        )}
                    </Slider>
                </div>
            </div>
            )
        )}
        </BaseLayout>
    );
};

export default Destination;