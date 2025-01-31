import { FC, memo, useEffect } from "react";
import styles from "./chat.module.scss";
import Button from "../../components/button/button";
import { useForm } from "../../utils/hooks";
import Input from "../../components/input/input";
import { FormInputType, EMessageType, ERequestStatus } from "../../utils/vars";
import Message from "../../components/message/message";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import {
    CHAT_RESET,
    GET_CHAT,
    MESSAGE_SEND,
} from "../../services/chat/actions";
import { useParams } from "react-router-dom";
import {
    getMessagesList,
    getMessagesListRequestStatus,
} from "../../services/chat/selectors";
import Loading from "../../components/loading/loading";
import {
    TMessageIncoming,
    TMessageSending,
    TMessagesList,
} from "../../utils/types";
import { getIsMobile } from "../../services/mobile/selectors";

const ChatPage: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const requestStatus: string = useAppSelector(getMessagesListRequestStatus);
    const messages: TMessagesList = useAppSelector(getMessagesList);

    // работаем с формой
    const { formState, handleChange, handleReset } = useForm();

    // тянем список сообщений
    useEffect(() => {
        dispatch(GET_CHAT(id as string));
        return () => {
            dispatch(CHAT_RESET());
        };
    }, [dispatch, id]);

    // отправляем собщение
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (formState.message) {
            const sendData: TMessageSending = {
                chatId: id as string,
                message: formState.message,
            };
            handleReset(e);
            dispatch(MESSAGE_SEND(sendData));
        }
    };

    const isLoading = false;
    return (
        <>
            <section className={styles.chat}>
                <p className={isMobile ? "title mobile" : "title"}>{id}</p>
                <div className={styles.chat__list}>
                    <div className={`${styles.chat__inner} custom-scroll`}>
                        <>
                            {requestStatus === ERequestStatus.LOADING && (
                                <Loading />
                            )}
                            {requestStatus === ERequestStatus.SUCCESS &&
                                messages[0] &&
                                messages.map((el: TMessageIncoming) =>
                                    el.typeMessage === EMessageType.TEXT ||
                                    el.typeMessage === EMessageType.EXTENDED ? (
                                        <Message
                                            key={el.idMessage}
                                            message={el || ""}
                                        />
                                    ) : null
                                )}
                            {requestStatus === ERequestStatus.SUCCESS &&
                                !messages[0] && (
                                    <p
                                        className={`${styles.no_messages} title`}
                                    >
                                        No messages
                                    </p>
                                )}
                        </>
                    </div>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input
                        onChange={handleChange}
                        value={formState.message}
                        name={FormInputType.MESSAGE}
                    />
                    <Button
                        blocked={
                            isLoading ? true : !formState.message ? true : false
                        }
                        submit
                        mobile
                    >
                        {isLoading ? (
                            "Sending"
                        ) : (
                            <svg
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                                preserveAspectRatio="xMidYMid meet"
                                className=""
                                version="1.1"
                                x="0px"
                                y="0px"
                                enableBackground="new 0 0 24 24"
                                // xml:space="preserve"
                            >
                                <path
                                    fill="currentColor"
                                    d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                                ></path>
                            </svg>
                        )}
                    </Button>
                </form>
            </section>
        </>
    );
};

export default memo(ChatPage);
