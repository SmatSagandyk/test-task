import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { TLoginData, TNotice } from "../../utils/types";
import { requestApi } from "../../utils/request-api";
import {
    API_WA_INSTANCE,
    EApiMethod,
    CONTENT_TYPE_DATA,
    ELocalStorageState,
    API_RECEIVE_NOTICE,
    API_DELETE_NOTICE,
    ETypeWebhook,
    EMessageType,
} from "../../utils/vars";
import { MESSAGE_ADD_NEW, MESSAGE_CHANGE_STATUS } from "../chat/actions";

// ====================================
// ===== запрашиваем уведомление ======
// ====================================

export const GET_NOTICE = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const authData: TLoginData = {
            id: localStorage.getItem(ELocalStorageState.ID) || "",
            token: localStorage.getItem(ELocalStorageState.TOKEN) || "",
        };

        const response: TNotice = await requestApi(
            API_WA_INSTANCE + authData.id + API_RECEIVE_NOTICE + authData.token,
            {
                method: EApiMethod.GET,
                headers: {
                    "Content-Type": CONTENT_TYPE_DATA,
                },
            }
        );

        if (response) {
            const result = () => {
                switch (response.body.typeWebhook) {
                    // уведомление о входящих сообщениях и файлах
                    case ETypeWebhook.INCOMING_MESSAGE_RECEIVED:
                        switch (response.body.messageData.typeMessage) {
                            case EMessageType.TEXT:
                                return dispatch(MESSAGE_ADD_NEW(response.body));
                            case EMessageType.EXTENDED:
                                return dispatch(MESSAGE_ADD_NEW(response.body));
                            default:
                                return null;
                        }

                    // уведомление о статусе отправленного сообщения
                    case ETypeWebhook.OUTGOING_MESSAGE_STATUS:
                        return dispatch(
                            MESSAGE_CHANGE_STATUS(
                                response.body.idMessage,
                                response.body.status
                            )
                        );

                    // уведомление об изменении состояния авторизации аккаунта
                    case ETypeWebhook.STATE_INSTANCE_CHANGED:
                        // return Navigate({ to: "/faq" });
                        return null;

                    default:
                        return null;
                }
            };
            result();
            authData.id &&
                authData.token &&
                dispatch(DELETE_NOTICE(response.receiptId));
        } else {
            response === null
                ? authData.id && authData.token && dispatch(GET_NOTICE())
                : console.log("ERROR: ошибка получения уведомления");
        }
    };
};

// ================================
// ===== удаляем уведомление ======
// ================================

type TResult = { result: boolean };

export const DELETE_NOTICE = (receiptId: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const authData: TLoginData = {
            id: localStorage.getItem(ELocalStorageState.ID) || "",
            token: localStorage.getItem(ELocalStorageState.TOKEN) || "",
        };

        const response: TResult = await requestApi(
            API_WA_INSTANCE +
                authData.id +
                API_DELETE_NOTICE +
                authData.token +
                "/" +
                receiptId,
            {
                method: EApiMethod.DELETE,
                headers: {
                    "Content-Type": CONTENT_TYPE_DATA,
                },
            }
        );
        response.result === true
            ? authData.id && authData.token && dispatch(GET_NOTICE())
            : console.log("ERROR: ошибка удаления уведомления");
    };
};
