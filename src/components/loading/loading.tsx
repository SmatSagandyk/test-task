import { FC, PropsWithChildren, memo, useEffect, useState } from "react";
import styles from "./loading.module.scss";

const useAnim = () => {
    const [toogle, setToogle] = useState("dots--animate" || null);
    useEffect(() => {
        let interval = setInterval(() => {
            setToogle("");
            setInterval(() => {
                setToogle("dots--animate");
            }, 500);
        }, 2500);
        return () => clearInterval(interval);
    }, [toogle]);
    return toogle;
};
// ===чисто ради эксперимента===

const Loading: FC<PropsWithChildren> = ({ children }) => {
    const toogle = useAnim();

    return (
        <div className={styles.loading}>
            <h1 className="title">
                {children ? children : "Loading"}
                <div className={`${styles.dots} ${styles[toogle]}`}>
                    <span className={`${styles.dot} ${styles.z}`}></span>
                    <span className={`${styles.dot} ${styles.f}`}></span>
                    <span className={`${styles.dot} ${styles.s}`}></span>
                    <span className={`${styles.dot} ${styles.t}`}>
                        <span className={`${styles.dot} ${styles.l}`}></span>
                    </span>
                </div>
            </h1>
        </div>
    );
};

export default memo(Loading);
