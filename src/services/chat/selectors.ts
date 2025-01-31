import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/hooks";
import { TMessagesList } from "../../utils/types";

// ========================
// ===== список сообщений =====
// ========================
export const getMessagesList = createSelector(
    (store: RootState): TMessagesList => store.chat.messages,
    (data): TMessagesList => data
);

// ================================
// ===== статус запроса к API =====
// ================================
export const getMessagesListRequestStatus = createSelector(
    (store: RootState): string => store.chat.request_status,
    (data): string => data
);
