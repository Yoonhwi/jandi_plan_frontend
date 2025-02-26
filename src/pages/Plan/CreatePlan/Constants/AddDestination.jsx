import { useEffect, useMemo, useState } from "react";
import styles from "./AddDestination.module.css";
import { Button } from "@/components";
import { useModal } from "@/components/Modal/ModalContext";
import { destinationItems } from "./constants";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";

const AddDestination = ({ onConfirm }) => {
  const [selectedSubTitle, setSelectedSubTitle] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const { closeModal } = useModal();

  const handleConfirmClick = () => {
    onConfirm(selectedSubTitle, selectedDestination, selectedImg);
    closeModal();
  };

  const handleSelectDestination = (subtitle, destinationName, imgSrc) => {
    setSelectedSubTitle(subtitle);
    setSelectedDestination(destinationName);
    setSelectedImg(imgSrc);
  };

  const hash = useMemo(() => {
    return {};
  }, []);

  const { fetchData } = useAxios();
  useEffect(() => {
    fetchData({
      url: APIEndPoints.DESTINATION,
      method: "GET",
      params: {
        filter: "",
      },
    }).then((res) => {
      const { data } = res;
      data.forEach((item) => {
        const {
          country: { continent },
        } = item;
        const continentName = continent.name;
        const countryName = item.country.name;
        const cityName = item.name;

        if (!hash[continentName]) {
          hash[continentName] = {};
        }

        if (!hash[continentName][countryName]) {
          hash[continentName][countryName] = [];
        }

        hash[continentName][countryName].push(cityName);
      });
    });
  }, [fetchData, hash]);

  console.log(hash);

  return (
    <div className={styles.container}>
      <div className={styles.title}>여행지 선택하기</div>
      <div className={styles.preference_container}>
        <div className={styles.sub_title}>선호 여행지</div>
      </div>
      <div className={styles.sub_title}>전체 여행지</div>
      <div className={styles.content_container}>
        {destinationItems.map((continent) => (
          <div key={continent.title} className={styles.destination_container}>
            <div className={styles.sub_category}>{continent.title}</div>
            {continent.subCategories.map((subCategory) => (
              <div
                className={styles.sub_title_destination}
                key={subCategory.subTitle}
              >
                <div className={styles.sub_sub_title}>
                  {subCategory.subTitle}
                </div>
                <div
                  key={subCategory.destination}
                  className={styles.destination_box}
                >
                  {subCategory.data.map((destination) => (
                    <div
                      key={destination.name}
                      className={`${styles.destination} ${
                        selectedDestination === destination.name
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() =>
                        handleSelectDestination(
                          subCategory.subTitle,
                          destination.name,
                          destination.imgSrc
                        )
                      }
                    >
                      <img
                        src={destination.imgSrc}
                        alt={destination.name}
                        className={`${styles.dest_img} ${
                          selectedDestination === destination.name
                            ? styles.selected_img
                            : ""
                        }`}
                      />
                      {selectedDestination === destination.name ? (
                        <BiSolidPlaneAlt className={styles.check_box} />
                      ) : null}
                      <div className={styles.dest_text}>{destination.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.button_box}>
        <Button onClick={handleConfirmClick}>확인</Button>
      </div>
    </div>
  );
};

export default AddDestination;
