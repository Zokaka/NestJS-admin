/* 成功返回 */
export function successRes(data, msg) {
    return {
        code: 0,
        data,
        msg
    }
}

/* 失败返回 */
export function errorRes(msg) {
    return {
        code: -1,
        msg
    }
}

// 返回层
export function wrapperResponse(p, msg) {
    return p
        .then((data) => successRes(data, msg))
        .catch((err) => errorRes(err.message))
}