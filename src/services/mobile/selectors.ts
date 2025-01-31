import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/hooks";

// общие
export const getIsMobile = createSelector(
    (store: RootState) => store.mobile,
    (data): boolean => data
);
