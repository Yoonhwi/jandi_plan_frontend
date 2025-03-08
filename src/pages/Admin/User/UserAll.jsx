import { Button, Pagination } from "@/components";
import styles from "./UserAll.module.css";
import { useAxios, usePagination } from "@/hooks";
import { useEffect } from "react";
import { APIEndPoints } from "@/constants";
import { formatDate } from "date-fns";
const UserAll = () => {
  const { fetchData, response } = useAxios();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination("user");

  useEffect(() => {
    fetchData({
      url: APIEndPoints.USER_ALL,
      method: "GET",
      params: {
        page: currentPage - 1,
      },
    }).then((res) => {
      setTotalPage(res.data.pageInfo.totalPages);
    });
  }, [currentPage, fetchData, setTotalPage]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>전체회원 관리</p>
        <Button variant="ghost" size="sm">
          신고된 회원 관리
        </Button>
      </div>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>생성일</th>
              <th>제한</th>
              <th className={styles.action_title}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {response?.items.map((user) => {
              const date = formatDate(user.createdAt, "yyyy. MM. dd");
              return (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.userName}</td>
                  <td className={styles.user_email}>{user.email}</td>
                  <td>{date}</td>
                  <td>{user.reported ? "true" : "false"}</td>
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

      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          callback={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UserAll;
