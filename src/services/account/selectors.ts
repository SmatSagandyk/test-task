import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/hooks";
import { TAccount } from "../../utils/types";

// ==========================
// ===== маркер запроса =====
// ==========================
export const getIsAuthChecked = createSelector(
    (store: RootState): boolean => store.account.isAuthChecked,
    (data): boolean => data
);

// ===================
// ===== аккаунт =====
// ===================
const storeAccount = (store: RootState): TAccount => store.account.account;

export const getAccount = createSelector(
    storeAccount,
    (data): TAccount => data
);
export const getAccountWid = createSelector(
    (store: RootState): TAccount => store.account.account,
    (data): string => data.wid
);

// ===========================
// ===== статус аккаунта =====
// ===========================
export const getAccountStatus = createSelector(
    (store: RootState): string => store.account.account_status,
    (data): string => data
);

// ================================
// ===== статус запроса к API =====
// ================================
export const getAccountRequestStatus = createSelector(
    (store: RootState): string => store.account.request_status,
    (data): string => data
);
