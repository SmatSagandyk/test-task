import { FC, memo, useCallback, useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { getIsMobile } from "../../services/mobile/selectors";
import { MOBILE_TURN_OFF, MOBILE_TURN_ON } from "../../services/mobile/actions";
import {
    MOBILE_BREAKPOINT,
    ID_PATH,
    _ALL_PATH,
    _HOME_PATH,
    _LOGIN_PATH,
    _FAQ_PATH,
    _ADD_PATH,
} from "../../utils/vars";
import {
    ChatPage,
    ErrorNotFoundPage,
    FaqPage,
    HomePage,
    LoginPage,
    NotSelectedChatPage,
} from "../../pages";
import Header from "../header/header";
import { ACСOUNT_CHECK_AUTH } from "../../services/account/actions";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import Modal from "../modals/modal";
import NewDialogForm from "../new-dialog-form/new-dialog-form";
import { CHECK_USER_СLEAR } from "../../services/chat-list/actions";

const App: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();

    // меняем стор при проходждении брейкпойнта
    const resizeFunc = useCallback(() => {
        window.innerWidth <= MOBILE_BREAKPOINT && !isMobile
            ? dispatch(MOBILE_TURN_ON())
            : window.innerWidth > MOBILE_BREAKPOINT &&
              isMobile &&
              dispatch(MOBILE_TURN_OFF());
    }, [dispatch, isMobile]);

    // перед рендером надо узнать разрешение экрана
    useLayoutEffect(() => {
        resizeFunc();
    }, [resizeFunc]);

    // вешаем лисенер на ресайз
    useEffect(() => {
        window.addEventListener("resize", resizeFunc, { passive: true });

        // снимаем лисенер на ресайз
        return () => {
            window.removeEventListener("resize", resizeFunc);
        };
    });

    // проверяем пользователя
    useEffect(() => {
        dispatch(ACСOUNT_CHECK_AUTH());
    }, [dispatch]);

    // для модалки
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };
    const navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
        dispatch(CHECK_USER_СLEAR());
    };

    return (
        <main>
            <Header />
            {/* основные роуты */}
            <Routes location={state?.backgroundLocation || location}>
                <Route
                    path={_HOME_PATH}
                    element={<OnlyAuth component={<HomePage />} />}
                >
                    <Route
                        index
                        element={
                            <OnlyAuth component={<NotSelectedChatPage />} />
                        }
                    />
                    <Route
                        path={ID_PATH}
                        element={<OnlyAuth component={<ChatPage />} />}
                    />
                </Route>
                <Route
                    path={_LOGIN_PATH}
                    element={<OnlyUnAuth component={<LoginPage />} />}
                />
                <Route
                    path={_FAQ_PATH}
                    element={<OnlyAuth component={<FaqPage />} />}
                />
                <Route path={_ALL_PATH} element={<ErrorNotFoundPage />} />
            </Routes>

            {/* модалки */}
            {state?.backgroundLocation && (
                <Routes>
                    <Route
                        path={_ADD_PATH}
                        element={
                            <OnlyAuth
                                component={
                                    <Modal closeModal={() => closeModal()}>
                                        <NewDialogForm />
                                    </Modal>
                                }
                            />
                        }
                    />
                </Routes>
            )}
        </main>
    );
};

export default memo(App);
