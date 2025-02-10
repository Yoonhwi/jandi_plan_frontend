import styles from "./Destination.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components";
import { destinationItems } from "./constants";
import { PageEndPoints } from "@/constants";

const Destination = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [selectedContinents] = useState(state?.selectedContinents || []);
    const filteredDestinations = destinationItems.filter((item) =>
        selectedContinents.includes(item.title)
    );

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const currentDestination = filteredDestinations[currentIndex];

    const handleNext = () => {
        if (currentIndex < filteredDestinations.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            {selectedDestinations.length === 0 ? null:navigate(PageEndPoints.HOME)}
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            navigate(-1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleSelectDestination = (destinationName) => {
        setSelectedDestinations((prev) =>
            prev.includes(destinationName)
                ? prev.filter((name) => name !== destinationName)
                : [...prev, destinationName]
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.title_box}>
                <p className={styles.title}>관심있는 여행지를 선택하세요.</p>
            </div>

            <div className={styles.destination_box}>
            <h2 className={styles.continent_title}>{currentDestination.title}</h2>
                {currentDestination && (
                    <div key={currentDestination.title} className={styles.continent_section}>
                        <div className={styles.destination_list}>
                            {currentDestination.subCategories.map((category) => (
                            <div key={category.subTitle} className={styles.category_section}>
                                <h3 className={styles.category_title}>{category.subTitle}</h3>
                                <div className={styles.destination_items}>
                                {category.data.map((destination) => {
                                    const isSelected = selectedDestinations.includes(destination.name);
                                    return (
                                    <div
                                        key={destination.name}
                                        className={`${styles.destination} ${isSelected ? styles.selected : ""}`}
                                        onClick={() => handleSelectDestination(destination.name)}
                                    >
                                        <img
                                        src={destination.imgSrc}
                                        alt={destination.name}
                                        className={`${styles.dest_img} ${isSelected ? styles.selected_img : ""}`}
                                        />
                                        {isSelected ? (
                                        <div className={styles.selected_text}>✔ {destination.name}</div>
                                        ) : (
                                        <div className={styles.hover_text}>{destination.name}</div>
                                        )}
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                )}
                </div>


            <div className={styles.button_box}>
                <Button size="lg" variant="outline" onClick={handlePrev}>
                    이전
                </Button>
                <p className={styles.index_number}>{currentIndex+1} / {filteredDestinations.length}</p>
                <Button size="lg" variant="outline" onClick={handleNext}>
                    {currentIndex === filteredDestinations.length - 1 ? "완료" : "다음"}
                </Button>
            </div>
        </div>
    );
};

export default Destination;
