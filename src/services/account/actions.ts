import {
    AnyAction,
    Dispatch,
    createAction,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { TAccount, TAccountStatus, TLoginData } from "../../utils/types";
import { requestApi } from "../../utils/request-api";
import {
    API_GET_SETTINGS,
    API_GET_STATE_INSTANCE,
    API_WA_INSTANCE,
    EApiMethod,
    CONTENT_TYPE_DATA,
    ELocalStorageState,
} from "../../utils/vars";

const REDUCER_NAME = "account";

// =====================================
// ===== маркер проверки аккаунта ======
// =====================================
export const ACCOUNT_CHECKED = createAction(`${REDUCER_NAME}/checked`);

// ================================
// ===== чекаем пользователя ======
// ================================
export const ACСOUNT_CHECK_AUTH = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        const authData: TLoginData = {
            id: localStorage.getItem(ELocalStorageState.ID) || "",
            token: localStorage.getItem(ELocalStorageState.TOKEN) || "",
        };
        authData.id && authData.token
            ? dispatch(GET_SETTINGS(authData))
            : dispatch(ACCOUNT_CHECKED());

        authData.id && authData.token && dispatch(GET_STATE_INSTANCE(authData));
    };
};

// ===========================================
// ===== запрашиваем настройки аккаунта ======
// ===========================================
type TResult = TLoginData & {
    response: TAccount;
};

export const GET_SETTINGS = createAsyncThunk<TResult, TLoginData>(
    `${REDUCER_NAME}/get_settings`,
    async (authData: TLoginData) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(
            API_WA_INSTANCE + authData.id + API_GET_SETTINGS + authData.token,
            {
                method: EApiMethod.GET,
                headers: {
                    "Content-Type": CONTENT_TYPE_DATA,
                },
            }
        );
        const result = {
            response: response,
            id: authData.id,
            token: authData.token,
        };
        return result;
    }
);

// ========================================
// ===== запрашиваем статус аккаунта ======
// ========================================
export const GET_STATE_INSTANCE = createAsyncThunk<TAccountStatus, TLoginData>(
    `${REDUCER_NAME}/get_state_instance`,
    async (authData: TLoginData) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(
            API_WA_INSTANCE +
                authData.id +
                API_GET_STATE_INSTANCE +
                authData.token,
            {
                method: EApiMethod.GET,
                headers: {
                    "Content-Type": CONTENT_TYPE_DATA,
                },
            }
        );
        return response as TAccountStatus;
    }
);

// =================================
// ===== логаут и чистим стор ======
// =================================
export const LOGOUT = createAction(`${REDUCER_NAME}/logout`);
