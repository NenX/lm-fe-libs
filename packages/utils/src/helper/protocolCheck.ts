type NoArgVoidFunc = () => void
function _registerEvent(target: typeof window, eventType: string, cb: EventListenerOrEventListenerObject) {
    if (target.addEventListener) {
        target.addEventListener(eventType, cb);
        return {
            remove: function () {
                target.removeEventListener(eventType, cb);
            }
        };
    } else {
        //@ts-ignore
        target.attachEvent(eventType, cb);
        return {
            remove: function () {
                //@ts-ignore
                target.detachEvent(eventType, cb);
            }
        };
    }
}

function _createHiddenIframe(target: HTMLElement, uri: string) {
    var iframe = document.createElement("iframe");
    iframe.src = uri;
    iframe.id = "hiddenIframe";
    iframe.style.display = "none";
    target.appendChild(iframe);

    return iframe;
}

function openUriWithHiddenFrame(uri: string, failCb: NoArgVoidFunc, successCb: NoArgVoidFunc) {

    var timeout = setTimeout(function () {
        failCb();
        handler.remove();
    }, 1000);

    var iframe = document.querySelector("#hiddenIframe");
    if (!iframe) {
        iframe = _createHiddenIframe(document.body, "about:blank");
    }

    var handler = _registerEvent(window, "blur", onBlur);

    function onBlur() {
        clearTimeout(timeout);
        handler.remove();
        successCb();
    }
    //@ts-ignore
    iframe.contentWindow.location.href = uri;
}

function openUriWithTimeoutHack(uri: string, failCb: NoArgVoidFunc, successCb: NoArgVoidFunc) {

    var timeout = setTimeout(function () {
        failCb();
        handler.remove();
    }, 1000);

    // handle page running in an iframe (blur must be registered with top level window)
    var target = window;
    while (target != target.parent) {
        //@ts-ignore
        target = target.parent;
    }

    var handler = _registerEvent(target, "blur", onBlur);

    function onBlur() {
        clearTimeout(timeout);
        handler.remove();
        successCb();
    }

    //@ts-ignore
    window.location = uri;
}

function openUriUsingFirefox(uri: string, failCb: NoArgVoidFunc, successCb: NoArgVoidFunc) {
    var iframe = document.querySelector("#hiddenIframe");

    if (!iframe) {
        iframe = _createHiddenIframe(document.body, "about:blank");
    }

    try {
        //@ts-ignore
        iframe.contentWindow.location.href = uri;
        successCb();
    } catch (e) {
        //@ts-ignore
        if (e?.name == "NS_ERROR_UNKNOWN_PROTOCOL") {
            failCb();
        }
    }
}

function openUriUsingIEInOlderWindows(uri: string, failCb: NoArgVoidFunc, successCb: NoArgVoidFunc) {
    if (getInternetExplorerVersion() === 10) {
        openUriUsingIE10InWindows7(uri, failCb, successCb);
    } else if (getInternetExplorerVersion() === 9 || getInternetExplorerVersion() === 11) {
        openUriWithHiddenFrame(uri, failCb, successCb);
    } else {
        openUriInNewWindowHack(uri, failCb, successCb);
    }
}

function openUriUsingIE10InWindows7(uri: string, failCb: NoArgVoidFunc, successCb: NoArgVoidFunc) {
    var timeout = setTimeout(failCb, 1000);
    window.addEventListener("blur", function () {
        clearTimeout(timeout);
        successCb();
    });

    var iframe = document.querySelector("#hiddenIframe");
    if (!iframe) {
        iframe = _createHiddenIframe(document.body, "about:blank");
    }
    try {
        //@ts-ignore
        iframe.contentWindow.location.href = uri;
    } catch (e) {
        failCb();
        clearTimeout(timeout);
    }
}

function openUriInNewWindowHack(uri: string, failCb: NoArgVoidFunc, successCb: NoArgVoidFunc) {
    var myWindow = window.open('', '', 'width=0,height=0');
    //@ts-ignore
    myWindow.document.write("<iframe src='" + uri + "'></iframe>");

    setTimeout(function () {
        try {
            //@ts-ignore
            myWindow.location.href;
            //@ts-ignore
            myWindow.setTimeout("window.close()", 1000);
            successCb();
        } catch (e) {
            //@ts-ignore
            myWindow.close();
            failCb();
        }
    }, 1000);
}

function openUriWithMsLaunchUri(uri: string, failCb: NoArgVoidFunc, successCb: NoArgVoidFunc) {
    //@ts-ignore
    navigator.msLaunchUri(uri,
        successCb,
        failCb
    );
}

function checkBrowser() {
    //@ts-ignore
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var ua = navigator.userAgent.toLowerCase();
    return {
        isOpera: isOpera,
        //@ts-ignore
        isFirefox: typeof InstallTrigger !== 'undefined',
        isSafari: (~ua.indexOf('safari') && !~ua.indexOf('chrome')) || Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
        //@ts-ignore
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
        //@ts-ignore
        isChrome: !!window.chrome && !isOpera,
        //@ts-ignore
        isIE: /*@cc_on!@*/false || !!document.documentMode // At least IE6
    }
}

function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName === "Microsoft Internet Explorer") {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    else if (navigator.appName === "Netscape") {
        var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
            rv = parseFloat(RegExp.$1);
        }
    }
    return rv;
}

export function protocolCheck(uri: string, failCb?: NoArgVoidFunc, successCb?: NoArgVoidFunc, unsupportedCb?: NoArgVoidFunc) {
    function failCallback() {
        failCb && failCb();
    }

    function successCallback() {
        successCb && successCb();
    }

    //@ts-ignore
    if (navigator.msLaunchUri) { //for IE and Edge in Win 8 and Win 10
        openUriWithMsLaunchUri(uri, failCallback, successCallback);
    } else {
        var browser = checkBrowser();

        if (browser.isFirefox) {
            openUriUsingFirefox(uri, failCallback, successCallback);
        } else if (browser.isChrome || browser.isIOS) {
            openUriWithTimeoutHack(uri, failCallback, successCallback);
        } else if (browser.isIE) {
            openUriUsingIEInOlderWindows(uri, failCallback, successCallback);
        } else if (browser.isSafari) {
            openUriWithHiddenFrame(uri, failCallback, successCallback);
        } else {
            unsupportedCb?.();
            //not supported, implement please
        }
    }
}

// 获取谷歌浏览器版本
export function getChromeVersion() {
    var arr = navigator.userAgent.split(' ');
    var chromeVersion = '';
    for (var i = 0; i < arr.length; i++) {
        if (/chrome/i.test(arr[i]))
            chromeVersion = arr[i]
    }
    if (chromeVersion) {
        return Number(chromeVersion.split('/')[1].split('.')[0]);
    } else {
        return false;
    }
}
