import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { requestApi } from "../../utils/request-api";
import { TChatList, TCheckWhatsapp, TLoginData } from "../../utils/types";
import {
    API_CHECK_WHATSAPP, API_GET_CHATS, API_WA_INSTANCE, CONTENT_TYPE_DATA, EApiMethod,
    ELocalStorageState
} from "../../utils/vars";

const REDUCER_NAME = "chat_list";

// ===============================
// ===== тянем список чатов ======
// ===============================

export const GET_CHAT_LIST = createAsyncThunk<TChatList>(
    `${REDUCER_NAME}/get_chat_list`,
    async () => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const authData: TLoginData = {
            id: localStorage.getItem(ELocalStorageState.ID) || "",
            token: localStorage.getItem(ELocalStorageState.TOKEN) || "",
        };
        const response = await requestApi(
            API_WA_INSTANCE + authData.id + API_GET_CHATS + authData.token,
            {
                method: EApiMethod.GET,
                headers: {
                    "Content-Type": CONTENT_TYPE_DATA,
                },
            }
        );
        return response as TChatList;
    }
);

// ===============================================================
// ===== проверяем наличие аккаунта WhatsApp нового диалога ======
// ===============================================================

type TData = { phoneNumber: number; id: string; name: string; };

export const СHECK_NEW_DIALOG = createAsyncThunk(
    `${REDUCER_NAME}/check_new_dialog`,
    async (sendData: TData, { dispatch }) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const authData: TLoginData = {
            id: localStorage.getItem(ELocalStorageState.ID) || "",
            token: localStorage.getItem(ELocalStorageState.TOKEN) || "",
        };
        const response: TCheckWhatsapp = await requestApi(
            API_WA_INSTANCE + authData.id + API_CHECK_WHATSAPP + authData.token,
            {
                method: EApiMethod.POST,
                headers: {
                    "Content-Type": CONTENT_TYPE_DATA,
                },
                body: JSON.stringify({ phoneNumber: sendData.phoneNumber }),
            }
        );

        if (response) {
            const result = () => {
                switch (response.existsWhatsapp) {
                    // пользователь есть в Whatsapp
                    case true:
                        return {
                            archive: false,
                            id: sendData.id,
                            notSpam: true,
                            ephemeralExpiration: 0,
                            ephemeralSettingTimestamp: 0,
                            name: sendData.name,
                        };

                    // пользователя нет в Whatsapp
                    case false:
                        dispatch(CHECK_USER_NOT_USE_WA());
                        return null;

                    default:
                        return null;
                }
            };

            return result();
        } else {
            console.log("ERROR: ошибка выполнения запроса");
            return null;
        }
    }
);

// ========================================
// ===== пользователя нет в WhatsApp ======
// ========================================

export const CHECK_USER_NOT_USE_WA = createAction(
    `${REDUCER_NAME}/user_not_use_wa`
);

// ==========================
// ===== чистим маркер ======
// ==========================

export const CHECK_USER_СLEAR = createAction(
    `${REDUCER_NAME}/user_check_clear`
);
