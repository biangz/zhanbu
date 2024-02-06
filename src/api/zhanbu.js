import service from '@/axios';
import qs from 'qs';

export function calculateFourPillars(params = {}) {
    return service({
        url: `/api/v1/eli/calculateFourPillars`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "get",
        params,
    });
}

export function calculateShenKe(data = {}) {
    return service({
        url: `/api/v1/eli/calculateShenKe`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        data: qs.stringify(data),
    });
}
