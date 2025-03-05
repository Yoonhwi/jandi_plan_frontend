import styles from "./UserManagement.module.css";
import UserAll from "./UserAll";

const UserManagement = () => {
  return (
    <div className={styles.container} id="users">
      <UserAll />
    </div>
  );
};

export default UserManagement;
