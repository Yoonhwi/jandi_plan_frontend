import { useMemo } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./Banner.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { bannerItems } from "./constants";

const Banner = () => {
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
        {bannerItems.map((item) => {
          return (
            <SwiperSlide key={item.imgSrc}>
              <img
                src={item.imgSrc}
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
