import { useMemo, useEffect } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./Banner.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";

const Banner = () => {
  const { loading, fetchData, response } = useAxios();

  useEffect(()=> {
    fetchData({
      method: "GET",
      url: APIEndPoints.BANNER,
    })
  },[fetchData]);

  const swiperPagination = useMemo(() => {
    return {
      clickable: true,
      renderBullet: function (_, className) {
        return `<span class="${className} ${styles.customBullet}"></span>`;
      },
    };
  }, []);

  return (
    <div>
      <Swiper
        pagination={swiperPagination}
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {response?.items.map((item) => {
          return (
            <SwiperSlide key={item.imageUrl}>
              <img
                src={item.imageUrl}
                alt="banner"
                className={styles.banner_img}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
