import { BaseLayout } from "@/layouts";
import {Input, Button, Modal, ModalContent, ModalTrigger} from "@/components";
import styles from "./CreatePlan.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import Calendar from "./Constants/Calender";
import { useState } from "react";

const CreatePlanPage = () => {
    const [destination, setDestination] = useState(null);
    const [planName, setPlanName] = useState(null);
    const [budget, setBudget] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [arrivalDate, setArrivalDate] = useState(null);

    const handlePlanNameChange = (event) => {
        setPlanName(event.target.value);
    };

    const handleBudgetChange = (event) => {
        setBudget(event.target.value);
    }

    return(
        <BaseLayout>
        <div className={styles.background}>
            <div className={styles.plan_container}>
                <p className={styles.title}>어디로 놀러가시나요?</p>
                <div className={styles.plan_inputs}>
                    <div className={styles.plan_columns}>
                        <div className={styles.input_name}>여행지</div>
                            <div className={styles.input}>
                                <p className={styles.input_text}>
                                    {destination || "-"}
                                </p>
                                <Modal>
                                    <ModalTrigger>
                                        <Button size="sm" >여행지 선택하기</Button>
                                    </ModalTrigger>
                                    <ModalContent>
                                        <p>여행지 선택 모달</p>
                                    </ModalContent>
                                </Modal>
                            </div>
                    </div>
                    <div className={styles.plan_columns}>
                        <div className={styles.input_name}>플랜 제목</div>
                            <Input 
                                size="md" 
                                placeholder="플랜 제목을 입력하세요."  
                                type="text" style={{ width: '70%' }} 
                                value={planName} 
                                onChange={handlePlanNameChange} />
                    </div>
                    <div className={styles.plan_columns}>
                        <div className={styles.input_name}>출발일</div>
                            <div className={styles.input}>
                                <p className={styles.input_text}>
                                    {arrivalDate || "-"}
                                </p>
                                <Modal>
                                    <ModalTrigger>
                                        <Button size="sm" variant="ghost"><FaRegCalendarAlt className={styles.input_text}/></Button>
                                    </ModalTrigger>
                                    <ModalContent>
                                        <div  className={styles.modal_container}>
                                            <Calendar onSelectDate={(date) => {setArrivalDate(date);}} />
                                        </div>
                                    </ModalContent>
                                </Modal>
                            </div>
                    </div>
                    <div className={styles.plan_columns}>
                        <div className={styles.input_name}>도착일</div>
                            <div className={styles.input}>
                                <p className={styles.input_text}>
                                    {departureDate || "-"}
                                </p>
                                <Modal>
                                    <ModalTrigger>
                                        <Button size="sm" variant="ghost"><FaRegCalendarAlt className={styles.input_text}/></Button>
                                    </ModalTrigger>
                                    <ModalContent>
                                        <div  className={styles.modal_container}>
                                            <Calendar onSelectDate={(date) => {setDepartureDate(date);}} />
                                        </div>
                                    </ModalContent>
                                </Modal>
                            </div>
                    </div>
                    <div className={styles.plan_columns}>
                        <div className={styles.input_name}>예산안</div>
                            <Input 
                                size="md"
                                placeholder="1인당 예산안(￦)" 
                                type="number" 
                                style={{ width: '70%' }}
                                value={budget} 
                                onChange={handleBudgetChange} 
                                />
                    </div>
                    <div className={styles.plan_columns}>
                        <div className={styles.input_name}>친구 추가</div>
                            <div className={styles.input}>
                                <p className={styles.input_text}>
                                    {destination || "-"}
                                </p>
                                <Modal>
                                    <ModalTrigger>
                                        <Button size="sm" >친구 추가하기</Button>
                                    </ModalTrigger>
                                    <ModalContent>
                                        <p>친구추가 모달</p>
                                    </ModalContent>
                                </Modal>
                            </div>
                    </div>
                </div>
                <div className={styles.button_container}>
                    <Button size="lg" variant="solid">플랜 추가하기</Button>
                </div>
            </div>
           
        </div>
        </BaseLayout>
    );
};

export default CreatePlanPage;