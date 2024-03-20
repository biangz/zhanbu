import service from '@/axios';
import qs from 'qs';

export function preOrder(data = {}) {
    return service({
        url: `/api/v1/order/pre_order`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        data: qs.stringify(data),
    });
}

export function calculateShenKeOrder(data = {}) {
    return service({
        url: `/api/v1/order/calculateShenKeOrder`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        data: qs.stringify(data),
    });
}

export function getResult(data = {}) {
    return service({
        url: `/api/v1/order/get_result`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        data: qs.stringify(data),
    });
}