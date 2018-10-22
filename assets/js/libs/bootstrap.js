(function(global, factory) {
    if (typeof define == "function" && define.amd) {
        define("ev-emitter/ev-emitter", factory);
    } else if (typeof module == "object" && module.exports) {
        module.exports = factory();
    } else {
        global.EvEmitter = factory();
    }
})(typeof window != "undefined" ? window : this, function() {
    function EvEmitter() {}
    var proto = EvEmitter.prototype;
    proto.on = function(eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        var events = this._events = this._events || {};
        var listeners = events[eventName] = events[eventName] || [];
        if (listeners.indexOf(listener) == -1) {
            listeners.push(listener);
        }
        return this;
    };
    proto.once = function(eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        this.on(eventName, listener);
        var onceEvents = this._onceEvents = this._onceEvents || {};
        var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
        onceListeners[listener] = true;
        return this;
    };
    proto.off = function(eventName, listener) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        var index = listeners.indexOf(listener);
        if (index != -1) {
            listeners.splice(index, 1);
        }
        return this;
    };
    proto.emitEvent = function(eventName, args) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        var i = 0;
        var listener = listeners[i];
        args = args || [];
        var onceListeners = this._onceEvents && this._onceEvents[eventName];
        while (listener) {
            var isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
                this.off(eventName, listener);
                delete onceListeners[listener];
            }
            listener.apply(this, args);
            i += isOnce ? 0 : 1;
            listener = listeners[i];
        }
        return this;
    };
    proto.allOff = proto.removeAllListeners = function() {
        delete this._events;
        delete this._onceEvents;
    };
    return EvEmitter;
});

(function(window, factory) {
    "use strict";
    if (typeof define == "function" && define.amd) {
        define([ "ev-emitter/ev-emitter" ], function(EvEmitter) {
            return factory(window, EvEmitter);
        });
    } else if (typeof module == "object" && module.exports) {
        module.exports = factory(window, require("ev-emitter"));
    } else {
        window.imagesLoaded = factory(window, window.EvEmitter);
    }
})(typeof window !== "undefined" ? window : this, function factory(window, EvEmitter) {
    var $ = window.jQuery;
    var console = window.console;
    function extend(a, b) {
        for (var prop in b) {
            a[prop] = b[prop];
        }
        return a;
    }
    function makeArray(obj) {
        var ary = [];
        if (Array.isArray(obj)) {
            ary = obj;
        } else if (typeof obj.length == "number") {
            for (var i = 0; i < obj.length; i++) {
                ary.push(obj[i]);
            }
        } else {
            ary.push(obj);
        }
        return ary;
    }
    function ImagesLoaded(elem, options, onAlways) {
        if (!(this instanceof ImagesLoaded)) {
            return new ImagesLoaded(elem, options, onAlways);
        }
        if (typeof elem == "string") {
            elem = document.querySelectorAll(elem);
        }
        this.elements = makeArray(elem);
        this.options = extend({}, this.options);
        if (typeof options == "function") {
            onAlways = options;
        } else {
            extend(this.options, options);
        }
        if (onAlways) {
            this.on("always", onAlways);
        }
        this.getImages();
        if ($) {
            this.jqDeferred = new $.Deferred();
        }
        setTimeout(function() {
            this.check();
        }.bind(this));
    }
    ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
    ImagesLoaded.prototype.options = {};
    ImagesLoaded.prototype.getImages = function() {
        this.images = [];
        this.elements.forEach(this.addElementImages, this);
    };
    ImagesLoaded.prototype.addElementImages = function(elem) {
        if (elem.nodeName == "IMG") {
            this.addImage(elem);
        }
        if (this.options.background === true) {
            this.addElementBackgroundImages(elem);
        }
        var nodeType = elem.nodeType;
        if (!nodeType || !elementNodeTypes[nodeType]) {
            return;
        }
        var childImgs = elem.querySelectorAll("img");
        for (var i = 0; i < childImgs.length; i++) {
            var img = childImgs[i];
            this.addImage(img);
        }
        if (typeof this.options.background == "string") {
            var children = elem.querySelectorAll(this.options.background);
            for (i = 0; i < children.length; i++) {
                var child = children[i];
                this.addElementBackgroundImages(child);
            }
        }
    };
    var elementNodeTypes = {
        1: true,
        9: true,
        11: true
    };
    ImagesLoaded.prototype.addElementBackgroundImages = function(elem) {
        var style = getComputedStyle(elem);
        if (!style) {
            return;
        }
        var reURL = /url\((['"])?(.*?)\1\)/gi;
        var matches = reURL.exec(style.backgroundImage);
        while (matches !== null) {
            var url = matches && matches[2];
            if (url) {
                this.addBackground(url, elem);
            }
            matches = reURL.exec(style.backgroundImage);
        }
    };
    ImagesLoaded.prototype.addImage = function(img) {
        var loadingImage = new LoadingImage(img);
        this.images.push(loadingImage);
    };
    ImagesLoaded.prototype.addBackground = function(url, elem) {
        var background = new Background(url, elem);
        this.images.push(background);
    };
    ImagesLoaded.prototype.check = function() {
        var _this = this;
        this.progressedCount = 0;
        this.hasAnyBroken = false;
        if (!this.images.length) {
            this.complete();
            return;
        }
        function onProgress(image, elem, message) {
            setTimeout(function() {
                _this.progress(image, elem, message);
            });
        }
        this.images.forEach(function(loadingImage) {
            loadingImage.once("progress", onProgress);
            loadingImage.check();
        });
    };
    ImagesLoaded.prototype.progress = function(image, elem, message) {
        this.progressedCount++;
        this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
        this.emitEvent("progress", [ this, image, elem ]);
        if (this.jqDeferred && this.jqDeferred.notify) {
            this.jqDeferred.notify(this, image);
        }
        if (this.progressedCount == this.images.length) {
            this.complete();
        }
        if (this.options.debug && console) {
            console.log("progress: " + message, image, elem);
        }
    };
    ImagesLoaded.prototype.complete = function() {
        var eventName = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = true;
        this.emitEvent(eventName, [ this ]);
        this.emitEvent("always", [ this ]);
        if (this.jqDeferred) {
            var jqMethod = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[jqMethod](this);
        }
    };
    function LoadingImage(img) {
        this.img = img;
    }
    LoadingImage.prototype = Object.create(EvEmitter.prototype);
    LoadingImage.prototype.check = function() {
        var isComplete = this.getIsImageComplete();
        if (isComplete) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            return;
        }
        this.proxyImage = new Image();
        this.proxyImage.addEventListener("load", this);
        this.proxyImage.addEventListener("error", this);
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        this.proxyImage.src = this.img.src;
    };
    LoadingImage.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth !== undefined;
    };
    LoadingImage.prototype.confirm = function(isLoaded, message) {
        this.isLoaded = isLoaded;
        this.emitEvent("progress", [ this, this.img, message ]);
    };
    LoadingImage.prototype.handleEvent = function(event) {
        var method = "on" + event.type;
        if (this[method]) {
            this[method](event);
        }
    };
    LoadingImage.prototype.onload = function() {
        this.confirm(true, "onload");
        this.unbindEvents();
    };
    LoadingImage.prototype.onerror = function() {
        this.confirm(false, "onerror");
        this.unbindEvents();
    };
    LoadingImage.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this);
        this.proxyImage.removeEventListener("error", this);
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this);
    };
    function Background(url, element) {
        this.url = url;
        this.element = element;
        this.img = new Image();
    }
    Background.prototype = Object.create(LoadingImage.prototype);
    Background.prototype.check = function() {
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        this.img.src = this.url;
        var isComplete = this.getIsImageComplete();
        if (isComplete) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            this.unbindEvents();
        }
    };
    Background.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this);
    };
    Background.prototype.confirm = function(isLoaded, message) {
        this.isLoaded = isLoaded;
        this.emitEvent("progress", [ this, this.element, message ]);
    };
    ImagesLoaded.makeJQueryPlugin = function(jQuery) {
        jQuery = jQuery || window.jQuery;
        if (!jQuery) {
            return;
        }
        $ = jQuery;
        $.fn.imagesLoaded = function(options, callback) {
            var instance = new ImagesLoaded(this, options, callback);
            return instance.jqDeferred.promise($(this));
        };
    };
    ImagesLoaded.makeJQueryPlugin();
    return ImagesLoaded;
});

(function($, undef) {
    "use strict";
    if ($.fn.dotdotdot) {
        return;
    }
    $.fn.dotdotdot = function(o) {
        if (this.length === 0) {
            $.fn.dotdotdot.debug('No element found for "' + this.selector + '".');
            return this;
        }
        if (this.length > 1) {
            return this.each(function() {
                $(this).dotdotdot(o);
            });
        }
        var $dot = this;
        var orgContent = $dot.contents();
        if ($dot.data("dotdotdot")) {
            $dot.trigger("destroy.dot");
        }
        $dot.data("dotdotdot-style", $dot.attr("style") || "");
        $dot.css("word-wrap", "break-word");
        if ($dot.css("white-space") === "nowrap") {
            $dot.css("white-space", "normal");
        }
        $dot.bind_events = function() {
            $dot.bind("update.dot", function(e, c) {
                $dot.removeClass("is-truncated");
                e.preventDefault();
                e.stopPropagation();
                switch (typeof opts.height) {
                  case "number":
                    opts.maxHeight = opts.height;
                    break;

                  case "function":
                    opts.maxHeight = opts.height.call($dot[0]);
                    break;

                  default:
                    opts.maxHeight = getTrueInnerHeight($dot);
                    break;
                }
                opts.maxHeight += opts.tolerance;
                if (typeof c != "undefined") {
                    if (typeof c == "string" || "nodeType" in c && c.nodeType === 1) {
                        c = $("<div />").append(c).contents();
                    }
                    if (c instanceof $) {
                        orgContent = c;
                    }
                }
                $inr = $dot.wrapInner('<div class="dotdotdot" />').children();
                $inr.contents().detach().end().append(orgContent.clone(true)).find("br").replaceWith("  <br />  ").end().css({
                    height: "auto",
                    width: "auto",
                    border: "none",
                    padding: 0,
                    margin: 0
                });
                var after = false, trunc = false;
                if (conf.afterElement) {
                    after = conf.afterElement.clone(true);
                    after.show();
                    conf.afterElement.detach();
                }
                if (test($inr, opts)) {
                    if (opts.wrap == "children") {
                        trunc = children($inr, opts, after);
                    } else {
                        trunc = ellipsis($inr, $dot, $inr, opts, after);
                    }
                }
                $inr.replaceWith($inr.contents());
                $inr = null;
                if ($.isFunction(opts.callback)) {
                    opts.callback.call($dot[0], trunc, orgContent);
                }
                conf.isTruncated = trunc;
                return trunc;
            }).bind("isTruncated.dot", function(e, fn) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof fn == "function") {
                    fn.call($dot[0], conf.isTruncated);
                }
                return conf.isTruncated;
            }).bind("originalContent.dot", function(e, fn) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof fn == "function") {
                    fn.call($dot[0], orgContent);
                }
                return orgContent;
            }).bind("destroy.dot", function(e) {
                e.preventDefault();
                e.stopPropagation();
                $dot.unwatch().unbind_events().contents().detach().end().append(orgContent).attr("style", $dot.data("dotdotdot-style") || "").removeClass("is-truncated").data("dotdotdot", false);
            });
            return $dot;
        };
        $dot.unbind_events = function() {
            $dot.unbind(".dot");
            return $dot;
        };
        $dot.watch = function() {
            $dot.unwatch();
            if (opts.watch == "window") {
                var $window = $(window), _wWidth = $window.width(), _wHeight = $window.height();
                $window.bind("resize.dot" + conf.dotId, function() {
                    if (_wWidth != $window.width() || _wHeight != $window.height() || !opts.windowResizeFix) {
                        _wWidth = $window.width();
                        _wHeight = $window.height();
                        if (watchInt) {
                            clearInterval(watchInt);
                        }
                        watchInt = setTimeout(function() {
                            $dot.trigger("update.dot");
                        }, 100);
                    }
                });
            } else {
                watchOrg = getSizes($dot);
                watchInt = setInterval(function() {
                    if ($dot.is(":visible")) {
                        var watchNew = getSizes($dot);
                        if (watchOrg.width != watchNew.width || watchOrg.height != watchNew.height) {
                            $dot.trigger("update.dot");
                            watchOrg = watchNew;
                        }
                    }
                }, 500);
            }
            return $dot;
        };
        $dot.unwatch = function() {
            $(window).unbind("resize.dot" + conf.dotId);
            if (watchInt) {
                clearInterval(watchInt);
            }
            return $dot;
        };
        var opts = $.extend(true, {}, $.fn.dotdotdot.defaults, o), conf = {}, watchOrg = {}, watchInt = null, $inr = null;
        if (!(opts.lastCharacter.remove instanceof Array)) {
            opts.lastCharacter.remove = $.fn.dotdotdot.defaultArrays.lastCharacter.remove;
        }
        if (!(opts.lastCharacter.noEllipsis instanceof Array)) {
            opts.lastCharacter.noEllipsis = $.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis;
        }
        conf.afterElement = getElement(opts.after, $dot);
        conf.isTruncated = false;
        conf.dotId = dotId++;
        $dot.data("dotdotdot", true).bind_events().trigger("update.dot");
        if (opts.watch) {
            $dot.watch();
        }
        return $dot;
    };
    $.fn.dotdotdot.defaults = {
        ellipsis: "... ",
        wrap: "word",
        fallbackToLetter: true,
        lastCharacter: {},
        tolerance: 0,
        callback: null,
        after: null,
        height: null,
        watch: false,
        windowResizeFix: true,
        maxLength: null
    };
    $.fn.dotdotdot.defaultArrays = {
        lastCharacter: {
            remove: [ " ", "　", ",", ";", ".", "!", "?" ],
            noEllipsis: []
        }
    };
    $.fn.dotdotdot.debug = function(msg) {};
    var dotId = 1;
    function children($elem, o, after) {
        var $elements = $elem.children(), isTruncated = false;
        $elem.empty();
        for (var a = 0, l = $elements.length; a < l; a++) {
            var $e = $elements.eq(a);
            $elem.append($e);
            if (after) {
                $elem.append(after);
            }
            if (test($elem, o)) {
                $e.remove();
                isTruncated = true;
                break;
            } else {
                if (after) {
                    after.detach();
                }
            }
        }
        return isTruncated;
    }
    function ellipsis($elem, $d, $i, o, after) {
        var isTruncated = false;
        var notx = "a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style";
        var noty = "script, .dotdotdot-keep";
        $elem.contents().detach().each(function() {
            var e = this, $e = $(e);
            if (typeof e == "undefined") {
                return true;
            } else if ($e.is(noty)) {
                $elem.append($e);
            } else if (isTruncated) {
                return true;
            } else {
                $elem.append($e);
                if (after && !$e.is(o.after) && !$e.find(o.after).length) {
                    $elem[$elem.is(notx) ? "after" : "append"](after);
                }
                if (test($i, o)) {
                    if (e.nodeType == 3) {
                        isTruncated = ellipsisElement($e, $d, $i, o, after);
                    } else {
                        isTruncated = ellipsis($e, $d, $i, o, after);
                    }
                }
                if (!isTruncated) {
                    if (after) {
                        after.detach();
                    }
                }
            }
        });
        $d.addClass("is-truncated");
        return isTruncated;
    }
    function ellipsisElement($e, $d, $i, o, after) {
        var e = $e[0];
        if (!e) {
            return false;
        }
        var txt = getTextContent(e), space = txt.indexOf(" ") !== -1 ? " " : "　", separator = o.wrap == "letter" ? "" : space, textArr = txt.split(separator), position = -1, midPos = -1, startPos = 0, endPos = textArr.length - 1;
        if (o.fallbackToLetter && startPos === 0 && endPos === 0) {
            separator = "";
            textArr = txt.split(separator);
            endPos = textArr.length - 1;
        }
        if (o.maxLength) {
            txt = addEllipsis(txt.trim().substr(0, o.maxLength), o);
            setTextContent(e, txt);
        } else {
            while (startPos <= endPos && !(startPos === 0 && endPos === 0)) {
                var m = Math.floor((startPos + endPos) / 2);
                if (m == midPos) {
                    break;
                }
                midPos = m;
                setTextContent(e, textArr.slice(0, midPos + 1).join(separator) + o.ellipsis);
                $i.children().each(function() {
                    $(this).toggle().toggle();
                });
                if (!test($i, o)) {
                    position = midPos;
                    startPos = midPos;
                } else {
                    endPos = midPos;
                    if (o.fallbackToLetter && startPos === 0 && endPos === 0) {
                        separator = "";
                        textArr = textArr[0].split(separator);
                        position = -1;
                        midPos = -1;
                        startPos = 0;
                        endPos = textArr.length - 1;
                    }
                }
            }
            if (position != -1 && !(textArr.length === 1 && textArr[0].length === 0)) {
                txt = addEllipsis(textArr.slice(0, position + 1).join(separator), o);
                setTextContent(e, txt);
            } else {
                var $w = $e.parent();
                $e.detach();
                var afterLength = after && after.closest($w).length ? after.length : 0;
                if ($w.contents().length > afterLength) {
                    e = findLastTextNode($w.contents().eq(-1 - afterLength), $d);
                } else {
                    e = findLastTextNode($w, $d, true);
                    if (!afterLength) {
                        $w.detach();
                    }
                }
                if (e) {
                    txt = addEllipsis(getTextContent(e), o);
                    setTextContent(e, txt);
                    if (afterLength && after) {
                        var $parent = after.parent();
                        $(e).parent().append(after);
                        if (!$.trim($parent.html())) {
                            $parent.remove();
                        }
                    }
                }
            }
        }
        return true;
    }
    function test($i, o) {
        return $i.innerHeight() > o.maxHeight || o.maxLength && $i.text().trim().length > o.maxLength;
    }
    function addEllipsis(txt, o) {
        while ($.inArray(txt.slice(-1), o.lastCharacter.remove) > -1) {
            txt = txt.slice(0, -1);
        }
        if ($.inArray(txt.slice(-1), o.lastCharacter.noEllipsis) < 0) {
            txt += o.ellipsis;
        }
        return txt;
    }
    function getSizes($d) {
        return {
            width: $d.innerWidth(),
            height: $d.innerHeight()
        };
    }
    function setTextContent(e, content) {
        if (e.innerText) {
            e.innerText = content;
        } else if (e.nodeValue) {
            e.nodeValue = content;
        } else if (e.textContent) {
            e.textContent = content;
        }
    }
    function getTextContent(e) {
        if (e.innerText) {
            return e.innerText;
        } else if (e.nodeValue) {
            return e.nodeValue;
        } else if (e.textContent) {
            return e.textContent;
        } else {
            return "";
        }
    }
    function getPrevNode(n) {
        do {
            n = n.previousSibling;
        } while (n && n.nodeType !== 1 && n.nodeType !== 3);
        return n;
    }
    function findLastTextNode($el, $top, excludeCurrent) {
        var e = $el && $el[0], p;
        if (e) {
            if (!excludeCurrent) {
                if (e.nodeType === 3) {
                    return e;
                }
                if ($.trim($el.text())) {
                    return findLastTextNode($el.contents().last(), $top);
                }
            }
            p = getPrevNode(e);
            while (!p) {
                $el = $el.parent();
                if ($el.is($top) || !$el.length) {
                    return false;
                }
                p = getPrevNode($el[0]);
            }
            if (p) {
                return findLastTextNode($(p), $top);
            }
        }
        return false;
    }
    function getElement(e, $i) {
        if (!e) {
            return false;
        }
        if (typeof e === "string") {
            e = $(e, $i);
            return e.length ? e : false;
        }
        return !e.jquery ? false : e;
    }
    function getTrueInnerHeight($el) {
        var h = $el.innerHeight(), a = [ "paddingTop", "paddingBottom" ];
        for (var z = 0, l = a.length; z < l; z++) {
            var m = parseInt($el.css(a[z]), 10);
            if (isNaN(m)) {
                m = 0;
            }
            h -= m;
        }
        return h;
    }
    var _orgHtml = $.fn.html;
    $.fn.html = function(str) {
        if (str != undef && !$.isFunction(str) && this.data("dotdotdot")) {
            return this.trigger("update", [ str ]);
        }
        return _orgHtml.apply(this, arguments);
    };
    var _orgText = $.fn.text;
    $.fn.text = function(str) {
        if (str != undef && !$.isFunction(str) && this.data("dotdotdot")) {
            str = $("<div />").text(str).html();
            return this.trigger("update", [ str ]);
        }
        return _orgText.apply(this, arguments);
    };
})(jQuery);

(function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t();
})(this, function() {
    "use strict";
    function e(e) {
        return e && "[object Function]" === {}.toString.call(e);
    }
    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = window.getComputedStyle(e, null);
        return t ? o[t] : o;
    }
    function o(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host;
    }
    function n(e) {
        if (!e || -1 !== [ "HTML", "BODY", "#document" ].indexOf(e.nodeName)) return window.document.body;
        var i = t(e), r = i.overflow, p = i.overflowX, s = i.overflowY;
        return /(auto|scroll)/.test(r + s + p) ? e : n(o(e));
    }
    function r(e) {
        var o = e && e.offsetParent, i = o && o.nodeName;
        return i && "BODY" !== i && "HTML" !== i ? -1 !== [ "TD", "TABLE" ].indexOf(o.nodeName) && "static" === t(o, "position") ? r(o) : o : window.document.documentElement;
    }
    function p(e) {
        var t = e.nodeName;
        return "BODY" !== t && ("HTML" === t || r(e.firstElementChild) === e);
    }
    function s(e) {
        return null === e.parentNode ? e : s(e.parentNode);
    }
    function d(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return window.document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, i = o ? e : t, n = o ? t : e, a = document.createRange();
        a.setStart(i, 0), a.setEnd(n, 0);
        var l = a.commonAncestorContainer;
        if (e !== l && t !== l || i.contains(n)) return p(l) ? l : r(l);
        var f = s(e);
        return f.host ? d(f.host, t) : d(e, s(t).host);
    }
    function a(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top", o = "top" === t ? "scrollTop" : "scrollLeft", i = e.nodeName;
        if ("BODY" === i || "HTML" === i) {
            var n = window.document.documentElement, r = window.document.scrollingElement || n;
            return r[o];
        }
        return e[o];
    }
    function l(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], i = a(t, "top"), n = a(t, "left"), r = o ? -1 : 1;
        return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e;
    }
    function f(e, t) {
        var o = "x" === t ? "Left" : "Top", i = "Left" == o ? "Right" : "Bottom";
        return +e["border" + o + "Width"].split("px")[0] + +e["border" + i + "Width"].split("px")[0];
    }
    function m(e, t, o, i) {
        return X(t["offset" + e], t["scroll" + e], o["client" + e], o["offset" + e], o["scroll" + e], ne() ? o["offset" + e] + i["margin" + ("Height" === e ? "Top" : "Left")] + i["margin" + ("Height" === e ? "Bottom" : "Right")] : 0);
    }
    function c() {
        var e = window.document.body, t = window.document.documentElement, o = ne() && window.getComputedStyle(t);
        return {
            height: m("Height", e, t, o),
            width: m("Width", e, t, o)
        };
    }
    function h(e) {
        return de({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        });
    }
    function g(e) {
        var o = {};
        if (ne()) try {
            o = e.getBoundingClientRect();
            var i = a(e, "top"), n = a(e, "left");
            o.top += i, o.left += n, o.bottom += i, o.right += n;
        } catch (e) {} else o = e.getBoundingClientRect();
        var r = {
            left: o.left,
            top: o.top,
            width: o.right - o.left,
            height: o.bottom - o.top
        }, p = "HTML" === e.nodeName ? c() : {}, s = p.width || e.clientWidth || r.right - r.left, d = p.height || e.clientHeight || r.bottom - r.top, l = e.offsetWidth - s, m = e.offsetHeight - d;
        if (l || m) {
            var g = t(e);
            l -= f(g, "x"), m -= f(g, "y"), r.width -= l, r.height -= m;
        }
        return h(r);
    }
    function u(e, o) {
        var i = ne(), r = "HTML" === o.nodeName, p = g(e), s = g(o), d = n(e), a = t(o), f = +a.borderTopWidth.split("px")[0], m = +a.borderLeftWidth.split("px")[0], c = h({
            top: p.top - s.top - f,
            left: p.left - s.left - m,
            width: p.width,
            height: p.height
        });
        if (c.marginTop = 0, c.marginLeft = 0, !i && r) {
            var u = +a.marginTop.split("px")[0], b = +a.marginLeft.split("px")[0];
            c.top -= f - u, c.bottom -= f - u, c.left -= m - b, c.right -= m - b, c.marginTop = u, 
            c.marginLeft = b;
        }
        return (i ? o.contains(d) : o === d && "BODY" !== d.nodeName) && (c = l(c, o)), 
        c;
    }
    function b(e) {
        var t = window.document.documentElement, o = u(e, t), i = X(t.clientWidth, window.innerWidth || 0), n = X(t.clientHeight, window.innerHeight || 0), r = a(t), p = a(t, "left"), s = {
            top: r - o.top + o.marginTop,
            left: p - o.left + o.marginLeft,
            width: i,
            height: n
        };
        return h(s);
    }
    function y(e) {
        var i = e.nodeName;
        return "BODY" === i || "HTML" === i ? !1 : "fixed" === t(e, "position") || y(o(e));
    }
    function w(e, t, i, r) {
        var p = {
            top: 0,
            left: 0
        }, s = d(e, t);
        if ("viewport" === r) p = b(s); else {
            var a;
            "scrollParent" === r ? (a = n(o(e)), "BODY" === a.nodeName && (a = window.document.documentElement)) : "window" === r ? a = window.document.documentElement : a = r;
            var l = u(a, s);
            if ("HTML" === a.nodeName && !y(s)) {
                var f = c(), m = f.height, h = f.width;
                p.top += l.top - l.marginTop, p.bottom = m + l.top, p.left += l.left - l.marginLeft, 
                p.right = h + l.left;
            } else p = l;
        }
        return p.left += i, p.top += i, p.right -= i, p.bottom -= i, p;
    }
    function E(e) {
        var t = e.width, o = e.height;
        return t * o;
    }
    function v(e, t, o, i, n) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto")) return e;
        var p = w(o, i, r, n), s = {
            top: {
                width: p.width,
                height: t.top - p.top
            },
            right: {
                width: p.right - t.right,
                height: p.height
            },
            bottom: {
                width: p.width,
                height: p.bottom - t.bottom
            },
            left: {
                width: t.left - p.left,
                height: p.height
            }
        }, d = Object.keys(s).map(function(e) {
            return de({
                key: e
            }, s[e], {
                area: E(s[e])
            });
        }).sort(function(e, t) {
            return t.area - e.area;
        }), a = d.filter(function(e) {
            var t = e.width, i = e.height;
            return t >= o.clientWidth && i >= o.clientHeight;
        }), l = 0 < a.length ? a[0].key : d[0].key, f = e.split("-")[1];
        return l + (f ? "-" + f : "");
    }
    function x(e, t, o) {
        var i = d(t, o);
        return u(o, i);
    }
    function O(e) {
        var t = window.getComputedStyle(e), o = parseFloat(t.marginTop) + parseFloat(t.marginBottom), i = parseFloat(t.marginLeft) + parseFloat(t.marginRight), n = {
            width: e.offsetWidth + i,
            height: e.offsetHeight + o
        };
        return n;
    }
    function L(e) {
        var t = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e];
        });
    }
    function S(e, t, o) {
        o = o.split("-")[0];
        var i = O(e), n = {
            width: i.width,
            height: i.height
        }, r = -1 !== [ "right", "left" ].indexOf(o), p = r ? "top" : "left", s = r ? "left" : "top", d = r ? "height" : "width", a = r ? "width" : "height";
        return n[p] = t[p] + t[d] / 2 - i[d] / 2, n[s] = o === s ? t[s] - i[a] : t[L(s)], 
        n;
    }
    function T(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0];
    }
    function C(e, t, o) {
        if (Array.prototype.findIndex) return e.findIndex(function(e) {
            return e[t] === o;
        });
        var i = T(e, function(e) {
            return e[t] === o;
        });
        return e.indexOf(i);
    }
    function N(t, o, i) {
        var n = void 0 === i ? t : t.slice(0, C(t, "name", i));
        return n.forEach(function(t) {
            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var i = t.function || t.fn;
            t.enabled && e(i) && (o.offsets.popper = h(o.offsets.popper), o.offsets.reference = h(o.offsets.reference), 
            o = i(o, t));
        }), o;
    }
    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = x(this.state, this.popper, this.reference), e.placement = v(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), 
            e.originalPlacement = e.placement, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), 
            e.offsets.popper.position = "absolute", e = N(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, 
            this.options.onCreate(e));
        }
    }
    function W(e, t) {
        return e.some(function(e) {
            var o = e.name, i = e.enabled;
            return i && o === t;
        });
    }
    function B(e) {
        for (var t = [ !1, "ms", "Webkit", "Moz", "O" ], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length - 1; n++) {
            var i = t[n], r = i ? "" + i + o : e;
            if ("undefined" != typeof window.document.body.style[r]) return r;
        }
        return null;
    }
    function P() {
        return this.state.isDestroyed = !0, W(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), 
        this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", 
        this.popper.style[B("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), 
        this;
    }
    function D(e, t, o, i) {
        var r = "BODY" === e.nodeName, p = r ? window : e;
        p.addEventListener(t, o, {
            passive: !0
        }), r || D(n(p.parentNode), t, o, i), i.push(p);
    }
    function H(e, t, o, i) {
        o.updateBound = i, window.addEventListener("resize", o.updateBound, {
            passive: !0
        });
        var r = n(e);
        return D(r, "scroll", o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, 
        o;
    }
    function A() {
        this.state.eventsEnabled || (this.state = H(this.reference, this.options, this.state, this.scheduleUpdate));
    }
    function M(e, t) {
        return window.removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener("scroll", t.updateBound);
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, 
        t;
    }
    function I() {
        this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = M(this.reference, this.state));
    }
    function R(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
    }
    function U(e, t) {
        Object.keys(t).forEach(function(o) {
            var i = "";
            -1 !== [ "width", "height", "top", "right", "bottom", "left" ].indexOf(o) && R(t[o]) && (i = "px"), 
            e.style[o] = t[o] + i;
        });
    }
    function Y(e, t) {
        Object.keys(t).forEach(function(o) {
            var i = t[o];
            !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
        });
    }
    function F(e, t, o) {
        var i = T(e, function(e) {
            var o = e.name;
            return o === t;
        }), n = !!i && e.some(function(e) {
            return e.name === o && e.enabled && e.order < i.order;
        });
        if (!n) {
            var r = "`" + t + "`";
            console.warn("`" + o + "`" + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!");
        }
        return n;
    }
    function j(e) {
        return "end" === e ? "start" : "start" === e ? "end" : e;
    }
    function K(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], o = le.indexOf(e), i = le.slice(o + 1).concat(le.slice(0, o));
        return t ? i.reverse() : i;
    }
    function q(e, t, o, i) {
        var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), r = +n[1], p = n[2];
        if (!r) return e;
        if (0 === p.indexOf("%")) {
            var s;
            switch (p) {
              case "%p":
                s = o;
                break;

              case "%":
              case "%r":
              default:
                s = i;
            }
            var d = h(s);
            return d[t] / 100 * r;
        }
        if ("vh" === p || "vw" === p) {
            var a;
            return a = "vh" === p ? X(document.documentElement.clientHeight, window.innerHeight || 0) : X(document.documentElement.clientWidth, window.innerWidth || 0), 
            a / 100 * r;
        }
        return r;
    }
    function G(e, t, o, i) {
        var n = [ 0, 0 ], r = -1 !== [ "right", "left" ].indexOf(i), p = e.split(/(\+|\-)/).map(function(e) {
            return e.trim();
        }), s = p.indexOf(T(p, function(e) {
            return -1 !== e.search(/,|\s/);
        }));
        p[s] && -1 === p[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var d = /\s*,\s*|\s+/, a = -1 === s ? [ p ] : [ p.slice(0, s).concat([ p[s].split(d)[0] ]), [ p[s].split(d)[1] ].concat(p.slice(s + 1)) ];
        return a = a.map(function(e, i) {
            var n = (1 === i ? !r : r) ? "height" : "width", p = !1;
            return e.reduce(function(e, t) {
                return "" === e[e.length - 1] && -1 !== [ "+", "-" ].indexOf(t) ? (e[e.length - 1] = t, 
                p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t);
            }, []).map(function(e) {
                return q(e, n, t, o);
            });
        }), a.forEach(function(e, t) {
            e.forEach(function(o, i) {
                R(o) && (n[t] += o * ("-" === e[i - 1] ? -1 : 1));
            });
        }), n;
    }
    function z(e, t) {
        var o, i = t.offset, n = e.placement, r = e.offsets, p = r.popper, s = r.reference, d = n.split("-")[0];
        return o = R(+i) ? [ +i, 0 ] : G(i, p, s, d), "left" === d ? (p.top += o[0], p.left -= o[1]) : "right" === d ? (p.top += o[0], 
        p.left += o[1]) : "top" === d ? (p.left += o[0], p.top -= o[1]) : "bottom" === d && (p.left += o[0], 
        p.top += o[1]), e.popper = p, e;
    }
    for (var V = Math.min, _ = Math.floor, X = Math.max, Q = [ "native code", "[object MutationObserverConstructor]" ], J = function(e) {
        return Q.some(function(t) {
            return -1 < (e || "").toString().indexOf(t);
        });
    }, Z = "undefined" != typeof window, $ = [ "Edge", "Trident", "Firefox" ], ee = 0, te = 0; te < $.length; te += 1) if (Z && 0 <= navigator.userAgent.indexOf($[te])) {
        ee = 1;
        break;
    }
    var i, oe = Z && J(window.MutationObserver), ie = oe ? function(e) {
        var t = !1, o = 0, i = document.createElement("span"), n = new MutationObserver(function() {
            e(), t = !1;
        });
        return n.observe(i, {
            attributes: !0
        }), function() {
            t || (t = !0, i.setAttribute("x-index", o), ++o);
        };
    } : function(e) {
        var t = !1;
        return function() {
            t || (t = !0, setTimeout(function() {
                t = !1, e();
            }, ee));
        };
    }, ne = function() {
        return void 0 == i && (i = -1 !== navigator.appVersion.indexOf("MSIE 10")), i;
    }, re = function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }, pe = function() {
        function e(e, t) {
            for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, 
            o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
        return function(t, o, i) {
            return o && e(t.prototype, o), i && e(t, i), t;
        };
    }(), se = function(e, t, o) {
        return t in e ? Object.defineProperty(e, t, {
            value: o,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = o, e;
    }, de = Object.assign || function(e) {
        for (var t, o = 1; o < arguments.length; o++) for (var i in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e;
    }, ae = [ "auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start" ], le = ae.slice(3), fe = {
        FLIP: "flip",
        CLOCKWISE: "clockwise",
        COUNTERCLOCKWISE: "counterclockwise"
    }, me = function() {
        function t(o, i) {
            var n = this, r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
            re(this, t), this.scheduleUpdate = function() {
                return requestAnimationFrame(n.update);
            }, this.update = ie(this.update.bind(this)), this.options = de({}, t.Defaults, r), 
            this.state = {
                isDestroyed: !1,
                isCreated: !1,
                scrollParents: []
            }, this.reference = o.jquery ? o[0] : o, this.popper = i.jquery ? i[0] : i, this.options.modifiers = {}, 
            Object.keys(de({}, t.Defaults.modifiers, r.modifiers)).forEach(function(e) {
                n.options.modifiers[e] = de({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {});
            }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                return de({
                    name: e
                }, n.options.modifiers[e]);
            }).sort(function(e, t) {
                return e.order - t.order;
            }), this.modifiers.forEach(function(t) {
                t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state);
            }), this.update();
            var p = this.options.eventsEnabled;
            p && this.enableEventListeners(), this.state.eventsEnabled = p;
        }
        return pe(t, [ {
            key: "update",
            value: function() {
                return k.call(this);
            }
        }, {
            key: "destroy",
            value: function() {
                return P.call(this);
            }
        }, {
            key: "enableEventListeners",
            value: function() {
                return A.call(this);
            }
        }, {
            key: "disableEventListeners",
            value: function() {
                return I.call(this);
            }
        } ]), t;
    }();
    return me.Utils = ("undefined" == typeof window ? global : window).PopperUtils, 
    me.placements = ae, me.Defaults = {
        placement: "bottom",
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement, o = t.split("-")[0], i = t.split("-")[1];
                    if (i) {
                        var n = e.offsets, r = n.reference, p = n.popper, s = -1 !== [ "bottom", "top" ].indexOf(o), d = s ? "left" : "top", a = s ? "width" : "height", l = {
                            start: se({}, d, r[d]),
                            end: se({}, d, r[d] + r[a] - p[a])
                        };
                        e.offsets.popper = de({}, p, l[i]);
                    }
                    return e;
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: z,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.boundariesElement || r(e.instance.popper);
                    e.instance.reference === o && (o = r(o));
                    var i = w(e.instance.popper, e.instance.reference, t.padding, o);
                    t.boundaries = i;
                    var n = t.priority, p = e.offsets.popper, s = {
                        primary: function(e) {
                            var o = p[e];
                            return p[e] < i[e] && !t.escapeWithReference && (o = X(p[e], i[e])), se({}, e, o);
                        },
                        secondary: function(e) {
                            var o = "right" === e ? "left" : "top", n = p[o];
                            return p[e] > i[e] && !t.escapeWithReference && (n = V(p[o], i[e] - ("right" === e ? p.width : p.height))), 
                            se({}, o, n);
                        }
                    };
                    return n.forEach(function(e) {
                        var t = -1 === [ "left", "top" ].indexOf(e) ? "secondary" : "primary";
                        p = de({}, p, s[t](e));
                    }), e.offsets.popper = p, e;
                },
                priority: [ "left", "right", "top", "bottom" ],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets, o = t.popper, i = t.reference, n = e.placement.split("-")[0], r = _, p = -1 !== [ "top", "bottom" ].indexOf(n), s = p ? "right" : "bottom", d = p ? "left" : "top", a = p ? "width" : "height";
                    return o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]), o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])), 
                    e;
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, o) {
                    if (!F(e.instance.modifiers, "arrow", "keepTogether")) return e;
                    var i = o.element;
                    if ("string" == typeof i) {
                        if (i = e.instance.popper.querySelector(i), !i) return e;
                    } else if (!e.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), 
                    e;
                    var n = e.placement.split("-")[0], r = e.offsets, p = r.popper, s = r.reference, d = -1 !== [ "left", "right" ].indexOf(n), a = d ? "height" : "width", l = d ? "Top" : "Left", f = l.toLowerCase(), m = d ? "left" : "top", c = d ? "bottom" : "right", g = O(i)[a];
                    s[c] - g < p[f] && (e.offsets.popper[f] -= p[f] - (s[c] - g)), s[f] + g > p[c] && (e.offsets.popper[f] += s[f] + g - p[c]);
                    var u = s[f] + s[a] / 2 - g / 2, b = t(e.instance.popper, "margin" + l).replace("px", ""), y = u - h(e.offsets.popper)[f] - b;
                    return y = X(V(p[a] - g, y), 0), e.arrowElement = i, e.offsets.arrow = {}, e.offsets.arrow[f] = Math.round(y), 
                    e.offsets.arrow[m] = "", e;
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (W(e.instance.modifiers, "inner")) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var o = w(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement), i = e.placement.split("-")[0], n = L(i), r = e.placement.split("-")[1] || "", p = [];
                    switch (t.behavior) {
                      case fe.FLIP:
                        p = [ i, n ];
                        break;

                      case fe.CLOCKWISE:
                        p = K(i);
                        break;

                      case fe.COUNTERCLOCKWISE:
                        p = K(i, !0);
                        break;

                      default:
                        p = t.behavior;
                    }
                    return p.forEach(function(s, d) {
                        if (i !== s || p.length === d + 1) return e;
                        i = e.placement.split("-")[0], n = L(i);
                        var a = e.offsets.popper, l = e.offsets.reference, f = _, m = "left" === i && f(a.right) > f(l.left) || "right" === i && f(a.left) < f(l.right) || "top" === i && f(a.bottom) > f(l.top) || "bottom" === i && f(a.top) < f(l.bottom), c = f(a.left) < f(o.left), h = f(a.right) > f(o.right), g = f(a.top) < f(o.top), u = f(a.bottom) > f(o.bottom), b = "left" === i && c || "right" === i && h || "top" === i && g || "bottom" === i && u, y = -1 !== [ "top", "bottom" ].indexOf(i), w = !!t.flipVariations && (y && "start" === r && c || y && "end" === r && h || !y && "start" === r && g || !y && "end" === r && u);
                        (m || b || w) && (e.flipped = !0, (m || b) && (i = p[d + 1]), w && (r = j(r)), e.placement = i + (r ? "-" + r : ""), 
                        e.offsets.popper = de({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), 
                        e = N(e.instance.modifiers, e, "flip"));
                    }), e;
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement, o = t.split("-")[0], i = e.offsets, n = i.popper, r = i.reference, p = -1 !== [ "left", "right" ].indexOf(o), s = -1 === [ "top", "left" ].indexOf(o);
                    return n[p ? "left" : "top"] = r[o] - (s ? n[p ? "width" : "height"] : 0), e.placement = L(t), 
                    e.offsets.popper = h(n), e;
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!F(e.instance.modifiers, "hide", "preventOverflow")) return e;
                    var t = e.offsets.reference, o = T(e.instance.modifiers, function(e) {
                        return "preventOverflow" === e.name;
                    }).boundaries;
                    if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes["x-out-of-boundaries"] = "";
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes["x-out-of-boundaries"] = !1;
                    }
                    return e;
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.x, i = t.y, n = e.offsets.popper, p = T(e.instance.modifiers, function(e) {
                        return "applyStyle" === e.name;
                    }).gpuAcceleration;
                    void 0 !== p && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var s, d, a = void 0 === p ? t.gpuAcceleration : p, l = r(e.instance.popper), f = g(l), m = {
                        position: n.position
                    }, c = {
                        left: _(n.left),
                        top: _(n.top),
                        bottom: _(n.bottom),
                        right: _(n.right)
                    }, h = "bottom" === o ? "top" : "bottom", u = "right" === i ? "left" : "right", b = B("transform");
                    if (d = "bottom" == h ? -f.height + c.bottom : c.top, s = "right" == u ? -f.width + c.right : c.left, 
                    a && b) m[b] = "translate3d(" + s + "px, " + d + "px, 0)", m[h] = 0, m[u] = 0, m.willChange = "transform"; else {
                        var y = "bottom" == h ? -1 : 1, w = "right" == u ? -1 : 1;
                        m[h] = d * y, m[u] = s * w, m.willChange = h + ", " + u;
                    }
                    var E = {
                        "x-placement": e.placement
                    };
                    return e.attributes = de({}, E, e.attributes), e.styles = de({}, m, e.styles), e.arrowStyles = de({}, e.offsets.arrow, e.arrowStyles), 
                    e;
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return U(e.instance.popper, e.styles), Y(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && U(e.arrowElement, e.arrowStyles), 
                    e;
                },
                onLoad: function(e, t, o, i, n) {
                    var r = x(n, t, e), p = v(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                    return t.setAttribute("x-placement", p), U(t, {
                        position: "absolute"
                    }), o;
                },
                gpuAcceleration: void 0
            }
        }
    }, me;
});

var Util = function($) {
    var transition = false;
    var MAX_UID = 1e6;
    function toType(obj) {
        return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    function getSpecialTransitionEndEvent() {
        return {
            bindType: transition.end,
            delegateType: transition.end,
            handle: function handle(event) {
                if ($(event.target).is(this)) {
                    return event.handleObj.handler.apply(this, arguments);
                }
                return undefined;
            }
        };
    }
    function transitionEndTest() {
        if (typeof window !== "undefined" && window.QUnit) {
            return false;
        }
        return {
            end: "transitionend"
        };
    }
    function transitionEndEmulator(duration) {
        var _this = this;
        var called = false;
        $(this).one(Util.TRANSITION_END, function() {
            called = true;
        });
        setTimeout(function() {
            if (!called) {
                Util.triggerTransitionEnd(_this);
            }
        }, duration);
        return this;
    }
    function setTransitionEndSupport() {
        transition = transitionEndTest();
        $.fn.emulateTransitionEnd = transitionEndEmulator;
        if (Util.supportsTransitionEnd()) {
            $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
        }
    }
    function escapeId(selector) {
        selector = typeof $.escapeSelector === "function" ? $.escapeSelector(selector).substr(1) : selector.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1");
        return selector;
    }
    var Util = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function getUID(prefix) {
            do {
                prefix += ~~(Math.random() * MAX_UID);
            } while (document.getElementById(prefix));
            return prefix;
        },
        getSelectorFromElement: function getSelectorFromElement(element) {
            var selector = element.getAttribute("data-target");
            if (!selector || selector === "#") {
                selector = element.getAttribute("href") || "";
            }
            if (selector.charAt(0) === "#") {
                selector = escapeId(selector);
            }
            try {
                var $selector = $(document).find(selector);
                return $selector.length > 0 ? selector : null;
            } catch (err) {
                return null;
            }
        },
        reflow: function reflow(element) {
            return element.offsetHeight;
        },
        triggerTransitionEnd: function triggerTransitionEnd(element) {
            $(element).trigger(transition.end);
        },
        supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(transition);
        },
        isElement: function isElement(obj) {
            return (obj[0] || obj).nodeType;
        },
        typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
            for (var property in configTypes) {
                if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
                    var expectedTypes = configTypes[property];
                    var value = config[property];
                    var valueType = value && Util.isElement(value) ? "element" : toType(value);
                    if (!new RegExp(expectedTypes).test(valueType)) {
                        throw new Error(componentName.toUpperCase() + ": " + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
                    }
                }
            }
        }
    };
    setTransitionEndSupport();
    return Util;
}($);

function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Collapse = function($) {
    var NAME = "collapse";
    var VERSION = "4.0.0";
    var DATA_KEY = "bs.collapse";
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = ".data-api";
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 600;
    var Default = {
        toggle: true,
        parent: ""
    };
    var DefaultType = {
        toggle: "boolean",
        parent: "(string|element)"
    };
    var Event = {
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        SHOW: "show",
        COLLAPSE: "collapse",
        COLLAPSING: "collapsing",
        COLLAPSED: "collapsed"
    };
    var Dimension = {
        WIDTH: "width",
        HEIGHT: "height"
    };
    var Selector = {
        ACTIVES: ".show, .collapsing",
        DATA_TOGGLE: '[data-toggle="collapse"]'
    };
    var Collapse = function() {
        function Collapse(element, config) {
            this._isTransitioning = false;
            this._element = element;
            this._config = this._getConfig(config);
            this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));
            var tabToggles = $(Selector.DATA_TOGGLE);
            for (var i = 0; i < tabToggles.length; i++) {
                var elem = tabToggles[i];
                var selector = Util.getSelectorFromElement(elem);
                if (selector !== null && $(selector).filter(element).length > 0) {
                    this._selector = selector;
                    this._triggerArray.push(elem);
                }
            }
            this._parent = this._config.parent ? this._getParent() : null;
            if (!this._config.parent) {
                this._addAriaAndCollapsedClass(this._element, this._triggerArray);
            }
            if (this._config.toggle) {
                this.toggle();
            }
        }
        var _proto = Collapse.prototype;
        _proto.toggle = function toggle() {
            if ($(this._element).hasClass(ClassName.SHOW)) {
                this.hide();
            } else {
                this.show();
            }
        };
        _proto.show = function show() {
            var _this = this;
            if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) {
                return;
            }
            var actives;
            var activesData;
            if (this._parent) {
                actives = $.makeArray($(this._parent).find(Selector.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'));
                if (actives.length === 0) {
                    actives = null;
                }
            }
            if (actives) {
                activesData = $(actives).not(this._selector).data(DATA_KEY);
                if (activesData && activesData._isTransitioning) {
                    return;
                }
            }
            var startEvent = $.Event(Event.SHOW);
            $(this._element).trigger(startEvent);
            if (startEvent.isDefaultPrevented()) {
                return;
            }
            if (actives) {
                Collapse._jQueryInterface.call($(actives).not(this._selector), "hide");
                if (!activesData) {
                    $(actives).data(DATA_KEY, null);
                }
            }
            var dimension = this._getDimension();
            $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
            this._element.style[dimension] = 0;
            if (this._triggerArray.length > 0) {
                $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr("aria-expanded", true);
            }
            this.setTransitioning(true);
            var complete = function complete() {
                $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
                _this._element.style[dimension] = "";
                _this.setTransitioning(false);
                $(_this._element).trigger(Event.SHOWN);
            };
            if (!Util.supportsTransitionEnd()) {
                complete();
                return;
            }
            var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
            var scrollSize = "scroll" + capitalizedDimension;
            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
            this._element.style[dimension] = this._element[scrollSize] + "px";
        };
        _proto.hide = function hide() {
            var _this2 = this;
            if (this._isTransitioning || !$(this._element).hasClass(ClassName.SHOW)) {
                return;
            }
            var startEvent = $.Event(Event.HIDE);
            $(this._element).trigger(startEvent);
            if (startEvent.isDefaultPrevented()) {
                return;
            }
            var dimension = this._getDimension();
            this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
            Util.reflow(this._element);
            $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
            if (this._triggerArray.length > 0) {
                for (var i = 0; i < this._triggerArray.length; i++) {
                    var trigger = this._triggerArray[i];
                    var selector = Util.getSelectorFromElement(trigger);
                    if (selector !== null) {
                        var $elem = $(selector);
                        if (!$elem.hasClass(ClassName.SHOW)) {
                            $(trigger).addClass(ClassName.COLLAPSED).attr("aria-expanded", false);
                        }
                    }
                }
            }
            this.setTransitioning(true);
            var complete = function complete() {
                _this2.setTransitioning(false);
                $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
            };
            this._element.style[dimension] = "";
            if (!Util.supportsTransitionEnd()) {
                complete();
                return;
            }
            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        };
        _proto.setTransitioning = function setTransitioning(isTransitioning) {
            this._isTransitioning = isTransitioning;
        };
        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY);
            this._config = null;
            this._parent = null;
            this._element = null;
            this._triggerArray = null;
            this._isTransitioning = null;
        };
        _proto._getConfig = function _getConfig(config) {
            config = _extends({}, Default, config);
            config.toggle = Boolean(config.toggle);
            Util.typeCheckConfig(NAME, config, DefaultType);
            return config;
        };
        _proto._getDimension = function _getDimension() {
            var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
            return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
        };
        _proto._getParent = function _getParent() {
            var _this3 = this;
            var parent = null;
            if (Util.isElement(this._config.parent)) {
                parent = this._config.parent;
                if (typeof this._config.parent.jquery !== "undefined") {
                    parent = this._config.parent[0];
                }
            } else {
                parent = $(this._config.parent)[0];
            }
            var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
            $(parent).find(selector).each(function(i, element) {
                _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [ element ]);
            });
            return parent;
        };
        _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
            if (element) {
                var isOpen = $(element).hasClass(ClassName.SHOW);
                if (triggerArray.length > 0) {
                    $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr("aria-expanded", isOpen);
                }
            }
        };
        Collapse._getTargetFromElement = function _getTargetFromElement(element) {
            var selector = Util.getSelectorFromElement(element);
            return selector ? $(selector)[0] : null;
        };
        Collapse._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data(DATA_KEY);
                var _config = _extends({}, Default, $this.data(), typeof config === "object" && config);
                if (!data && _config.toggle && /show|hide/.test(config)) {
                    _config.toggle = false;
                }
                if (!data) {
                    data = new Collapse(this, _config);
                    $this.data(DATA_KEY, data);
                }
                if (typeof config === "string") {
                    if (typeof data[config] === "undefined") {
                        throw new TypeError('No method named "' + config + '"');
                    }
                    data[config]();
                }
            });
        };
        _createClass(Collapse, null, [ {
            key: "VERSION",
            get: function get() {
                return VERSION;
            }
        }, {
            key: "Default",
            get: function get() {
                return Default;
            }
        } ]);
        return Collapse;
    }();
    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
        if (event.currentTarget.tagName === "A") {
            event.preventDefault();
        }
        var $trigger = $(this);
        var selector = Util.getSelectorFromElement(this);
        $(selector).each(function() {
            var $target = $(this);
            var data = $target.data(DATA_KEY);
            var config = data ? "toggle" : $trigger.data();
            Collapse._jQueryInterface.call($target, config);
        });
    });
    $.fn[NAME] = Collapse._jQueryInterface;
    $.fn[NAME].Constructor = Collapse;
    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Collapse._jQueryInterface;
    };
    return Collapse;
}($);

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Tab = function($) {
    var NAME = "tab";
    var VERSION = "4.0.0";
    var DATA_KEY = "bs.tab";
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = ".data-api";
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;
    var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        DROPDOWN_MENU: "dropdown-menu",
        ACTIVE: "active",
        DISABLED: "disabled",
        FADE: "fade",
        SHOW: "show"
    };
    var Selector = {
        DROPDOWN: ".dropdown",
        NAV_LIST_GROUP: ".nav, .list-group",
        ACTIVE: ".active",
        ACTIVE_UL: "> li > .active",
        DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        DROPDOWN_TOGGLE: ".dropdown-toggle",
        DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
    };
    var Tab = function() {
        function Tab(element) {
            this._element = element;
        }
        var _proto = Tab.prototype;
        _proto.show = function show() {
            var _this = this;
            if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
                return;
            }
            var target;
            var previous;
            var listElement = $(this._element).closest(Selector.NAV_LIST_GROUP)[0];
            var selector = Util.getSelectorFromElement(this._element);
            if (listElement) {
                var itemSelector = listElement.nodeName === "UL" ? Selector.ACTIVE_UL : Selector.ACTIVE;
                previous = $.makeArray($(listElement).find(itemSelector));
                previous = previous[previous.length - 1];
            }
            var hideEvent = $.Event(Event.HIDE, {
                relatedTarget: this._element
            });
            var showEvent = $.Event(Event.SHOW, {
                relatedTarget: previous
            });
            if (previous) {
                $(previous).trigger(hideEvent);
            }
            $(this._element).trigger(showEvent);
            if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
                return;
            }
            if (selector) {
                target = $(selector)[0];
            }
            this._activate(this._element, listElement);
            var complete = function complete() {
                var hiddenEvent = $.Event(Event.HIDDEN, {
                    relatedTarget: _this._element
                });
                var shownEvent = $.Event(Event.SHOWN, {
                    relatedTarget: previous
                });
                $(previous).trigger(hiddenEvent);
                $(_this._element).trigger(shownEvent);
            };
            if (target) {
                this._activate(target, target.parentNode, complete);
            } else {
                complete();
            }
        };
        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY);
            this._element = null;
        };
        _proto._activate = function _activate(element, container, callback) {
            var _this2 = this;
            var activeElements;
            if (container.nodeName === "UL") {
                activeElements = $(container).find(Selector.ACTIVE_UL);
            } else {
                activeElements = $(container).children(Selector.ACTIVE);
            }
            var active = activeElements[0];
            var isTransitioning = callback && Util.supportsTransitionEnd() && active && $(active).hasClass(ClassName.FADE);
            var complete = function complete() {
                return _this2._transitionComplete(element, active, callback);
            };
            if (active && isTransitioning) {
                $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
            } else {
                complete();
            }
        };
        _proto._transitionComplete = function _transitionComplete(element, active, callback) {
            if (active) {
                $(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
                var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];
                if (dropdownChild) {
                    $(dropdownChild).removeClass(ClassName.ACTIVE);
                }
                if (active.getAttribute("role") === "tab") {
                    active.setAttribute("aria-selected", false);
                }
            }
            $(element).addClass(ClassName.ACTIVE);
            if (element.getAttribute("role") === "tab") {
                element.setAttribute("aria-selected", true);
            }
            Util.reflow(element);
            $(element).addClass(ClassName.SHOW);
            if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
                var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
                if (dropdownElement) {
                    $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                }
                element.setAttribute("aria-expanded", true);
            }
            if (callback) {
                callback();
            }
        };
        Tab._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data(DATA_KEY);
                if (!data) {
                    data = new Tab(this);
                    $this.data(DATA_KEY, data);
                }
                if (typeof config === "string") {
                    if (typeof data[config] === "undefined") {
                        throw new TypeError('No method named "' + config + '"');
                    }
                    data[config]();
                }
            });
        };
        _createClass(Tab, null, [ {
            key: "VERSION",
            get: function get() {
                return VERSION;
            }
        } ]);
        return Tab;
    }();
    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
        event.preventDefault();
        Tab._jQueryInterface.call($(this), "show");
    });
    $.fn[NAME] = Tab._jQueryInterface;
    $.fn[NAME].Constructor = Tab;
    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Tab._jQueryInterface;
    };
    return Tab;
}($);

function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Modal = function($) {
    var NAME = "modal";
    var VERSION = "4.0.0";
    var DATA_KEY = "bs.modal";
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = ".data-api";
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 300;
    var BACKDROP_TRANSITION_DURATION = 150;
    var ESCAPE_KEYCODE = 27;
    var Default = {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: true
    };
    var DefaultType = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean"
    };
    var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        FOCUSIN: "focusin" + EVENT_KEY,
        RESIZE: "resize" + EVENT_KEY,
        CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
        KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
        MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        SCROLLBAR_MEASURER: "modal-scrollbar-measure",
        BACKDROP: "modal-backdrop",
        OPEN: "modal-open",
        FADE: "fade",
        SHOW: "show"
    };
    var Selector = {
        DIALOG: ".modal-dialog",
        DATA_TOGGLE: '[data-toggle="modal"]',
        DATA_DISMISS: '[data-dismiss="modal"]',
        FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        STICKY_CONTENT: ".sticky-top",
        NAVBAR_TOGGLER: ".navbar-toggler"
    };
    var Modal = function() {
        function Modal(element, config) {
            this._config = this._getConfig(config);
            this._element = element;
            this._dialog = $(element).find(Selector.DIALOG)[0];
            this._backdrop = null;
            this._isShown = false;
            this._isBodyOverflowing = false;
            this._ignoreBackdropClick = false;
            this._originalBodyPadding = 0;
            this._scrollbarWidth = 0;
        }
        var _proto = Modal.prototype;
        _proto.toggle = function toggle(relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
        };
        _proto.show = function show(relatedTarget) {
            var _this = this;
            if (this._isTransitioning || this._isShown) {
                return;
            }
            if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
                this._isTransitioning = true;
            }
            var showEvent = $.Event(Event.SHOW, {
                relatedTarget: relatedTarget
            });
            $(this._element).trigger(showEvent);
            if (this._isShown || showEvent.isDefaultPrevented()) {
                return;
            }
            this._isShown = true;
            this._checkScrollbar();
            this._setScrollbar();
            this._adjustDialog();
            $(document.body).addClass(ClassName.OPEN);
            this._setEscapeEvent();
            this._setResizeEvent();
            $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function(event) {
                return _this.hide(event);
            });
            $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function() {
                $(_this._element).one(Event.MOUSEUP_DISMISS, function(event) {
                    if ($(event.target).is(_this._element)) {
                        _this._ignoreBackdropClick = true;
                    }
                });
            });
            this._showBackdrop(function() {
                return _this._showElement(relatedTarget);
            });
        };
        _proto.hide = function hide(event) {
            var _this2 = this;
            if (event) {
                event.preventDefault();
            }
            if (this._isTransitioning || !this._isShown) {
                return;
            }
            var hideEvent = $.Event(Event.HIDE);
            $(this._element).trigger(hideEvent);
            if (!this._isShown || hideEvent.isDefaultPrevented()) {
                return;
            }
            this._isShown = false;
            var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
            if (transition) {
                this._isTransitioning = true;
            }
            this._setEscapeEvent();
            this._setResizeEvent();
            $(document).off(Event.FOCUSIN);
            $(this._element).removeClass(ClassName.SHOW);
            $(this._element).off(Event.CLICK_DISMISS);
            $(this._dialog).off(Event.MOUSEDOWN_DISMISS);
            if (transition) {
                $(this._element).one(Util.TRANSITION_END, function(event) {
                    return _this2._hideModal(event);
                }).emulateTransitionEnd(TRANSITION_DURATION);
            } else {
                this._hideModal();
            }
        };
        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY);
            $(window, document, this._element, this._backdrop).off(EVENT_KEY);
            this._config = null;
            this._element = null;
            this._dialog = null;
            this._backdrop = null;
            this._isShown = null;
            this._isBodyOverflowing = null;
            this._ignoreBackdropClick = null;
            this._scrollbarWidth = null;
        };
        _proto.handleUpdate = function handleUpdate() {
            this._adjustDialog();
        };
        _proto._getConfig = function _getConfig(config) {
            config = _extends({}, Default, config);
            Util.typeCheckConfig(NAME, config, DefaultType);
            return config;
        };
        _proto._showElement = function _showElement(relatedTarget) {
            var _this3 = this;
            var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
            if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                document.body.appendChild(this._element);
            }
            this._element.style.display = "block";
            this._element.removeAttribute("aria-hidden");
            this._element.scrollTop = 0;
            if (transition) {
                Util.reflow(this._element);
            }
            $(this._element).addClass(ClassName.SHOW);
            if (this._config.focus) {
                this._enforceFocus();
            }
            var shownEvent = $.Event(Event.SHOWN, {
                relatedTarget: relatedTarget
            });
            var transitionComplete = function transitionComplete() {
                if (_this3._config.focus) {
                    _this3._element.focus();
                }
                _this3._isTransitioning = false;
                $(_this3._element).trigger(shownEvent);
            };
            if (transition) {
                $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
            } else {
                transitionComplete();
            }
        };
        _proto._enforceFocus = function _enforceFocus() {
            var _this4 = this;
            $(document).off(Event.FOCUSIN).on(Event.FOCUSIN, function(event) {
                if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
                    _this4._element.focus();
                }
            });
        };
        _proto._setEscapeEvent = function _setEscapeEvent() {
            var _this5 = this;
            if (this._isShown && this._config.keyboard) {
                $(this._element).on(Event.KEYDOWN_DISMISS, function(event) {
                    if (event.which === ESCAPE_KEYCODE) {
                        event.preventDefault();
                        _this5.hide();
                    }
                });
            } else if (!this._isShown) {
                $(this._element).off(Event.KEYDOWN_DISMISS);
            }
        };
        _proto._setResizeEvent = function _setResizeEvent() {
            var _this6 = this;
            if (this._isShown) {
                $(window).on(Event.RESIZE, function(event) {
                    return _this6.handleUpdate(event);
                });
            } else {
                $(window).off(Event.RESIZE);
            }
        };
        _proto._hideModal = function _hideModal() {
            var _this7 = this;
            this._element.style.display = "none";
            this._element.setAttribute("aria-hidden", true);
            this._isTransitioning = false;
            this._showBackdrop(function() {
                $(document.body).removeClass(ClassName.OPEN);
                _this7._resetAdjustments();
                _this7._resetScrollbar();
                $(_this7._element).trigger(Event.HIDDEN);
            });
        };
        _proto._removeBackdrop = function _removeBackdrop() {
            if (this._backdrop) {
                $(this._backdrop).remove();
                this._backdrop = null;
            }
        };
        _proto._showBackdrop = function _showBackdrop(callback) {
            var _this8 = this;
            var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : "";
            if (this._isShown && this._config.backdrop) {
                var doAnimate = Util.supportsTransitionEnd() && animate;
                this._backdrop = document.createElement("div");
                this._backdrop.className = ClassName.BACKDROP;
                if (animate) {
                    $(this._backdrop).addClass(animate);
                }
                $(this._backdrop).appendTo(document.body);
                $(this._element).on(Event.CLICK_DISMISS, function(event) {
                    if (_this8._ignoreBackdropClick) {
                        _this8._ignoreBackdropClick = false;
                        return;
                    }
                    if (event.target !== event.currentTarget) {
                        return;
                    }
                    if (_this8._config.backdrop === "static") {
                        _this8._element.focus();
                    } else {
                        _this8.hide();
                    }
                });
                if (doAnimate) {
                    Util.reflow(this._backdrop);
                }
                $(this._backdrop).addClass(ClassName.SHOW);
                if (!callback) {
                    return;
                }
                if (!doAnimate) {
                    callback();
                    return;
                }
                $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
            } else if (!this._isShown && this._backdrop) {
                $(this._backdrop).removeClass(ClassName.SHOW);
                var callbackRemove = function callbackRemove() {
                    _this8._removeBackdrop();
                    if (callback) {
                        callback();
                    }
                };
                if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
                    $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
                } else {
                    callbackRemove();
                }
            } else if (callback) {
                callback();
            }
        };
        _proto._adjustDialog = function _adjustDialog() {
            var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
            if (!this._isBodyOverflowing && isModalOverflowing) {
                this._element.style.paddingLeft = this._scrollbarWidth + "px";
            }
            if (this._isBodyOverflowing && !isModalOverflowing) {
                this._element.style.paddingRight = this._scrollbarWidth + "px";
            }
        };
        _proto._resetAdjustments = function _resetAdjustments() {
            this._element.style.paddingLeft = "";
            this._element.style.paddingRight = "";
        };
        _proto._checkScrollbar = function _checkScrollbar() {
            var rect = document.body.getBoundingClientRect();
            this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
            this._scrollbarWidth = this._getScrollbarWidth();
        };
        _proto._setScrollbar = function _setScrollbar() {
            var _this9 = this;
            if (this._isBodyOverflowing) {
                $(Selector.FIXED_CONTENT).each(function(index, element) {
                    var actualPadding = $(element)[0].style.paddingRight;
                    var calculatedPadding = $(element).css("padding-right");
                    $(element).data("padding-right", actualPadding).css("padding-right", parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
                });
                $(Selector.STICKY_CONTENT).each(function(index, element) {
                    var actualMargin = $(element)[0].style.marginRight;
                    var calculatedMargin = $(element).css("margin-right");
                    $(element).data("margin-right", actualMargin).css("margin-right", parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
                });
                $(Selector.NAVBAR_TOGGLER).each(function(index, element) {
                    var actualMargin = $(element)[0].style.marginRight;
                    var calculatedMargin = $(element).css("margin-right");
                    $(element).data("margin-right", actualMargin).css("margin-right", parseFloat(calculatedMargin) + _this9._scrollbarWidth + "px");
                });
                var actualPadding = document.body.style.paddingRight;
                var calculatedPadding = $("body").css("padding-right");
                $("body").data("padding-right", actualPadding).css("padding-right", parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
            }
        };
        _proto._resetScrollbar = function _resetScrollbar() {
            $(Selector.FIXED_CONTENT).each(function(index, element) {
                var padding = $(element).data("padding-right");
                if (typeof padding !== "undefined") {
                    $(element).css("padding-right", padding).removeData("padding-right");
                }
            });
            $(Selector.STICKY_CONTENT + ", " + Selector.NAVBAR_TOGGLER).each(function(index, element) {
                var margin = $(element).data("margin-right");
                if (typeof margin !== "undefined") {
                    $(element).css("margin-right", margin).removeData("margin-right");
                }
            });
            var padding = $("body").data("padding-right");
            if (typeof padding !== "undefined") {
                $("body").css("padding-right", padding).removeData("padding-right");
            }
        };
        _proto._getScrollbarWidth = function _getScrollbarWidth() {
            var scrollDiv = document.createElement("div");
            scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
            document.body.appendChild(scrollDiv);
            var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
            return scrollbarWidth;
        };
        Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
            return this.each(function() {
                var data = $(this).data(DATA_KEY);
                var _config = _extends({}, Modal.Default, $(this).data(), typeof config === "object" && config);
                if (!data) {
                    data = new Modal(this, _config);
                    $(this).data(DATA_KEY, data);
                }
                if (typeof config === "string") {
                    if (typeof data[config] === "undefined") {
                        throw new TypeError('No method named "' + config + '"');
                    }
                    data[config](relatedTarget);
                } else if (_config.show) {
                    data.show(relatedTarget);
                }
            });
        };
        _createClass(Modal, null, [ {
            key: "VERSION",
            get: function get() {
                return VERSION;
            }
        }, {
            key: "Default",
            get: function get() {
                return Default;
            }
        } ]);
        return Modal;
    }();
    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
        var _this10 = this;
        var target;
        var selector = Util.getSelectorFromElement(this);
        if (selector) {
            target = $(selector)[0];
        }
        var config = $(target).data(DATA_KEY) ? "toggle" : _extends({}, $(target).data(), $(this).data());
        if (this.tagName === "A" || this.tagName === "AREA") {
            event.preventDefault();
        }
        var $target = $(target).one(Event.SHOW, function(showEvent) {
            if (showEvent.isDefaultPrevented()) {
                return;
            }
            $target.one(Event.HIDDEN, function() {
                if ($(_this10).is(":visible")) {
                    _this10.focus();
                }
            });
        });
        Modal._jQueryInterface.call($(target), config, this);
    });
    $.fn[NAME] = Modal._jQueryInterface;
    $.fn[NAME].Constructor = Modal;
    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Modal._jQueryInterface;
    };
    return Modal;
}($);

function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Dropdown = function($) {
    var NAME = "dropdown";
    var VERSION = "4.0.0";
    var DATA_KEY = "bs.dropdown";
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = ".data-api";
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ESCAPE_KEYCODE = 27;
    var SPACE_KEYCODE = 32;
    var TAB_KEYCODE = 9;
    var ARROW_UP_KEYCODE = 38;
    var ARROW_DOWN_KEYCODE = 40;
    var RIGHT_MOUSE_BUTTON_WHICH = 3;
    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        CLICK: "click" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
        KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
        KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        DISABLED: "disabled",
        SHOW: "show",
        DROPUP: "dropup",
        DROPRIGHT: "dropright",
        DROPLEFT: "dropleft",
        MENURIGHT: "dropdown-menu-right",
        MENULEFT: "dropdown-menu-left",
        POSITION_STATIC: "position-static"
    };
    var Selector = {
        DATA_TOGGLE: '[data-toggle="dropdown"]',
        FORM_CHILD: ".dropdown form",
        MENU: ".dropdown-menu",
        NAVBAR_NAV: ".navbar-nav",
        VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled)"
    };
    var AttachmentMap = {
        TOP: "top-start",
        TOPEND: "top-end",
        BOTTOM: "bottom-start",
        BOTTOMEND: "bottom-end",
        RIGHT: "right-start",
        RIGHTEND: "right-end",
        LEFT: "left-start",
        LEFTEND: "left-end"
    };
    var Default = {
        offset: 0,
        flip: true,
        boundary: "scrollParent"
    };
    var DefaultType = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)"
    };
    var Dropdown = function() {
        function Dropdown(element, config) {
            this._element = element;
            this._popper = null;
            this._config = this._getConfig(config);
            this._menu = this._getMenuElement();
            this._inNavbar = this._detectNavbar();
            this._addEventListeners();
        }
        var _proto = Dropdown.prototype;
        _proto.toggle = function toggle() {
            if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED)) {
                return;
            }
            var parent = Dropdown._getParentFromElement(this._element);
            var isActive = $(this._menu).hasClass(ClassName.SHOW);
            Dropdown._clearMenus();
            if (isActive) {
                return;
            }
            var relatedTarget = {
                relatedTarget: this._element
            };
            var showEvent = $.Event(Event.SHOW, relatedTarget);
            $(parent).trigger(showEvent);
            if (showEvent.isDefaultPrevented()) {
                return;
            }
            if (!this._inNavbar) {
                if (typeof Popper === "undefined") {
                    throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                }
                var element = this._element;
                if ($(parent).hasClass(ClassName.DROPUP)) {
                    if ($(this._menu).hasClass(ClassName.MENULEFT) || $(this._menu).hasClass(ClassName.MENURIGHT)) {
                        element = parent;
                    }
                }
                if (this._config.boundary !== "scrollParent") {
                    $(parent).addClass(ClassName.POSITION_STATIC);
                }
                this._popper = new Popper(element, this._menu, this._getPopperConfig());
            }
            if ("ontouchstart" in document.documentElement && $(parent).closest(Selector.NAVBAR_NAV).length === 0) {
                $("body").children().on("mouseover", null, $.noop);
            }
            this._element.focus();
            this._element.setAttribute("aria-expanded", true);
            $(this._menu).toggleClass(ClassName.SHOW);
            $(parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
        };
        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY);
            $(this._element).off(EVENT_KEY);
            this._element = null;
            this._menu = null;
            if (this._popper !== null) {
                this._popper.destroy();
                this._popper = null;
            }
        };
        _proto.update = function update() {
            this._inNavbar = this._detectNavbar();
            if (this._popper !== null) {
                this._popper.scheduleUpdate();
            }
        };
        _proto._addEventListeners = function _addEventListeners() {
            var _this = this;
            $(this._element).on(Event.CLICK, function(event) {
                event.preventDefault();
                event.stopPropagation();
                _this.toggle();
            });
        };
        _proto._getConfig = function _getConfig(config) {
            config = _extends({}, this.constructor.Default, $(this._element).data(), config);
            Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
            return config;
        };
        _proto._getMenuElement = function _getMenuElement() {
            if (!this._menu) {
                var parent = Dropdown._getParentFromElement(this._element);
                this._menu = $(parent).find(Selector.MENU)[0];
            }
            return this._menu;
        };
        _proto._getPlacement = function _getPlacement() {
            var $parentDropdown = $(this._element).parent();
            var placement = AttachmentMap.BOTTOM;
            if ($parentDropdown.hasClass(ClassName.DROPUP)) {
                placement = AttachmentMap.TOP;
                if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
                    placement = AttachmentMap.TOPEND;
                }
            } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
                placement = AttachmentMap.RIGHT;
            } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
                placement = AttachmentMap.LEFT;
            } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
                placement = AttachmentMap.BOTTOMEND;
            }
            return placement;
        };
        _proto._detectNavbar = function _detectNavbar() {
            return $(this._element).closest(".navbar").length > 0;
        };
        _proto._getPopperConfig = function _getPopperConfig() {
            var _this2 = this;
            var offsetConf = {};
            if (typeof this._config.offset === "function") {
                offsetConf.fn = function(data) {
                    data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets) || {});
                    return data;
                };
            } else {
                offsetConf.offset = this._config.offset;
            }
            var popperConfig = {
                placement: this._getPlacement(),
                modifiers: {
                    offset: offsetConf,
                    flip: {
                        enabled: this._config.flip
                    },
                    preventOverflow: {
                        boundariesElement: this._config.boundary
                    }
                }
            };
            return popperConfig;
        };
        Dropdown._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function() {
                var data = $(this).data(DATA_KEY);
                var _config = typeof config === "object" ? config : null;
                if (!data) {
                    data = new Dropdown(this, _config);
                    $(this).data(DATA_KEY, data);
                }
                if (typeof config === "string") {
                    if (typeof data[config] === "undefined") {
                        throw new TypeError('No method named "' + config + '"');
                    }
                    data[config]();
                }
            });
        };
        Dropdown._clearMenus = function _clearMenus(event) {
            if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === "keyup" && event.which !== TAB_KEYCODE)) {
                return;
            }
            var toggles = $.makeArray($(Selector.DATA_TOGGLE));
            for (var i = 0; i < toggles.length; i++) {
                var parent = Dropdown._getParentFromElement(toggles[i]);
                var context = $(toggles[i]).data(DATA_KEY);
                var relatedTarget = {
                    relatedTarget: toggles[i]
                };
                if (!context) {
                    continue;
                }
                var dropdownMenu = context._menu;
                if (!$(parent).hasClass(ClassName.SHOW)) {
                    continue;
                }
                if (event && (event.type === "click" && /input|textarea/i.test(event.target.tagName) || event.type === "keyup" && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
                    continue;
                }
                var hideEvent = $.Event(Event.HIDE, relatedTarget);
                $(parent).trigger(hideEvent);
                if (hideEvent.isDefaultPrevented()) {
                    continue;
                }
                if ("ontouchstart" in document.documentElement) {
                    $("body").children().off("mouseover", null, $.noop);
                }
                toggles[i].setAttribute("aria-expanded", "false");
                $(dropdownMenu).removeClass(ClassName.SHOW);
                $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
            }
        };
        Dropdown._getParentFromElement = function _getParentFromElement(element) {
            var parent;
            var selector = Util.getSelectorFromElement(element);
            if (selector) {
                parent = $(selector)[0];
            }
            return parent || element.parentNode;
        };
        Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
            if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
                return;
            }
            var parent = Dropdown._getParentFromElement(this);
            var isActive = $(parent).hasClass(ClassName.SHOW);
            if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
                if (event.which === ESCAPE_KEYCODE) {
                    var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
                    $(toggle).trigger("focus");
                }
                $(this).trigger("click");
                return;
            }
            var items = $(parent).find(Selector.VISIBLE_ITEMS).get();
            if (items.length === 0) {
                return;
            }
            var index = items.indexOf(event.target);
            if (event.which === ARROW_UP_KEYCODE && index > 0) {
                index--;
            }
            if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
                index++;
            }
            if (index < 0) {
                index = 0;
            }
            items[index].focus();
        };
        _createClass(Dropdown, null, [ {
            key: "VERSION",
            get: function get() {
                return VERSION;
            }
        }, {
            key: "Default",
            get: function get() {
                return Default;
            }
        }, {
            key: "DefaultType",
            get: function get() {
                return DefaultType;
            }
        } ]);
        return Dropdown;
    }();
    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
        event.preventDefault();
        event.stopPropagation();
        Dropdown._jQueryInterface.call($(this), "toggle");
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function(e) {
        e.stopPropagation();
    });
    $.fn[NAME] = Dropdown._jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;
    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Dropdown._jQueryInterface;
    };
    return Dropdown;
}($, Popper);