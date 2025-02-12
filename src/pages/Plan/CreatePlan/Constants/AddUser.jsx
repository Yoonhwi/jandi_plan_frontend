import { useState } from "react";
import styles from "./AddUser.module.css";
import {Input, Button} from "@/components";
import { useModal } from "@/components/Modal/ModalContext";

const AddUser = ({onConfirm}) => {
  const [inputValue, setInputValue] = useState("");
  const [userNames, setUserNames] = useState([]);
  const { closeModal } = useModal();

  const handleAddUser = () => {
    if (inputValue.trim() === "") return;  // 빈 값 방지 나중에 이름 존재 여부 확인

    setUserNames([...userNames, inputValue]);
    setInputValue("");
  };

  const handleRemoveUser = (index) => {
    setUserNames(userNames.filter((_, i) => i !== index));
  };

  const handleConfirmClick = () => {
    onConfirm(userNames); 
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>친구 추가하기</div>
      <div className={styles.input_box}>
        <div className={styles.input}>
          <Input size="lg" placeholder="친구 이름" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        </div>
        <Button size="md" onClick={handleAddUser}>친구 추가</Button>
      </div>
      <div className={styles.user_name_box}>
        {userNames.map((name, index) => (
          <div key={index} className={styles.user_name}>
            <p className={styles.name}>{name}</p>
            <Button size="sm" variant="none" onClick={() => handleRemoveUser(index)}>X</Button>
          </div>
        ))}
      </div>
      <div className={styles.add_button_box}>
        <Button size="md" onClick={handleConfirmClick}>친구 추가</Button>
      </div>
    </div>
  );
};

export default AddUser;