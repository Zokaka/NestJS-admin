export function successRes(data, msg) {
    return {
        code: 0,
        data,
        msg
    }
}

export function errorRes(msg) {
    return {
        code: -1,
        msg
    }
}