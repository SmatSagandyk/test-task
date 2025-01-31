import { FC, memo } from "react";
import styles from "./login.module.scss";
import Login from "../../components/auth/login";

const LoginPage: FC = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={`${styles.inner} anim-open`}>
                    <h3 className={`title align-center ${styles.title}`}>
                        Authorization
                    </h3>
                    <Login />
                </div>
            </div>
        </section>
    );
};

export default memo(LoginPage);
