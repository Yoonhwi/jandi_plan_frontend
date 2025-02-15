import { useCallback, useState } from "react";
import { PlanDetailContext } from "./PlanDetailContext";

const getDetailPlanDummy = {
  title: "오사카 가자아",
  country: "일본",
  destination: "오사카",
  startDate: "2025.06.30",
  endDate: "2025.07.04",
  peopleCount: 1,
  latitude: 34.6937,
  longitude: 135.5023,
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
      contentData: [],
      transportationData: [],
    },
    {
      day: 2,
      date: "2025-07-01",
      total: 0,
      contentData: [],
      transportationData: [],
    },
    {
      day: 3,
      date: "2025-07-02",
      total: 0,
      contentData: [],
      transportationData: [],
    },
    {
      day: 4,
      date: "2025-07-03",
      total: 0,
      contentData: [],
      transportationData: [],
    },
    {
      day: 5,
      date: "2025-07-04",
      total: 0,
      contentData: [],
      transportationData: [],
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
