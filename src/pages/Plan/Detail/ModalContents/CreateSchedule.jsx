import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ScheduleDetail from "./ScheduleDetail";
import SchedulePlace from "./SchedulePlace";
import { usePlanDetail } from "../PlanDetailContext";

const schema = z.object({
  date: z.string().nonempty({ message: "날짜를 입력하세요." }),
  time: z.string().nonempty({ message: "시간을 입력하세요." }),
  title: z.string().nonempty({ message: "제목을 입력하세요." }),
  place: z.object({
    name: z.string(),
    address: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
  cost: z.string().nonempty({ message: "비용을 입력하세요." }),
});

const CreateSchedule = () => {
  const [isAddressStep, setIsAddressStep] = useState(false);
  const { addSchedule } = usePlanDetail();

  const formController = useForm({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue } = formController;

  const onSubmit = (data) => {
    addSchedule(data);
  };

  const handleAddressStep = useCallback(() => {
    setIsAddressStep(true);
  }, []);

  const handleScheduleStep = useCallback(() => {
    setIsAddressStep(false);
  }, []);

  return (
    <>
      {isAddressStep ? (
        <SchedulePlace
          formController={formController}
          setPlace={setValue}
          handleScheduleStep={handleScheduleStep}
        />
      ) : (
        <ScheduleDetail
          formController={formController}
          onSubmit={handleSubmit(onSubmit)}
          handleAddressStep={handleAddressStep}
        />
      )}
    </>
  );
};

export default CreateSchedule;
