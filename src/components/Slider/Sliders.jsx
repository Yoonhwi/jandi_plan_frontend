import styles from "./Sliders.module.css";
import {Button} from "@/components";
import { MdNavigateBefore,MdNavigateNext  } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Sliders = ({items, type}) => {
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
                {items.map((item,index)=> (
                    <div key={index} className={styles.place_box}>
                        {type === "destination" ? (
                            <>
                            <div
                                className={styles.img_container}
                                style={{
                                    backgroundImage: `url(${item.imgSrc})`,
                                }}
                            />
                            <div className={styles.dest_container}>
                                <div className={styles.dest_title}>
                                    <p className={styles.dest_name}>{item.name}</p>
                                </div>
                            </div>                           
                            </>
                        ):(
                            <>
                            <div
                                className={styles.img_container}
                                style={{
                                    backgroundImage: `url(${item.plan.profile_url})`,
                                }}
                            />
                            <div className={styles.plan_container}>
                                <div className={styles.plan_title}>
                                <p className={styles.plan_name}>{item.plan.title}</p>
                                <p className={styles.plan_destination}>{item.plan.destination}</p> 
                                </div>
                            </div>
                            </>
                        )}
                        
                    </div>
                ))}
            </Slider>
        </div>
      );

}

export default Sliders;