import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import styles from "./Country.module.css";
import { useAxios } from "@/hooks";
import { useEffect } from "react";
import { APIEndPoints } from "@/constants";
import AddDestModal from "./components/AddDestModal";


const Country = ({ setView }) => {
  const { fetchData, response } = useAxios();

  useEffect(() => {
    fetchData({
      url: APIEndPoints.COUNTRY,
      method: "GET",
      params: {
        category: "ALL",
      },
    });
  }, [fetchData]);

  useEffect(() => {
    if (!response) return;
  }, [response]);

  console.log(response);

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
          <Button variant="ghost" size="sm" onClick={() => setView("plan")}>
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
            {response?.map((country) => {
              return (
                <tr key={country.countryId}>
                  <td>{country.countryId}</td>
                  <td>{country.continent.name}</td>
                  <td>{country.name}</td>
                  <td className={styles.actions}>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                    <Button size="sm" variant="ghost">
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
