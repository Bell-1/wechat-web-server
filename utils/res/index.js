const errStatus = require('./status.js')

function successSend(data, msg) {
    const res = {
        code: 1,
        data,
        msg,
    }
    this.response.body = res;
    return res;
}

function failSend(code = -500, data) {
    const res = {
        code,
        msg: errStatus[code] || '',
        data,
    }
    if (code <= -400) {
        this.response.status = -code;
    }
    this.response.body = res;
    return res;
}

module.exports = {
    successSend,
    failSend,
}