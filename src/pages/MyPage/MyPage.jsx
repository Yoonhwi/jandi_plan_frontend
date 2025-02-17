import { BaseLayout } from "@/layouts";
import styles from "./MyPage.module.css";
import { Button, Modal, ModalContent, ModalTrigger, Slider } from "@/components";
import DetailItem from "./Components/DetailItem";
import { destinationItems, dummy } from "./constants";
import MyInfo from "./Components/MyInfo";

const MyPage = () => {

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.plan_box}>
          <div className={styles.title_box}>
            <p className={styles.title}>민근 님의 Travel Plan</p>
            <Modal>
              <ModalTrigger>
                <Button variant="ghost" size="md">
                  내 정보 수정
                </Button>
              </ModalTrigger>
              <ModalContent>
                <MyInfo />
              </ModalContent>
            </Modal>
          </div>

          <div className={styles.flex_column}>
            <div className={styles.plan_container}>
              {dummy.map((item) => (
                <DetailItem key={item.plan.id} item={item} />
              ))}
            </div>

            <div className={styles.footer}>
              <Button variant="ghost">이전</Button>
              <Button variant="ghost">1</Button>
              <Button variant="ghost">2</Button>
              <Button variant="ghost">3</Button>
              <Button variant="ghost">다음</Button>
            </div>
          </div>
        </div>

        <div className={styles.interest_container}>
          <div className={styles.title_box}>
            <p className={styles.title}>민근 님의 관심 여행지 리스트</p>
            <Button variant="ghost" size="sm">
              관심 여행지 수정하기
            </Button>
          </div>
            <Slider items={destinationItems} type="destination" />
        </div>

        <div className={styles.like_container}>
          <div className={styles.title_box}>
            <p className={styles.title}>좋아요한 플랜</p>
          </div>
          <Slider items={dummy} type="plan" />
          {/* <div className={styles.place_container} >
            {destinationItems.map((item) => (
              <div className={styles.place_box} key={item.name}>
                <img
                  src={item.imgSrc}
                  alt="destination"
                  className={styles.des_img}
                />
                <p className={styles.des_img_title}>{item.name}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </BaseLayout>
  );
};

export default MyPage;
