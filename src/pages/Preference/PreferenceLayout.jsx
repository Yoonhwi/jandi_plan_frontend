import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./PreferenceLayout.module.css";
import Continent from "./Continent/Continent";
import Destination from "./Destination/Destination";

const PreferenceLayout = () => {
    const location = useLocation();


    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div>
                    <Routes location={location}>
                        <Route path="continent"  element={<Continent />} />
                        <Route path="destination"  element={<Destination />} />
                    </Routes>
                </div>
            </div>
        </div>
    );

};

export default PreferenceLayout;