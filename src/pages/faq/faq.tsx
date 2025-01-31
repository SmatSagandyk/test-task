import { FC, memo } from "react";
import styles from "./faq.module.scss";
import { useAppSelector } from "../../services/store/hooks";
import {
    getAccountRequestStatus,
    getAccountStatus,
} from "../../services/account/selectors";
import { EAccountStatus, ERequestStatus } from "../../utils/vars";
import { Navigate } from "react-router-dom";
import { getChatListRequestStatus } from "../../services/chat-list/selectors";
import Loading from "../../components/loading/loading";

const FaqPage: FC = () => {
    const isAccountRequestStatus: string = useAppSelector(
        getAccountRequestStatus
    );

    const isChatListRequestStatus: string = useAppSelector(
        getChatListRequestStatus
    );

    const isAuthorized: boolean =
        useAppSelector(getAccountStatus) === EAccountStatus.AUTHORIZED
            ? true
            : false;

    const loading =
        isAccountRequestStatus === ERequestStatus.LOADING ||
        isChatListRequestStatus === ERequestStatus.LOADING
            ? true
            : false;

    const notAuthorized =
        isAccountRequestStatus === ERequestStatus.SUCCESS &&
        isChatListRequestStatus === ERequestStatus.SUCCESS &&
        !isAuthorized
            ? true
            : false;

    return (
        <>
            {loading && <Loading />}

            {notAuthorized ? (
                <section className={styles.section}>
                    <div className="container">
                        <div className={`${styles.inner} anim-open`}>
                            <h3
                                className={`title align-center ${styles.title}`}
                            >
                                Warning
                            </h3>
                            <p className="text align-center">
                                Your instance is not authorized!
                            </p>
                            <p className="text align-center">
                                Go to{" "}
                                <a
                                    className={styles.link}
                                    href="https://green-api.com/docs/before-start/#qr"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    THIS link
                                </a>{" "}
                                to go to the instance authorization FAQ on
                                WhatsApp.
                            </p>
                            <p className="text align-center">
                                Once authorized, you can simply reload this
                                page.
                            </p>
                        </div>
                    </div>
                </section>
            ) : (
                isAuthorized && <Navigate to="/" />
            )}
        </>
    );
};

export default memo(FaqPage);
