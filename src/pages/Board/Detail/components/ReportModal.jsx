import styles from "./ReportModal.module.css";
import { useState } from "react";
import { Button } from "@/components";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";
import { buildPath } from "@/utils";

const ReportModal = ({id,getUrl}) => {
    const [reportText, setReportText] = useState("");
      const { createToast } = useToast();
      const { fetchData } = useAxios();

    const handleReport = () => {
        if (reportText.trim() === "") {
            createToast({ type: "error", text: "신고 내용을 입력해주세요." });
            return;
          }
        let setUrl="";
        if(getUrl==="boardReport"){
            setUrl=buildPath(APIEndPoints.BOARD_REPORTS, {id});
        }else if(getUrl==="commentReport"){
            setUrl=buildPath(APIEndPoints.COMMENTS_REPORTS, {id});
        }
        fetchData({
        method: "POST",
        url: setUrl,
        data: { 
            contents: reportText 
        },
        }).then((res) => {
            console.log("성공")
            setReportText("");
        }).catch((err) => {
            createToast({ type: "error", text: err.data.message });
        });
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>신고</h2>
            <textarea className={styles.content} rows="10" value={reportText} onChange={(e) => setReportText(e.target.value)} placeholder="신고 내용을 작성하세요." />
            <Button type="submit" onClick={handleReport}>신고하기</Button>
        </div>
    );
}

export default ReportModal;