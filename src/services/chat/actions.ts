import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { requestApi } from "../../utils/request-api";
import {
    TLoginData, TMessageIncoming, TMessageSending, TMessagesList, TNoticeBody
} from "../../utils/types";
import {
    API_GET_CHAT_HISTORY, API_SEND_MESSAGE, API_WA_INSTANCE, CONTENT_TYPE_DATA, EApiMethod,
    ELocalStorageState, EMessageSender, EMessageStatus, EMessageType
} from "../../utils/vars";

const REDUCER_NAME = "chat";

// ===================================
// ===== тянем список сообщений ======
// ===================================

export const GET_CHAT = createAsyncThunk<TMessagesList, string>(
    `${REDUCER_NAME}/get_chat`,
    async (sendData: string) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const authData: TLoginData = {
            id: localStorage.getItem(ELocalStorageState.ID) || "",
            token: localStorage.getItem(ELocalStorageState.TOKEN) || "",
        };

        const bodySend = { chatId: sendData, count: 1000 };

        const response = await requestApi(
            API_WA_INSTANCE +
            authData.id +
            API_GET_CHAT_HISTORY +
            authData.token,
            {
                method: EApiMethod.POST,
                headers: {
                    "Content-Type": CONTENT_TYPE_DATA,
                },
                body: JSON.stringify(bodySend),
            }
        );
        return response as TMessagesList;
    }
);

// =================================
// ===== отправляем сообщение ======
// =================================

export const MESSAGE_SEND = createAsyncThunk<TMessageIncoming, TMessageSending>(
    `${REDUCER_NAME}/send`,
    async (sendData: TMessageSending) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const authData: TLoginData = {
            id: localStorage.getItem(ELocalStorageState.ID) || "",
            token: localStorage.getItem(ELocalStorageState.TOKEN) || "",
        };

        const response = await requestApi(
            API_WA_INSTANCE + authData.id + API_SEND_MESSAGE + authData.token,
            {
                method: EApiMethod.POST,
                headers: {
                    "Content-Type": CONTENT_TYPE_DATA,
                },
                body: JSON.stringify(sendData),
            }
        );

        const result = {
            idMessage: response.idMessage,
            type: EMessageSender.OUTGOING,
            chatId: sendData.chatId,
            typeMessage: EMessageType.TEXT,
            textMessage: sendData.message,
            statusMessage: EMessageStatus.SENT,
            timestamp: Date.now(),
        };
        return result as TMessageIncoming;
    }
);

// ======================================================
// ===== добавляем новое входящее сообщение в стор ======
// ======================================================

export const MESSAGE_ADD_NEW = createAction(
    `${REDUCER_NAME}/add_new`,
    function prepare(message: TNoticeBody) {
        return {
            payload: {
                type: EMessageSender.INCOMING,
                timestamp: message.timestamp,
                idMessage: message.idMessage,
                chatId: message.senderData?.chatId as string,
                senderId: message.senderData?.sender as string,
                senderName: message.senderData?.senderName as string,
                typeMessage: message.messageData.typeMessage,
                textMessage:
                    (message.messageData.textMessageData
                        ?.textMessage as string) ||
                    (message.messageData.extendedTextMessageData
                        ?.text as string),
            },
        };
    }
);

// ====================================
// ===== меняем статус сообщения ======
// ====================================

export const MESSAGE_CHANGE_STATUS = createAction(
    `${REDUCER_NAME}/change_status`,
    function prepare(id: string, status: string) {
        return {
            payload: {
                id,
                status,
            },
        };
    }
);

// ====================================
// ===== чистим список сообщений ======
// ====================================
export const CHAT_RESET = createAction(`${REDUCER_NAME}/reset`);
