import { useAxios } from "@/hooks";
import styles from "./Destination.module.css";
import { useEffect, useMemo } from "react";
import { APIEndPoints } from "@/constants";

const Destination = () => {
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

        if (!hash[continentName]) {
          hash[continentName] = {};
        }

        if (!hash[continentName][countryName]) {
          hash[continentName][countryName] = [];
        }

        hash[continentName][countryName].push(item);
      });
    });
  }, [fetchData, hash]);

  console.log(hash);

  return (
    <div className={styles.container}>
      <p className={styles.title}>여행지 선택하기</p>

      <div className={styles.flex_column}>
        <p className={styles.sub_title}>선호 여행지</p>
      </div>

      <div className={styles.flex_column}>
        <p className={styles.sub_title}>전체 여행지</p>
        {!Object.keys(hash).length ? (
          <div>로딩중...</div>
        ) : (
          Object.keys(hash).map((continent) => {
            console.log("continent", continent);
            return (
              <div key={continent}>
                <p className={styles.continent}>{continent}</p>

                {Object.keys(hash[continent]).map((country) => {
                  console.log("country", hash[continent][country]);
                  console.log("country", country);
                  return (
                    <div key={country}>
                      <p className={styles.sub_title_destination}>{country}</p>

                      <div className={styles.flex_row}>
                        {hash[continent][country].map((city) => {
                          console.log("city", city);
                          return (
                            <div key={city.cityId} className={styles.city}>
                              {city.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Destination;
