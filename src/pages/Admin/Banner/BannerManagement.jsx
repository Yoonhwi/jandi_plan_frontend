import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import { useBanner } from "@/hooks";
import { formatDate } from "date-fns";
import styles from "./BannerManagement.module.css";
import ModifyBanner from "./ModifyBanner";

const BannerManagement = () => {
  const { allBanner, addBanner, updateBanner, deleteBanner } = useBanner();

  if (!allBanner) return null;
  return (
    <div className={styles.container} id="banner">
      <p className={styles.title}>배너 관리</p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>링크</th>
            <th>생성일</th>
            <th className={styles.action_title}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {allBanner?.items.map((banner) => {
            const date = formatDate(new Date(banner.createdAt), "yyyy. MM. dd");

            return (
              <tr key={banner.bannerId}>
                <td>{banner.bannerId}</td>
                <td>{banner.title}</td>
                <td className={styles.banner_link}>
                  <a href={banner.linkUrl} target="_blank">
                    {banner.linkUrl}
                  </a>
                </td>
                <td>{date}</td>
                <td className={styles.actions}>
                  <Modal>
                    <ModalTrigger>
                      <Button size="sm" variant="ghost">
                        Edit
                      </Button>
                    </ModalTrigger>
                    <ModalContent>
                      <ModifyBanner item={banner} callback={updateBanner} />
                    </ModalContent>
                  </Modal>

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

export default BannerManagement;
