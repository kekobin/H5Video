var utils = {
    hasClass: function(elem, className) {
        return new RegExp("(^|\\s)" + className + "(\\s|$)").test(elem.className);
    },
    addClass: function(elem, className) {
        var arr = elem.className.split(/\s+/);
        this.hasClass(elem, className) || arr.push(className);
        elem.className = arr.join(" ").replace(/(^\s*)|(\s*$)/, "");
    },
    removeClass: function(element, className) {
        element.className = element.className.replace(new RegExp("(^|\\s)" + className + "(\\s|$)", "g"), "").split(/\s+/).join(" ");
    },
    /*
     *   高级加载事件
     *   xjl.addHandler(window,"load",test);
     */
    addHandler: function(element, type, handler) {
        return element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent("on" + type, handler)
    },
    removeHandler: function(oElement, sEventType, fnHandler) {
        return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler)
    },
    /*
     *   两个参数的时候获取，三个参数为设置
     *   xjl.css(obj,"width");
     *   xjl.css(obj,{"top":20,"width":20})
     *   xjl.css(obj,"top",37);
     */
    css: function(oElement, attr, value) {
        if (arguments.length == 2) {
            if (typeof arguments[1] === "string") {
                return parseFloat(oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr]);
            } else {
                for (var property in attr) {
                    property == "opacity" ? (oElement.style.filter = "alpha(opacity=" + attr[property] + ")", oElement.style.opacity = attr[property] / 100) :
                        oElement.style[property] = attr[property]
                }
            }
        } else if (arguments.length == 3) {
            switch (attr) {
                case "width":
                case "height":
                case "top":
                case "right":
                case "bottom":
                case "left":
                case "marginTop":
                case "marginRigth":
                case "marginBottom":
                case "marginLeft":
                    oElement.style[attr] = value + "px";
                    break;
                case "opacity":
                    oElement.style.filter = "alpha(opacity=" + value + ")";
                    oElement.style.opacity = value / 100;
                    break;
                default:
                    oElement.style[attr] = value;
                    break
            }
        }
    },
    /*
     *  用新属性获取元素页面的位置getBoundingClientRect，不用循环判断他们的父级的定位
     */
    getPos: function(element) {
        var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            iScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
            iPos = element.getBoundingClientRect();
        return { top: iPos.top + iScrollTop, left: iPos.left + iScrollLeft, right: iPos.right + iScrollLeft, bottom: iPos.bottom + iScrollTop }
    },
    //继承
    deepCopy: function(p, c) {
        var c = c || {};
        for (var i in p) {
            if (p[i] != null && typeof(p[i]) == 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                this.deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    },
    /**
     * @param {HTMLElement} el
     * @param {String} where beforeBegin、afterBegin、beforeEnd、afterEnd
     * @param {String} html
     *  beforeBegin：在该元素前插入
        afterBegin：在该元素第一个子元素前插入
        beforeEnd：在该元素最后一个子元素后面插入
        afterEnd：在该元素后插入
     */
    insertHTML: function(el, where, html) {
        if (!el) {
            return false;
        }

        where = where.toLowerCase();

        if (el.insertAdjacentHTML) {
            el.insertAdjacentHTML(where, html);
        } else {
            var range = el.ownerDocument.createRange(),
                frag = null;

            switch (where) {
                case "beforebegin":
                    range.setStartBefore(el);
                    frag = range.createContextualFragment(html);
                    el.parentNode.insertBefore(frag, el);
                    return el.previousSibling;
                case "afterbegin":
                    if (el.firstChild) {
                        range.setStartBefore(el.firstChild);
                        frag = range.createContextualFragment(html);
                        el.insertBefore(frag, el.firstChild);
                    } else {
                        el.innerHTML = html;
                    }
                    return el.firstChild;
                case "beforeend":
                    if (el.lastChild) {
                        range.setStartAfter(el.lastChild);
                        frag = range.createContextualFragment(html);
                        el.appendChild(frag);
                    } else {
                        el.innerHTML = html;
                    }
                    return el.lastChild;
                case "afterend":
                    range.setStartAfter(el);
                    frag = range.createContextualFragment(html);
                    el.parentNode.insertBefore(frag, el.nextSibling);
                    return el.nextSibling;
            }
        }
    },

    //禁止图片拖拽，使用：$('selector').each(utils.NoDrag);
    NoDrag: function(index, element) {
        element.ondragstart = function() {
            return false;
        };
    },

    //禁止选中文本
    NoSelect: function(index, element) {
        element.onselectstart = function() {
            return false;
        };
    },

    //阻止事件冒泡
    stopPropagation: function(evt) {
        if (evt && evt.stopPropagation) {
            evt.stopPropagation();
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
    },

    //设置cookie
    setCookie: function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    //获取cookie
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    //清除cookie  
    clearCookie: function(name) {
        setCookie(name, "", -1);
    }

}
