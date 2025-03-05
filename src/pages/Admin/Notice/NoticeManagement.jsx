import { useAxios } from "@/hooks";
import styles from "./NoticeManagement.module.css";
import { Button } from "@/components";
import { useEffect } from "react";
import { APIEndPoints } from "@/constants";
import { formatDate } from "date-fns";

const NoticeManagement = () => {
  const { fetchData, response } = useAxios();

  useEffect(() => {
    fetchData({ url: APIEndPoints.NOTICEALL, method: "GET" });
  }, [fetchData]);

  return (
    <div className={styles.container} id="notice">
      <p className={styles.title}>공지사항 관리</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>본문</th>
            <th>생성일</th>
            <th className={styles.action_title}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {response?.items.map((notice) => {
            const date = formatDate(new Date(notice.createdAt), "yyyy. MM. dd");
            return (
              <tr key={notice.noticeId}>
                <td>{notice.noticeId}</td>
                <td>{notice.title}</td>
                <td className={styles.content}>{notice.contents}</td>
                <td>{date}</td>
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
  );
};

export default NoticeManagement;
