import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import ScheduleDetail from "./ScheduleDetail";
import SchedulePlace from "./SchedulePlace";
import { usePlanDetail } from "../PlanDetailContext";
import { createScheduleScheme } from "../../constants";
import { useModal } from "@/components/Modal/ModalContext";

const ModifySchedule = ({ item }) => {
  const [isAddressStep, setIsAddressStep] = useState(false);
  const { updateItinerary } = usePlanDetail();
  const { closeModal } = useModal();

  const formController = useForm({
    resolver: zodResolver(createScheduleScheme),
    defaultValues: {
      placeName: item.place.name,
      placeId: item.place.placeId,
      ...item,
    },
  });

  const { handleSubmit, setValue } = formController;

  const onSubmit = useCallback(
    (data) => {
      updateItinerary(item.itineraryId, data);
      closeModal();
    },
    [closeModal, item.itineraryId, updateItinerary]
  );

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
          isModify={true}
        />
      )}
    </>
  );
};

export default ModifySchedule;
