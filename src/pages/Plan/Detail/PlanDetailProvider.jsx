import { useCallback, useState } from "react";
import { PlanDetailContext } from "./PlanDetailContext";

const getDetailPlanDummy = {
  title: "서울 놀자아",
  country: "대한민국",
  destination: "서울",
  startDate: "2025.06.30",
  endDate: "2025.07.04",
  peopleCount: 1,
  latitude: 37.5503,
  longitude: 126.9971,
  budget: 1500000,

  reserved: {
    total: 900000,
    transportation: {
      total: 300000,
      data: [
        {
          id: 1,
          title: "왕복비행기",
          cost: 200000,
        },
        {
          id: 2,
          title: "고속버스 예약",
          cost: 100000,
        },
      ],
    },
    accommodation: {
      total: 300000,
      data: [
        {
          id: 1,
          title: "호텔",
          cost: 200000,
        },
        {
          id: 2,
          title: "게스트하우스",
          cost: 100000,
        },
      ],
    },
    etc: {
      total: 300000,
      data: [
        {
          id: 1,
          title: "보험료",
          cost: 200000,
        },
        {
          id: 2,
          title: "입장료 예약",
          cost: 100000,
        },
      ],
    },
  },

  data: [
    {
      day: 1,
      date: "2025-06-30",
      total: 0,
      contentData: [
        {
          id: 1,
          cost: 30000,
          date: "2025-06-30",
          place: {
            address: "대한민국 서울특별시 관악구 관악로 164 1층 108호",
            lat: 37.479602,
            lng: 126.952736,
            name: "봉천동 매운 떡볶이",
          },
          time: "20:34",
          title: "놀기",
        },
        {
          id: 2,
          cost: 30000,
          date: "2025-06-30",
          place: {
            address: "대한민국 서울특별시 관악구 2F3F 관악로 173",
            lat: 37.48095799999999,
            lng: 126.9524067,
            name: "서울대입구역 3번출구",
          },
          time: "21:00",
          title: "집가기",
        },
        {
          id: 3,
          cost: 30000,
          date: "2025-06-30",
          place: {
            address: "대한민국 서울특별시 관악구 봉천동 34-11",
            lat: 37.4848524,
            lng: 126.9559676,
            name: "봉천동 차이나",
          },
          time: "21:30",
          title: "봉천동 암대나",
        },
        {
          id: 4,
          cost: 30000,
          date: "2025-06-30",
          place: {
            address: "대한민국 서울특별시 종로구 대학로 101",
            lat: 37.5795427,
            lng: 126.9990602,
            name: "서울대학교병원",
          },
          time: "21:40",
          title: "봉천동 암대나",
        },
      ],
    },
    {
      day: 2,
      date: "2025-07-01",
      total: 0,
      contentData: [],
    },
    {
      day: 3,
      date: "2025-07-02",
      total: 0,
      contentData: [],
    },
    {
      day: 4,
      date: "2025-07-03",
      total: 0,
      contentData: [],
    },
    {
      day: 5,
      date: "2025-07-04",
      total: 0,
      contentData: [],
    },
  ],
};

const PlanDetailProvider = ({ children }) => {
  const [plan, setPlan] = useState(getDetailPlanDummy);
  const [focusDay, setFocusDay] = useState(null);

  const addReservation = useCallback(
    (params) => {
      const { category, cost, title, place } = params;
      const target = plan.reserved[category];
      target.total += Number(cost);

      setPlan((prev) => ({
        ...prev,
        reserved: {
          ...prev.reserved,
          [category]: {
            ...target,
            data: [
              ...target.data,
              {
                id: target.data.length + 1,
                title,
                cost,
                place,
              },
            ],
          },
        },
      }));
    },
    [plan.reserved]
  );

  const addSchedule = useCallback((params) => {
    const { date, cost, place } = params;

    setPlan((prev) => ({
      ...prev,
      data: prev.data.map((day) => {
        if (day.date === date) {
          const length = day.contentData.length;
          const pushData = {
            id: length + 1,
            ...params,
          };

          day.total += Number(cost);
          day.contentData.push(pushData);

          if (length > 0) {
            const lastContent = day.contentData[length - 1];
            const lastPlace = lastContent.place;
            const currentPlace = place;

            console.log("lastPlace", lastPlace);
            console.log("currentPlace", currentPlace);
          }
        }

        return day;
      }),
    }));
  }, []);

  const updatePlan = useCallback(() => {
    console.log("updatePlan");
  }, []);

  const deletePlan = useCallback(() => {
    console.log("deletePlan");
  }, []);

  return (
    <PlanDetailContext.Provider
      value={{
        plan,
        addReservation,
        addSchedule,
        updatePlan,
        deletePlan,
        focusDay,
        setFocusDay,
      }}
    >
      {children}
    </PlanDetailContext.Provider>
  );
};

export default PlanDetailProvider;
