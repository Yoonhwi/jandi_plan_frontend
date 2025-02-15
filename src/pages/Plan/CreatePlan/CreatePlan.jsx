import { BaseLayout } from "@/layouts";
import {Field, Input, Button, Modal, ModalContent, ModalTrigger} from "@/components";
import styles from "./CreatePlan.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import Calendar from "./Constants/Calender";
import AddDestination from "./Constants/AddDestination";
import { useState } from "react";
import AddUser from "./Constants/AddUser";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreatePlanPage = () => {
    const [destination, setDestination] = useState(null);
    const [withUser, setWithUser] = useState(null);
    const [planName, setPlanName] = useState(null);
    const [budget, setBudget] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [arrivalDate, setArrivalDate] = useState(null);
    const navigate = useNavigate();
    const [selectedImg, setSelectedImg] = useState(null);
    const { register, handleSubmit } = useForm();

    const handlePlanNameChange = (event) => {
        setPlanName(event.target.value);
    };

    const handleBudgetChange = (event) => {
        setBudget(event.target.value);
    }

    const handleConfirmUsers = (users) => {
        setWithUser(users.join(", "));
    };

    const handleConfirmDestination = (subtitle, destination, selectedImg) => {
        console.log(selectedImg);
        setDestination(subtitle+" / "+destination);
        setSelectedImg(selectedImg);
    };

    const handleAdd = () => {
        if (checkInfo()) {
            navigate(PageEndPoints.HOME);
        } else {
            console.log("입력되지 않은 항목이 있습니다.");
        }
    };
    
    const checkInfo = () => {
        if (destination===null || budget===null ||  departureDate===null ||arrivalDate===null || planName===null) {
            console.log("모든 항목을 입력하세요.");
            return false;
        }
        return true;
    };

    return(
        <BaseLayout>
            <div className={styles.container}>
                <div className={`${styles.plan_photo_box} ${selectedImg ? styles.has_image : styles.no_image}`}>
                    {selectedImg? <img src={selectedImg} alt="destination_img" className={styles.plan_photo}/> : null}
                </div>
                <div className={styles.plan_container}>
                    <p className={styles.title}>어디로 놀러가시나요?</p>
                    <div className={styles.plan_box}>
                        <div className={styles.plan_inputs}>
                            <div className={styles.plan_columns}>
                                <Field label="여행지" isRequire >
                                    <div className={styles.place}>
                                        <Input
                                            type="text"
                                            style={{  flex: 1 }}
                                            value={destination || ""}
                                            readOnly
                                        />
                                        <Modal>
                                        <ModalTrigger>
                                            <Button size="md" >선택</Button>
                                        </ModalTrigger>
                                        <ModalContent>
                                            <AddDestination onConfirm={handleConfirmDestination}/>
                                        </ModalContent>
                                        </Modal>
                                    </div>
                                </Field>
                            </div>
                            <div className={styles.plan_columns}>
                                <Field
                                    label="플랜 제목"
                                    helperText="ex)오사카 가족여행"
                                    isRequire
                                >
                                    <Input
                                        type="text"
                                        style={{ width: "100%" }}
                                        register={register}
                                        name="title"
                                    />
                                </Field>
                            </div>
                            <div className={styles.plan_columns}>
                                <Field
                                    label="출발일"
                                    helperText=""
                                    isRequire
                                >
                                    <Input
                                        type="date"
                                        style={{ width: "100%" }}
                                        register={register}
                                        name="title"
                                    />
                                </Field>
                            </div>
                            <div className={styles.plan_columns}>
                                <Field
                                    label="도착일"
                                    helperText=""
                                    isRequire
                                >
                                    <Input
                                        type="date"
                                        style={{ width: "100%" }}
                                        register={register}
                                        name="title"
                                    />
                                </Field>
                            </div>
                            <div className={styles.plan_columns}>
                                <Field
                                    label="예산안"
                                    helperText=""
                                    isRequire
                                >
                                    <Input
                                        type="number"
                                        style={{ width: "100%" }}
                                        register={register}
                                        name="title"
                                    />
                                </Field>
                            </div>
                            <div className={styles.plan_columns}>
                                <Field label="친구 추가" isRequire >
                                    <div className={styles.place}>
                                        <Input
                                            type="text"
                                            style={{  flex: 1 }}
                                            value={withUser || ""}
                                            readOnly
                                        />
                                        <Modal>
                                            <ModalTrigger>
                                                <Button size="md" >추가</Button>
                                            </ModalTrigger>
                                            <ModalContent>
                                                <AddUser onConfirm={handleConfirmUsers}/>
                                            </ModalContent>
                                        </Modal>
                                    </div>
                                </Field>
                            </div>
                        </div>
                        <div className={styles.button_container}>
                            <Button size="lg" variant="solid" onClick={() => handleAdd()}>플랜 추가하기</Button>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default CreatePlanPage;