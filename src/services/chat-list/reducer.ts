import { createReducer } from "@reduxjs/toolkit";
import {
    CHECK_USER_NOT_USE_WA,
    CHECK_USER_СLEAR,
    GET_CHAT_LIST,
    СHECK_NEW_DIALOG,
} from "./actions";
import { ERequestStatus } from "../../utils/vars";
import { TChatList } from "../../utils/types";

const initialState = {
    chatList: null as unknown as TChatList,
    request_status: ERequestStatus.INITIAL,
    check_status: ERequestStatus.INITIAL,
    check_user_not_use_wa: false,
};

export const chatListReducer = createReducer(initialState, (builder) => {
    builder

        // ===============================
        // ===== тянем список чатов ======
        // ===============================

        // Вызывается прямо перед выполнением запроса
        .addCase(GET_CHAT_LIST.pending, (state) => {
            state.request_status = ERequestStatus.LOADING;
        })

        // Вызывается в том случае если запрос успешно выполнился
        .addCase(GET_CHAT_LIST.fulfilled, (state, action) => {
            state.chatList = action.payload;
            state.request_status = ERequestStatus.SUCCESS;
        })

        // Вызывается в случае ошибки
        .addCase(GET_CHAT_LIST.rejected, (state) => {
            state.chatList = initialState.chatList;
            state.request_status = ERequestStatus.ERROR;
        })

        // ===============================================================
        // ===== проверяем наличие аккаунта WhatsApp у нового диалога ======
        // ===============================================================

        // Вызывается прямо перед выполнением запроса
        .addCase(СHECK_NEW_DIALOG.pending, (state) => {
            state.check_status = ERequestStatus.LOADING;
            state.check_user_not_use_wa = false;
        })

        // Вызывается в том случае если запрос успешно выполнился
        .addCase(СHECK_NEW_DIALOG.fulfilled, (state, action) => {
            if (
                action.payload !== null &&
                !state.chatList.map((e) => e.id).includes(action.payload.id)
            )
                state.chatList = [action.payload, ...state.chatList];
            state.check_status = ERequestStatus.SUCCESS;
        })

        // Вызывается в случае ошибки
        .addCase(СHECK_NEW_DIALOG.rejected, (state) => {
            state.check_status = ERequestStatus.ERROR;
        })

        // ========================================
        // ===== пользователя нет в WhatsApp ======
        // ========================================
        .addCase(CHECK_USER_NOT_USE_WA, (state) => {
            state.check_user_not_use_wa = true;
        })

        // ==========================
        // ===== чистим маркер ======
        // ==========================
        .addCase(CHECK_USER_СLEAR, (state) => {
            state.check_status = ERequestStatus.INITIAL;
            state.check_user_not_use_wa = false;
        })

        .addDefaultCase((state) => state);
});
