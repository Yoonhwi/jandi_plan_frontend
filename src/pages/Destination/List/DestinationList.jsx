import styles from "./DestinationList.module.css";
import { useState, useEffect } from "react";
import { BaseLayout } from "@/layouts";
import DetailItem from "./components/DetailItem";
import { Button, Input } from "@/components";
import { FiSearch } from "react-icons/fi";
import { PageEndPoints, APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";

const DestinationList = () => {
  const { loading, fetchData, response } = useAxios();
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [destinations, setDestinations] = useState([]); 

  const [selectedContinent, setSelectedContinent] = useState(""); // 선택한 대륙
  const [selectedCountry, setSelectedCountry] = useState("");


  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.CONTINENT}`,
      params: {filter: ""},
    }).then((res) => {
      console.log(res.data);
      setContinents(res.data || []);
    });
  }, []);


  useEffect(() => {
    console.log(selectedContinent);
    if (!selectedContinent) return;
    
    fetchData({
      method: "GET",
      url: `${APIEndPoints.COUNTRY}`,
      params: {filter: selectedContinent},
    }).then((res) => {
      console.log(res.data);
      setCountries(res || []);
      setSelectedCountry(""); // 대륙 변경 시 국가 선택 초기화
    });
  }, [selectedContinent]);


  useEffect(() => {
    const params = new URLSearchParams();

  if (selectedContinent) {
    params.append("filter", selectedContinent);
  }
  if (selectedCountry) {
    params.append("filter", selectedCountry);
  }

  if (!selectedContinent && !selectedCountry) {
    params.append("filter", "");
  }

    fetchData({
      method: "GET",
      url: `${APIEndPoints.DESTINATION}`,
      params: { filter: "" },///여기에 들어가는거 수정 그냥 params만 들어가면 될듯듯
    }).then((res) => {
      console.log(res.data);
      setDestinations(res.data);
    });
  }, [selectedContinent, selectedCountry]);


  return (
    <BaseLayout>
        <div className={styles.container}>
            <div className={styles.title_box}>
                <p className={styles.title}>어디로 놀러가고 싶으신가요?</p>
            </div>
            <div className={styles.category_container}>
              <div className={styles.category_continet}>
                {continents.map((continent) => (
                  <Button
                    key={continent.id}
                    onClick={() => setSelectedContinent(continent.name)}
                    variant={selectedContinent === continent.name ? "solid" : "ghost"}
                  >
                    {continent.name}
                  </Button>
                ))}
              </div>
              {countries.length > 0 && (
                <div className={styles.category_country}>
                  {countries.map((country) => (
                    <Button
                      key={country.id}
                      onClick={() => setSelectedCountry(country.name)}
                      variant={selectedCountry === country.name ? "solid" : "outline"}
                    >
                      {country.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.plan_container}>
                {destinations.map((item) => (
                <DetailItem key={item.cityId} item={item} />
                ))}
            </div>
        </div>
    </BaseLayout>
    )
};

export default DestinationList;