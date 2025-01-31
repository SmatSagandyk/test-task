import { GREEN_API } from "./vars";

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// обычный запрос к API
export const requestApi = async (url: string, options: RequestInit) => {
    const res = await fetch(GREEN_API + url, options);
    return checkResponse(res);
};
