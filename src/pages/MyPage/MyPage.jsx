import { BaseLayout } from "@/layouts";
import styles from "./MyPage.module.css";
import {
  Button,
  Modal,
  ModalContent,
  ModalTrigger,
  Slider,
} from "@/components";
import { destinationItems, dummy } from "./constants";
import { useAuth } from "@/contexts";
import { useAxios } from "@/hooks";
import { useCallback, useEffect } from "react";
import { APIEndPoints } from "@/constants";
import MyPlan from "./MyPlan/MyPlan";
import MyInfo from "./MyInfo/MyInfo";

const MyPage = () => {
  const { user } = useAuth();
  const { fetchData: getMyPlan } = useAxios();

  const accessToken = localStorage.getItem("access-token");

  const getMyPlanList = useCallback(async () => {
    await getMyPlan({
      url: APIEndPoints.TRIP_MY,
      method: "GET",
      params: {
        page: 0,
        size: 10,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, [accessToken, getMyPlan]);

  useEffect(() => {
    getMyPlanList();
  }, [getMyPlanList]);

  if (!user) return <p>로그인이 필요합니다.</p>;
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.main_title_box}>
          <p className={styles.main_title}>{user.username}님, 반갑습니다!</p>
          <Modal>
            <ModalTrigger>
              <Button variant="ghost" size="lg">
                내 정보 수정
              </Button>
            </ModalTrigger>
            <ModalContent>
              <MyInfo user={user} />
            </ModalContent>
          </Modal>
        </div>

        <MyPlan />

        <div className={styles.interest_container}>
          <div className={styles.title_box}>
            <p className={styles.title}>관심 여행지 리스트</p>
            <Button variant="ghost" size="sm">
              관심 여행지 수정하기
            </Button>
          </div>
          <Slider items={destinationItems} size="sm">
            {(item) => (
              <>
                <div
                  className={styles.img_container}
                  style={{
                    backgroundImage: `url(${item.imgSrc})`,
                  }}
                />
                <div className={styles.dest_container}>
                  <div className={styles.dest_title}>
                    <p className={styles.dest_name}>{item.name}</p>
                  </div>
                </div>
              </>
            )}
          </Slider>
        </div>

        <div className={styles.like_container}>
          <div className={styles.title_box}>
            <p className={styles.title}>좋아요한 플랜</p>
          </div>
          <Slider items={dummy} size="sm">
            {(item) => (
              <>
                <div
                  className={styles.img_container}
                  style={{
                    backgroundImage: `url(${item.plan.profile_url})`,
                  }}
                />
                <div className={styles.plan_container}>
                  <div className={styles.plan_title}>
                    <p className={styles.plan_name}>{item.plan.title}</p>
                    <p className={styles.plan_destination}>
                      {item.plan.destination}
                    </p>
                  </div>
                </div>
              </>
            )}
          </Slider>
        </div>
      </div>
    </BaseLayout>
  );
};

export default MyPage;
