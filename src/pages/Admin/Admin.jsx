import styles from "./Admin.module.css";
import Dashboard from "./Dashboard/Dashboard";
import UserManagement from "./User/UserManagement";
import TripManagement from "./Trip/TripManagement";
import Sidebar from "./Sidebar";
import NoticeManagement from "./Notice/NoticeManagement";
import BannerManagement from "./Banner/BannerManagement";
import CommunityManagement from "./Community/CommunityManagement";

const AdminPage = () => {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main_content}>
        <Dashboard />
        <UserManagement />
        <TripManagement />
        <CommunityManagement />
        <NoticeManagement />
        <BannerManagement />
      </div>
    </div>
  );
};

export default AdminPage;
