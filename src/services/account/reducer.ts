import { createReducer } from "@reduxjs/toolkit";
import {
    GET_SETTINGS,
    GET_STATE_INSTANCE,
    LOGOUT,
    ACCOUNT_CHECKED,
} from "./actions";
import { ELocalStorageState, ERequestStatus } from "../../utils/vars";
import { TAccount } from "../../utils/types";

const initialState = {
    isAuthChecked: false,
    account: null as unknown as TAccount,
    account_status: "",
    request_status: ERequestStatus.INITIAL,
};

export const accountReducer = createReducer(initialState, (builder) => {
    builder

        // =====================================
        // ===== маркер проверки аккаунта ======
        // =====================================
        .addCase(ACCOUNT_CHECKED, (state) => ({
            ...state,
            isAuthChecked: true,
        }))

        // ===========================================
        // ===== запрашиваем настройки аккаунта ======
        // ===========================================

        // Вызывается прямо перед выполнением запроса
        .addCase(GET_SETTINGS.pending, (state) => ({
            ...state,
            request_status: ERequestStatus.LOADING,
        }))

        // Вызывается в том случае если запрос успешно выполнился
        .addCase(GET_SETTINGS.fulfilled, (state, action) => {
            // =================================================================
            // да, данные доступа в сторадже хранить не надо..
            // но исходя из минимальной задачи и отсуствия JWT-авторизации -
            // для тестового задания вполне рабочий вариант,
            // чтобы "показать" жизнь приложения между сессиями
            // =================================================================
            localStorage.setItem(ELocalStorageState.ID, action.payload.id);
            localStorage.setItem(
                ELocalStorageState.TOKEN,
                action.payload.token
            );
            return {
                ...state,
                isAuthChecked: true,
                account: action.payload.response,
                request_status: ERequestStatus.SUCCESS,
            };
        })

        // Вызывается в случае ошибки
        .addCase(GET_SETTINGS.rejected, (state) => {
            localStorage.removeItem(ELocalStorageState.ID);
            localStorage.removeItem(ELocalStorageState.TOKEN);
            return {
                ...state,
                isAuthChecked: true,
                account: initialState.account,
                account_status: initialState.account_status,
                request_status: ERequestStatus.ERROR,
            };
        })

        // ========================================
        // ===== запрашиваем статус аккаунта ======
        // ========================================

        // Вызывается в том случае если запрос успешно выполнился
        .addCase(GET_STATE_INSTANCE.fulfilled, (state, action) => ({
            ...state,
            account_status: action.payload.stateInstance,
        }))

        // Вызывается в случае ошибки
        .addCase(GET_STATE_INSTANCE.rejected, (state) => {
            localStorage.removeItem(ELocalStorageState.ID);
            localStorage.removeItem(ELocalStorageState.TOKEN);
            return {
                ...state,
                account: initialState.account,
                account_status: initialState.account_status,
                request_status: ERequestStatus.ERROR,
            };
        })

        // =================================
        // ===== логаут и чистим стор ======
        // =================================
        .addCase(LOGOUT, (state) => {
            localStorage.removeItem(ELocalStorageState.ID);
            localStorage.removeItem(ELocalStorageState.TOKEN);
            return {
                ...state,
                account: initialState.account,
                account_status: initialState.account_status,
                request_status: initialState.request_status,
            };
        })

        .addDefaultCase((state) => state);
});
