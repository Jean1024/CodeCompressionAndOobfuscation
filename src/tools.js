
function createForm(params) {
    let f = new FormData()
    let keys = Object.keys(params)
    keys.forEach(key => {
        f.append(key, params[key])
    })
    return f
}

// https://github.com/github/fetch
// 如果有params参数，则用POST。
export function fetchJSON(url, params) {
    let opts = {
        credentials: 'same-origin',
        // cache: 'no-cache'
    }
    if (params) {
        opts.method = 'POST'
        opts.body = createForm(params)
    }
    return new Promise((resolve, reject) => {
        fetch(url, opts)
            .then(res => res.json())
            .then(data => {
                if (data.code === 213) {
                    // TODO `#/login?err=${data.reason}`
                    location.replace('#/login')
                } else {
                    resolve(data)
                }
            })
            .catch(err => {
                // TODO 404
                // alert('404 服务器不可访问')
                // location.replace('#/login?err=服务器不可访问')
                reject(err)
            })
    })
}


export function checkFlash() {
    if (typeof window.ActiveXObject !== 'undefined') {
        return !!new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
    } else {
        return !!navigator.plugins['Shockwave Flash']
    }
}