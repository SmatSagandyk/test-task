import { FC, memo, useEffect } from "react";
import styles from "./home.module.scss";
import Button from "../../components/button/button";
import {
    Navigate,
    Outlet,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import Contact from "../../components/contact/contact";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import {
    getAccountRequestStatus,
    getAccountStatus,
} from "../../services/account/selectors";
import { EAccountStatus, ERequestStatus } from "../../utils/vars";
import Loading from "../../components/loading/loading";
import {
    getChatList,
    getChatListRequestStatus,
} from "../../services/chat-list/selectors";
import { GET_CHAT_LIST } from "../../services/chat-list/actions";
import { TChatElement, TChatList } from "../../utils/types";
import { GET_NOTICE } from "../../services/notices/actions";
import { getIsMobile } from "../../services/mobile/selectors";

const HomePage: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const isAccountRequestStatus: string = useAppSelector(
        getAccountRequestStatus
    );

    const isAuthorized: boolean =
        useAppSelector(getAccountStatus) === EAccountStatus.AUTHORIZED
            ? true
            : false;

    const isChatListRequestStatus: string = useAppSelector(
        getChatListRequestStatus
    );

    const loading =
        isAccountRequestStatus === ERequestStatus.LOADING ||
        isChatListRequestStatus === ERequestStatus.LOADING
            ? true
            : false;

    const loaded =
        isAccountRequestStatus === ERequestStatus.SUCCESS &&
        isChatListRequestStatus === ERequestStatus.SUCCESS;

    const loadingError =
        isAccountRequestStatus === ERequestStatus.ERROR ||
        isChatListRequestStatus === ERequestStatus.ERROR;

    const chatList: TChatList = useAppSelector(getChatList);

    // тянем список чатов
    useEffect(() => {
        isAccountRequestStatus === ERequestStatus.SUCCESS &&
            dispatch(GET_CHAT_LIST());
    }, [dispatch, isAccountRequestStatus]);

    // тянем уведомления
    useEffect(() => {
        isChatListRequestStatus === ERequestStatus.SUCCESS &&
            dispatch(GET_NOTICE());
    }, [dispatch, isChatListRequestStatus]);

    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = () => {
        navigate("/add", { state: { backgroundLocation: location } });
    };

    return (
        <>
            {loading && <Loading />}
            {loadingError && <Loading>Loading error</Loading>}

            {loaded && isAuthorized ? (
                <section className={styles.section}>
                    <div className={`container ${styles.container}`}>
                        <div
                            className={`${styles.inner} ${
                                isMobile ? styles.mobile : ""
                            } anim-open`}
                        >
                            {isMobile && id ? (
                                ""
                            ) : (
                                <div className={styles.contacts}>
                                    <div
                                        className={`${styles.contacts__list} custom-scroll`}
                                    >
                                        <div className={styles.contacts__inner}>
                                            {chatList.map(
                                                (el: TChatElement) => (
                                                    <Contact
                                                        contact={el}
                                                        key={el.id}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <Button onClick={() => handleClick()}>
                                        New dialog
                                    </Button>
                                </div>
                            )}
                            {(!isMobile || id) && (
                                <div className={styles.chat}>
                                    <Outlet />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            ) : (
                loaded && !isAuthorized && <Navigate to="/faq" />
            )}
        </>
    );
};

export default memo(HomePage);
