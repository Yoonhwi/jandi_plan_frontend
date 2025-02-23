import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Weather.module.css";
const Weather = ({city}) => {
    const [fivedayForecast, setFivedayForecast] = useState([]);
    const [visibleForecast, setVisibleForecast] = useState(fivedayForecast);

    const fetchWeather = async (city) => {
    const key= import.meta.env.VITE_WEATHER_API_KEY;
    const baseUrl = `https://pro.openweathermap.org/data/2.5/forecast?q=osaka&appid=${key}&units=metric&lang=kr`;
    console.log(baseUrl);
    try {
      const response = await fetch(`${baseUrl}`);
      const data = await response.json();
      console.log(data);
      
    // 12시 날씨만 필터링
    const noonWeather = data.list.filter(item => item.dt_txt.includes("12:00:00")).map(item => ({
    date: item.dt_txt.split(' ')[0],
    temp: item.main.temp, 
    iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`
    }));

    setFivedayForecast(noonWeather);

    } catch (error) {
      console.log("Error: " + error);
    }
    };
      
    useEffect (()=> {
      fetchWeather(city);
    },[]);

    useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth <= 957) { 
              setVisibleForecast(fivedayForecast.slice(0, 3));
          } else if (window.innerWidth <= 1058) { 
            setVisibleForecast(fivedayForecast.slice(0, 4));
        } else {
              setVisibleForecast(fivedayForecast);
          }
      };
  
      window.addEventListener("resize", handleResize);
      handleResize(); 
      return () => window.removeEventListener("resize", handleResize);
    }, [fivedayForecast]);

    return(
        <div className={styles.weather_container}>
            {visibleForecast.length > 0 ? (
            <div className={styles.forecast_grid}>
            {visibleForecast.map((forecast, index) => (
                <div key={index} className={styles.forecastCard}>
                <p className={styles.forecast_text}>{forecast.date}</p>
                <img src={forecast.iconUrl} className={styles.forecast_img} alt="weather icon" />
                <p className={styles.forecast_text}>{forecast.temp}°C</p>
                </div>
            ))}
            </div>
      ) : (
        <p>날씨 정보를 불러오는 중입니다...</p>
      )}
        </div>
    );
};

export default Weather;