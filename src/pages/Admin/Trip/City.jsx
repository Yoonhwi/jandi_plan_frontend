import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import styles from "./City.module.css";
import { useAxios } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import { APIEndPoints } from "@/constants";
import AddDestModal from "./components/AddDestModal";
import { useToast } from "@/contexts";
import { buildPath } from "@/utils";
import DestMoreInfo from "./components/DestMoreInfo";
import DeleteModal from "@/components/Modal/ModalContents/DeleteModal";


const City = ({ setView }) => {
  const [items, setItems] = useState();
  const { loading, fetchData, response } = useAxios();
  const { fetchData: deleteApi } = useAxios();
  const { fetchData: fetchApi } = useAxios();
  const { createToast } = useToast();

  const fetchCities = useCallback(async () => {
    await fetchData({
      url: APIEndPoints.DESTINATION,
      method: "GET",
      params: {
        category: "ALL",
      },
    }).then((res) => {
      console.log(res.data)
      setItems(res.data)
    }).catch((err) =>{
      setItems();
    })
  }, [fetchData, setView]);

  const deleteCities = useCallback((id) => {
    deleteApi({
            method: "DELETE",
            url: buildPath(APIEndPoints.CITY_MANAGE, { id }),
          })
            .then(() => {
              fetchCities();
              createToast({
                type: "success",
                text: "도시가 삭제되었습니다",
              });
            })
            .catch((err) =>
              createToast({
                type: "error",
                text: err.data.message,
              })
            );
  },[createToast, deleteApi, fetchCities])

  useEffect(() => {
    fetchCities();
  }, [fetchCities, setView]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>여행지 관리</p>
        <div>
          <Modal>
            <ModalTrigger>
            <Button variant="ghost" size="sm">
              도시 추가
            </Button>
            </ModalTrigger>
            <ModalContent>
              <AddDestModal content="도시" onSuccess={fetchCities}/>
            </ModalContent>
          </Modal>
          <Button variant="ghost" size="sm" onClick={() => setView("country")}>
            나라 관리
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setView("plan")}>
            여행계획 관리
          </Button>

        </div>
      </div>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>대륙</th>
              <th>나라</th>
              <th>도시</th>
              <th className={styles.action_title}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items?.map((city) => {
              return (
                <tr key={city.cityId}>
                  <td>{city.cityId}</td>
                  <td>{city.country.continent.name}</td>
                  <td>{city.country.name}</td>
                  <td>{city.name}</td>
                  <td className={styles.actions}>
                  <Modal>
                    <ModalTrigger>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                    </ModalTrigger>
                    <ModalContent>
                      <DestMoreInfo content="도시" data={city} onSuccess={fetchCities}/>
                    </ModalContent>
                  </Modal>
                  <Modal>
                    <ModalTrigger>
                      <Button size="sm" variant="ghost" >
                        Delete
                      </Button>
                    </ModalTrigger>
                    <ModalContent>
                      <DeleteModal callback={() => deleteCities(city.cityId)} />
                    </ModalContent>
                  </Modal>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default City;
