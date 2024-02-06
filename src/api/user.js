import service from '@/axios';
import qs from 'qs';

export function googleLogin(data = {}) {
    return service({
        url: `/api/v1/user/handle_google_callback`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        data: qs.stringify(data),
    });
}

export function loginUserInfo(params = {}) {
    return service({
        url: `/api/v1/user/login_user_info`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "get",
        params,
    });
}

export function coinList(data = {}) {
    return service({
        url: `/api/v1/eli/web3/coinList`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        data: qs.stringify(data),
    });
}

export function initTypeList(data = {}) {
    return service({
        url: `/api/v1/eli/sys/catalog`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        data: qs.stringify(data),
    });
}