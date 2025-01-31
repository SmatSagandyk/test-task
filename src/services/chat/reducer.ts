import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { ERequestStatus } from "../../utils/vars";
import { TMessageIncoming, TMessagesList } from "../../utils/types";
import {
    CHAT_RESET,
    GET_CHAT,
    MESSAGE_ADD_NEW,
    MESSAGE_CHANGE_STATUS,
    MESSAGE_SEND,
} from "./actions";

const initialState = {
    messages: [] as unknown as TMessagesList,
    request_status: ERequestStatus.INITIAL,
    send_status: ERequestStatus.INITIAL,
};

export const chatReducer = createReducer(initialState, (builder) => {
    builder

        // ===================================
        // ===== тянем список сообщений ======
        // ===================================

        // Вызывается прямо перед выполнением запроса
        .addCase(GET_CHAT.pending, (state) => {
            state.request_status = ERequestStatus.LOADING;
        })

        // Вызывается в том случае если запрос успешно выполнился
        .addCase(GET_CHAT.fulfilled, (state, action) => {
            state.messages = action.payload;
            state.request_status = ERequestStatus.SUCCESS;
        })

        // Вызывается в случае ошибки
        .addCase(GET_CHAT.rejected, (state) => {
            state.messages = initialState.messages;
            state.request_status = ERequestStatus.ERROR;
        })

        // =================================
        // ===== отправляем сообщение ======
        // =================================

        // Вызывается прямо перед выполнением запроса
        .addCase(MESSAGE_SEND.pending, (state) => {
            state.send_status = ERequestStatus.LOADING;
        })

        // Вызывается в том случае если запрос успешно выполнился
        .addCase(MESSAGE_SEND.fulfilled, (state, action) => {
            state.messages = [action.payload, ...state.messages];
            state.send_status = ERequestStatus.SUCCESS;
        })

        // Вызывается в случае ошибки
        .addCase(MESSAGE_SEND.rejected, (state) => {
            state.send_status = ERequestStatus.ERROR;
        })

        // ======================================================
        // ===== добавляем новое входящее сообщение в стор ======
        // ======================================================
        .addCase(
            MESSAGE_ADD_NEW,
            (state, action: PayloadAction<TMessageIncoming>) => {
                if (
                    state.messages[0] &&
                    state.messages[0].chatId === action.payload.chatId
                ) {
                    state.messages = [action.payload, ...state.messages];
                } else return state;
            }
        )

        // ====================================
        // ===== меняем статус сообщения ======
        // ====================================
        .addCase(
            MESSAGE_CHANGE_STATUS,
            (state, action: PayloadAction<{ id: string; status: string }>) => {
                state.messages.map((el: TMessageIncoming) =>
                    el.idMessage === action.payload.id
                        ? (el.statusMessage = action.payload.status)
                        : el.statusMessage
                );
            }
        )

        // ====================================
        // ===== чистим список сообщений ======
        // ====================================
        .addCase(CHAT_RESET, () => initialState)

        .addDefaultCase((state) => state);
});
