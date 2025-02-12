import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useModal } from "@/components/Modal/ModalContext";

const Calender = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { closeModal } = useModal();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelectDate(date.toLocaleDateString()); // 선택한 날짜 전달
    closeModal();
  };

  return (
    <div>
      <DatePicker selected={selectedDate} onChange={handleDateChange} inline />
    </div>
  );
};

export default Calender;