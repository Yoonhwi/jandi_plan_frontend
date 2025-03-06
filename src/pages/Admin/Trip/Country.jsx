import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import styles from "./Country.module.css";
import { useAxios } from "@/hooks";
import { useEffect, useCallback } from "react";
import { APIEndPoints } from "@/constants";
import AddDestModal from "./components/AddDestModal";
import { useToast } from "@/contexts";
import { buildPath } from "@/utils";


const Country = ({ setView }) => {
  const [items, setItems] = useState();
  const { loading, fetchData, response } = useAxios();
  const { fetchData: deleteApi } = useAxios();
  const { fetchData: fetchApi } = useAxios();
  const { createToast } = useToast();

  const fetchCountries = useCallback(async () => {
    await fetchData({
      url: APIEndPoints.COUNTRY,
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
  },[fetchData, setView]);

  const deleteContries = useCallback((id) => {
    deleteApi({
            method: "DELETE",
            url: buildPath(APIEndPoints.COUNTRY_MANAGE, { id }),
          })
            .then(() => {
              fetchCountries();
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
  },[createToast, deleteApi, fetchCountries])

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries, setView]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>나라 관리</p>
        <div>
          <Modal>
            <ModalTrigger>
            <Button variant="ghost" size="sm">
              나라 추가
            </Button>
            </ModalTrigger>
            <ModalContent>
              <AddDestModal content="나라"/>
            </ModalContent>
          </Modal>
          <Button variant="ghost" size="sm" onClick={() => setView("city")}>
            여행지 관리
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
              <th className={styles.action_title}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items?.map((country) => {
              return (
                <tr key={country.countryId}>
                  <td>{country.countryId}</td>
                  <td>{country.continent.name}</td>
                  <td>{country.name}</td>
                  <td className={styles.actions}>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                    <Button size="sm" variant="ghost" onClick={()=>deleteContries(country.countryId)}>
                      Delete
                    </Button>
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

export default Country;
