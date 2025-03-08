import styles from "./PrefDestination.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Button, Loading } from "@/components";
import { PageEndPoints,APIEndPoints } from "@/constants";
import { FaCheck } from "react-icons/fa";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { useAuth, useToast } from "@/contexts";
import { useAxios } from "@/hooks";

const PrefDestination = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { loading, fetchData } = useAxios();
    const { createToast } = useToast();
    const [destinations, setDestinations] = useState([]); //필터링 전체 도시 데이터
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [selectedContinents] = useState(state?.selectedContinents || []);
    const [mode] = useState(state?.mode || []);
    
    useEffect(() =>{
        const params = new URLSearchParams();
        params.append("category", "CONTINENT");
        if (selectedContinents.length > 0) {
            params.append("filter", selectedContinents.join(","));
        }

        fetchData({
            method: "GET",
            url: `${APIEndPoints.DESTINATION}`,
            params,
        }).then((res)=>{
            console.log(res.data);
            setDestinations(res.data || []);
        })
    }, [fetchData]);

    const currentContinent = selectedContinents[currentIndex];
    // 현재 선택된 대륙의 도시 필터링
    const filteredDestinations = destinations.filter(
        (destination) => destination.country.continent.name === currentContinent
    );
    // 대륙 도시 내 국가별 그룹화화
    const groupedDestinations = filteredDestinations.reduce((acc, destination) => {
        const { country } = destination;
        if (!acc[country.countryId]) {
            acc[country.countryId] = {
                countryName: country.name,
                destinations: [],
            };
        }
        acc[country.countryId].destinations.push(destination);
        return acc;
    }, {});

    const handleNext = () => {
        if (currentIndex < state?.selectedContinents.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        if (selectedDestinations.length === 0) {
            createToast({ type: "error", text: "관심있는 여행지를 선택해 주세요."});
            return;
        }

        if(mode==="create"){
            fetchData({
                method: "POST",
                url: `${APIEndPoints.PREFER_DEST}`,
                data: {
                    cities: selectedDestinations,
                },
            }).then((res) =>{
                createToast({
                    type: "success",
                    text: "관심가는 여행지를 저장하였습니다.",
                });
                navigate(PageEndPoints.HOME);
            }).catch((err) =>{
                createToast({
                    type: "error",
                    text: "관심가는 여행지를 저장하는데 실패하였습니다.",
                });
            })
        }
        else{
            fetchData({
                method: "PATCH",
                url: `${APIEndPoints.PREFER_DEST}`,
                data: {
                    cities: selectedDestinations,
                },
            }).then((res) =>{
                createToast({
                    type: "success",
                    text: "관심가는 여행지를 수정하였습니다.",
                });
                navigate(PageEndPoints.MYPAGE);
            }).catch((err) =>{
                createToast({
                    type: "error",
                    text: "관심가는 여행지를 수정하는데 실패하였습니다.",
                });
            })
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
            <h2 className={styles.continent_title}>{currentContinent}</h2>
                    <div className={styles.continent_section}>
                        <div className={styles.destination_list}>
                            {Object.values(groupedDestinations).map((category) => (
                            <div className={styles.category_section}>
                                <h3 className={styles.category_title}>{category.countryName}</h3>
                                <div className={styles.destination_items}>
                                {category.destinations.map((destination) => {
                                    const isSelected = selectedDestinations.includes(destination.name);
                                    return (
                                    <div
                                        key={destination.name}
                                        className={styles.destination}
                                        onClick={() => handleSelectDestination(destination.name)}
                                    >
                                        <div className={styles.dest_trans}>                                        

                                            <img
                                            src={destination.imageUrl}
                                            alt={destination.name}
                                            className={`${styles.dest_img} ${isSelected ? styles.selected_img : ""}`}
                                            />
                                            {isSelected ? <BiSolidPlaneAlt className={styles.check_box}/>:null}

                                            <img
                                            src={destination.imageUrl}
                                            alt={destination.name}
                                            className={styles.dest_back_img}
                                            />
                                            {isSelected ? <FaCheck className={styles.check_box_back}/>:null}
                                            <div className={styles.dest_back_box}>
                                                <h1>{destination.description}</h1>
                                            </div>
                                        </div>
                                        <div className={styles.destination_text}>{destination.name}</div>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>


            <div className={styles.button_box}>
                <Button size="lg" variant="outline" onClick={handlePrev}>
                    이전
                </Button>
                <p className={styles.index_number}>{currentIndex+1} / {selectedContinents.length}</p>
                <Button size="lg" variant="outline" onClick={handleNext}>
                    {currentIndex === selectedContinents.length - 1 ? "완료" : "다음"}
                </Button>
            </div>
        </div>
    );
};

export default PrefDestination;
