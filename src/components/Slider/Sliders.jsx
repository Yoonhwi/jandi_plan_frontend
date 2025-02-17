import styles from "./Sliders.module.css";
import {Button} from "@/components";
import { MdNavigateBefore,MdNavigateNext  } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Sliders = ({ items, children }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        // arrow:true,
        // nextArrow: (
        //     <Button className={styles.slick_next_arrow} size="md" variant="none"><MdNavigateNext /></Button>
        // ),
        // prevArrow: (
        //     <Button className={styles.slick_next_arrow} size="md" variant="none"><MdNavigateBefore /></Button>
        // ),
        responsive: [
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };

      return(
        <div className={styles.slider_container}>
            <Slider {...settings}>
                {items.map((item, index) => (
                <div key={index} className={styles.place_box}>
                    {children(item)}
                </div>
                ))}
            </Slider>
        </div>
      );

}

export default Sliders;