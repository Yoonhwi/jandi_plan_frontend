import styles from "./DayDetail.module.css";
import { MdRunCircle } from "react-icons/md";
import { formatPrice } from "@/utils";
import { TiDelete } from "react-icons/ti";
import { LuClipboardPen } from "react-icons/lu";
import { Tooltip } from "@/components";
import { usePlanDetail } from "../PlanDetailContext";
import { useMemo } from "react";

const timeToSeconds = (time) => {
  const [hh, mm, ss] = time.split(":").map(Number);
  return hh * 3600 + mm * 60 + ss;
};

const DayDetail = ({ focus }) => {
  const { itineraries, deleteItinerary } = usePlanDetail();
  console.log("deleteItinerary", deleteItinerary);

  const contentData = useMemo(() => {
    if (!itineraries) return null;
    return itineraries
      .filter((v) => v.date === focus)
      .sort((a, b) => {
        return timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
      });
  }, [focus, itineraries]);

  if (!contentData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.inner_wrapper}>
        <div className={styles.divider}>
          <MdRunCircle size={40} color="var(--color-indigo-400)" />
          <div className={styles.vertical_divider}></div>
        </div>

        <div className={styles.container_right}>
          {contentData.map((v) => {
            console.log("v", v);
            return (
              <div key={v.itineraryId} className={styles.content_wrapper}>
                <div className={styles.dashed} />
                <div className={styles.content_item}>
                  <div className={styles.content_item_des}>
                    <div className={styles.content_item_time}>{v.time}</div>
                    <div className={styles.content_title}>{v.title}</div>
                  </div>

                  <div className={styles.content_update}>
                    <div className={styles.content_cost}>
                      {formatPrice(v.cost)} 원
                    </div>

                    <div className={styles.icon_wrapper}>
                      <Tooltip text={"수정"}>
                        <div className={styles.icon_box}>
                          <LuClipboardPen
                            size={18}
                            color="var(--color-text-dynamic)"
                          />
                        </div>
                      </Tooltip>

                      <Tooltip text={"삭제"}>
                        <div
                          className={styles.icon_box}
                          onClick={() => deleteItinerary(v.itineraryId)}
                        >
                          <TiDelete size={24} color="var(--color-red-500)" />
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayDetail;
