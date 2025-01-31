import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/hooks";
import { TChatList } from "../../utils/types";

// ========================
// ===== список чатов =====
// ========================
export const getChatList = createSelector(
    (store: RootState): TChatList => store.chatList.chatList,
    (data): TChatList => data
);

// ===========================================
// ===== статус запроса к API [chatlist] =====
// ===========================================
export const getChatListRequestStatus = createSelector(
    (store: RootState): string => store.chatList.request_status,
    (data): string => data
);

// ========================================
// ===== статус запроса к API [check] =====
// ========================================
export const getCheckRequestStatus = createSelector(
    (store: RootState): string => store.chatList.check_status,
    (data): string => data
);

// =====================================================
// ===== маркер пользуется ли запрощенный номер WA =====
// =====================================================
export const getCheckUserNotUseWA = createSelector(
    (store: RootState): boolean => store.chatList.check_user_not_use_wa,
    (data): boolean => data
);
