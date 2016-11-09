
  
        try {
            Typekit.load();
        } catch (e) {}
 
  
        SQUARESPACE_ROLLUPS = {};
 
  
        (function (rollups, name) {
            if (!rollups[name]) {
                rollups[name] = {};
            }
            rollups[name].js = ["http://static.squarespace.com/universal/scripts-compressed/common-e9dbc29418e2a70ad388-min.js"];
        })(SQUARESPACE_ROLLUPS, 'squarespace-common');
 
  
        (function (rollups, name) {
            if (!rollups[name]) {
                rollups[name] = {};
            }
            rollups[name].js = ["http://static.squarespace.com/universal/scripts-compressed/commerce-ffe2d552e8a1a56ec0bd-min.js"];
        })(SQUARESPACE_ROLLUPS, 'squarespace-commerce');
 
  
        (function (rollups, name) {
            if (!rollups[name]) {
                rollups[name] = {};
            }
            rollups[name].css = ["http://static.squarespace.com/universal/styles-compressed/commerce-5ff3a810469d9b1346052dcaf72c56ae-min.css"];
        })(SQUARESPACE_ROLLUPS, 'squarespace-commerce');
 
    
        (function () {
            (function (a) {
                function e(b) {
                    -1 !== b.indexOf(".js") ? document.write("<script " + f + 'crossorigin="anonymous" src="' + b + '">\x3c/script>') : document.write('<link rel="stylesheet" type="text/css" href="' + b + '" />')
                }
                var g = function () {
                        var b = window.location.search,
                            a = b.indexOf("exclude=");
                        return -1 < a && (b = b.substr(a + 8).split("&")[0]) ? b.split(",") : []
                    }(),
                    f;
                f = window.__beta_flag_should_defer ? 'defer="defer" ' : "";
                try {
                    if (window.top != window && window.top.Squarespace && window.top.Squarespace.frameAvailable) {
                        window.top.Squarespace.frameAvailable(window,
                            SQUARESPACE_ROLLUPS);
                        return
                    }
                } catch (h) {
                    console.error(h)
                }
                for (var c in a)
                    if (!(-1 < g.indexOf(c))) {
                        if (a[c].js)
                            for (var d = 0; d < a[c].js.length; d++) e(a[c].js[d]);
                        if (a[c].css)
                            for (d = 0; d < a[c].css.length; d++) e(a[c].css[d])
                    }
            })(SQUARESPACE_ROLLUPS);
        })();
 

        (function () {
            var EXCLUDED_SIZES = function () {
                    var a = window.location.search,
                        b = a.indexOf("exclude_imageloader_sizes=");
                    return -1 < b && (a = a.substr(b + 26).split("&")[0]) ? a.split(",").map(function (a) {
                        return parseInt(a, 10)
                    }) : []
                }(),
                SQUARESPACE_SIZES = [2500, 1500, 1E3, 750, 500, 300, 100].filter(function (a) {
                    return -1 === EXCLUDED_SIZES.indexOf(a)
                }),
                IMAGE_LOADING_CLASS = "loading",
                ImageLoader = new function () {
                    this.load = function (a, b) {
                        function d(a, b, c) {
                            var d = new Image;
                            d.onload = b;
                            d.onerror = c;
                            d.src = a
                        }
                        a.getDOMNode && (a = a.getDOMNode());
                        var c = this._getDataFromNode(a,
                                b),
                            e = !(!c.dimensions || !c.dimensions.width || !c.dimensions.height),
                            g = c.load + "";
                        if ("false" === g) return !1;
                        var h = c.mode;
                        if (e && ("fit" === h || "fill" === h)) {
                            h = a.parentNode;
                            if (!h) return console.error("Not doing anything, parentNode not found."), !1;
                            if (!this.refresh(a, b, h)) return !1
                        }
                        var n = this._intendToLoad(a, c);
                        if ("string" === typeof n && "viewport" !== g) {
                            var m = this.getUrl(n, c),
                                g = a.getAttribute("data-image-resolution");
                            a.getAttribute("src") !== m && this.isValidResolution(n, g) && (a.onload = function () {
                                a.className = a.className.replace(IMAGE_LOADING_CLASS,
                                    " ").trim();
                                a.setAttribute("data-image-resolution", n)
                            }, !a.getAttribute("src") && -1 === a.className.indexOf(IMAGE_LOADING_CLASS) && (a.className += (a.className ? " " : "") + IMAGE_LOADING_CLASS), !a.getAttribute("src") && e ? (a.setAttribute("src", m), c.useBgImage && (a.parentNode.style.backgroundImage = "url(" + m + ")")) : d(m, function () {
                                e ? a.setAttribute("src", m) : (a.setAttribute("data-image-dimensions", this.width + "x" + this.height), ImageLoader.load(a, b))
                            }, function () {
                                a.className = a.className.replace(IMAGE_LOADING_CLASS, " ").trim();
                                a.setAttribute("src", m)
                            }));
                            return !0
                        }
                        return n
                    };
                    this.refresh = function (a, b, d) {
                        a.getDOMNode && (a = a.getDOMNode());
                        d && d.getDOMNode && (d = d.getDOMNode());
                        d = d || a.parentNode;
                        if (!d) return console.error("Not doing anything, parentNode not found."), !1;
                        var c = this._getDataFromNode(a, b),
                            e = d.offsetWidth,
                            g = d.offsetHeight;
                        b = c.mode;
                        if ("none" !== b) {
                            var h = c.dimensions.width,
                                n = c.dimensions.height,
                                m = h / n,
                                q = e / g;
                            if (c.useBgImage && "fill" === b && "backgroundSize" in document.documentElement.style) return a.style.display = "none", d.style.backgroundSize =
                                "cover", d.style.backgroundPosition = 100 * c.focalPoint.x + "% " + 100 * c.focalPoint.y + "%", !0;
                            if (c.fixedRatio) "fill" == b && q > m || "fit" == b && q < m ? (k = 100, l = 100 * (q / m), r = (100 - l) * c.focalPoint.y, p = 0) : (k = 100 * (m / q), l = 100, r = 0, p = (100 - k) * c.focalPoint.x), a.style.top = r + "%", a.style.left = p + "%", a.style.width = k + "%", a.style.height = l + "%";
                            else {
                                var f;
                                "fill" === b ? f = m > q ? g / n : e / h : "fit" === b && (f = m < q ? g / n : e / h);
                                !c.stretch && "fit" == b && 1 < f && (f = 1);
                                var k = Math.ceil(h * f),
                                    l = Math.ceil(n * f);
                                if (0 === k || 0 === l) return !1;
                                var p, r;
                                "fill" === b ? (p = Math.min(Math.max(e /
                                    2 - k * c.focalPoint.x, e - k), 0), r = Math.min(Math.max(g / 2 - l * c.focalPoint.y, g - l), 0)) : "fit" === b && (f = c.fitAlignment, p = f.left ? 0 : f.right ? e - k : k < e ? (e - k) / 2 : 0, r = f.top ? 0 : f.bottom ? g - l : l < g ? (g - l) / 2 : 0, "inline" == this._getStyle(a, "display") && (a.style.fontSize = "0px"), this._resetAlt(a, function () {
                                    k -= a.offsetHeight - a.clientHeight;
                                    l -= a.offsetWidth - a.clientWidth
                                }));
                                a.style.top = Math.ceil(r) + "px";
                                a.style.left = Math.ceil(p) + "px";
                                a.style.width = Math.ceil(k) + "px";
                                a.style.height = Math.ceil(l) + "px"
                            }
                            p = this._getStyle(d, "position");
                            a.style.position =
                                "relative" == p ? "absolute" : "relative";
                            if ("fill" == b && (b = this._getStyle(d, "overflow"), !b || "hidden" != b)) d.style.overflow = "hidden";
                            return !0
                        }
                    };
                    this._intendToLoad = function (a, b) {
                        function d(c, d) {
                            "none" === b.mode && (a.style.width = null, a.style.height = null);
                            var e = parseFloat(a.getAttribute(c)),
                                f = parseFloat(e);
                            if (!f || isNaN(f)) e = h._getStyle(a, c), f = parseFloat(e);
                            if (!f || isNaN(f)) e = h._getStyle(a, "max-" + c, "max" + (c.substr(0, 1).toUpperCase() + c.substr(1))), f = parseFloat(e);
                            if (0 === d || e) switch (h._stringType(e)) {
                            case "percentage":
                                d =
                                    parseInt(e, 10) / 100 * g["offset" + c.substr(0, 1).toUpperCase() + c.substr(1)];
                                break;
                            case "number":
                                d = parseInt(e, 10)
                            }!f && 0 !== d && !a.getAttribute("src") && (d = 0);
                            return d
                        }
                        b = b || this._getDataFromNode(a);
                        if (!b.source) return !1;
                        var c = a.offsetWidth,
                            e = a.offsetHeight,
                            g = a.parentNode,
                            h = this;
                        this._resetAlt(a, function () {
                            c = d("width", c);
                            e = d("height", e)
                        });
                        0 === c && 0 === e ? (c = b.dimensions.width, e = b.dimensions.height) : 0 === c ? c = this.getDimensionForValue("width", e, b) : 0 === e && (e = this.getDimensionForValue("height", c, b));
                        "viewport" === b.load &&
                            (a.style.width = Math.floor(c) + "px", a.style.height = Math.floor(e) + "px");
                        return this.getSquarespaceSize(c, e, b)
                    };
                    this._getDataFromNode = function (a, b) {
                        b = b || {};
                        var d = {
                            focalPoint: {
                                x: 0.5,
                                y: 0.5
                            },
                            dimensions: {
                                width: null,
                                height: null
                            },
                            mode: "none",
                            fitAlignment: {
                                center: !0
                            },
                            load: "true",
                            stretch: !0,
                            fixedRatio: !1
                        };
                        if (b.focalPoint) d.focalPoint = b.focalPoint;
                        else {
                            var c = a.getAttribute("data-image-focal-point");
                            if (c && (c = c.split(",")) && 2 == c.length) d.focalPoint = {
                                x: parseFloat(c[0]),
                                y: parseFloat(c[1])
                            }
                        }
                        if (b.dimensions) d.dimensions =
                            b.dimensions;
                        else if ((c = a.getAttribute("data-image-dimensions")) && (c = c.split("x")) && 2 == c.length) d.dimensions = {
                            width: parseInt(c[0], 10),
                            height: parseInt(c[1], 10)
                        };
                        b.mode ? d.mode = b.mode : a.parentNode && (c = a.parentNode.className, -1 !== c.indexOf("content-fill") ? d.mode = "fill" : -1 !== c.indexOf("content-fit") && (d.mode = "fit"));
                        if ("fit" === d.mode && a.parentNode && (c = b.fitAlignment || a.getAttribute("data-alignment") || a.parentNode.getAttribute("data-alignment"))) d.fitAlignment = {
                            top: -1 !== c.indexOf("top"),
                            left: -1 !== c.indexOf("left"),
                            center: -1 !== c.indexOf("center"),
                            right: -1 !== c.indexOf("right"),
                            bottom: -1 !== c.indexOf("bottom")
                        };
                        b.load ? d.load = b.load : (c = a.getAttribute("data-load")) && (d.load = c);
                        if ("undefined" !== typeof b.stretch) d.stretch = b.stretch;
                        else if (c = a.getAttribute("data-image-stretch")) d.stretch = "true" === c ? !0 : !1;
                        d.source = b.source ? b.source : a.getAttribute("data-src");
                        d.source && this.isSquarespaceUrl(d.source) && ("http:" === d.source.substr(0, 5) && "https" === window.location.protocol.substr(0, 5)) && (d.source = d.source.replace("http://",
                            "https://"));
                        if (b.fixedRatio) d.fixedRatio = b.fixedRatio;
                        else if (c = a.getAttribute("data-fixed-ratio")) d.fixedRatio = "true" == c;
                        b.useBgImage ? d.useBgImage = b.useBgImage : (c = a.getAttribute("data-use-bg-image"), d.useBgImage = "true" === c || !0 === c ? !0 : !1);
                        return d
                    };
                    this._stringType = function (a) {
                        return "string" === typeof a && -1 !== a.indexOf("%") ? "percentage" : isNaN(parseInt(a, 10)) ? NaN : "number"
                    };
                    this._getStyle = function (a, b, d) {
                        var c;
                        a.currentStyle ? c = a.currentStyle[d || b] : window.getComputedStyle && (c = document.defaultView.getComputedStyle(a,
                            null).getPropertyValue(b));
                        return c
                    };
                    this._isVisible = function (a) {
                        a = a.getBoundingClientRect();
                        return 0 <= a.left && 0 <= a.top || 0 <= a.bottom && 0 <= a.right || 0 <= a.left && 0 <= a.bottom || 0 <= a.right && 0 <= a.top
                    };
                    this.getSquarespaceSize = function (a, b, d) {
                        a = Math.max(b / (d.dimensions.height / d.dimensions.width), a);
                        "undefined" === typeof app && "number" === typeof window.devicePixelRatio && (a *= window.devicePixelRatio);
                        for (b = 1; b < SQUARESPACE_SIZES.length && !(a > SQUARESPACE_SIZES[b]); b++);
                        return SQUARESPACE_SIZES[b - 1] + "w"
                    };
                    this.getDimensionForValue =
                        function (a, b, d) {
                            var c = d.dimensions.width;
                            d = d.dimensions.height;
                            return "width" == a ? c / d * b : "height" == a ? d / c * b : NaN
                        };
                    this.getUrl = function (a, b) {
                        var d = b.source;
                        return a && ("/" == d[0] || this.isSquarespaceUrl(d)) ? (-1 === d.indexOf("format=" + a) && (d = d + (-1 !== d.indexOf("?") ? "&" : "?") + "format=" + a), d) : b.source
                    };
                    this.isSquarespaceUrl = function (a) {
                        return -1 !== a.indexOf("squarespace.com") || -1 !== a.indexOf("squarespace.net") || -1 !== a.indexOf("sqsp.net")
                    };
                    this.isValidResolution = function (a, b) {
                        a = parseInt(a, 10);
                        b = parseInt(b, 10);
                        return isNaN(a) ||
                            isNaN(b) ? !0 : a > b
                    };
                    this._resetAlt = function (a, b) {
                        var d = a.getAttribute("alt"),
                            c = d && 0 < d.length && !a.getAttribute("src");
                        if (c) {
                            var e = a.style.display;
                            a.removeAttribute("alt");
                            a.style.display = "none";
                            a.offsetHeight + 0;
                            a.style.display = e
                        }
                        b.call(this);
                        c && a.setAttribute("alt", d)
                    };
                    this.bootstrap = function () {
                        var a = document.images;
                        if (0 < a.length)
                            for (var b = 0, d = a.length; b < d; b++)((a[b].hasAttribute ? a[b].hasAttribute("data-image") : a[b].attributes["data-image"]) || (a[b].hasAttribute ? a[b].hasAttribute("data-src") : a[b].attributes["data-src"])) &&
                                "false" !== (a[b].getAttribute ? a[b].getAttribute("data-load") : a[b].attributes["data-load"]) + "" && ImageLoader.load(a[b])
                    }
                };
            window.ImageLoader = ImageLoader;
            window.YUI && YUI.add("squarespace-imageloader", function (a) {}, "1.0", {
                requires: []
            });
        })();
 
  
        Static.SQUARESPACE_CONTEXT = {
            "facebookAppId": "314192535267336",
            "rollups": {
                "squarespace-announcement-bar": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/announcement-bar-d41d8cd98f00b204e9800998ecf8427e-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/announcement-bar-0dca82b17820d3edaef3-min.js"
                },
                "squarespace-audio-player": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/audio-player-76e4bfcc3f9830beb388bae2002fbe6c-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/audio-player-38b562992a08589a5c19-min.js"
                },
                "squarespace-blog-collection-list": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/blog-collection-list-d41d8cd98f00b204e9800998ecf8427e-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/blog-collection-list-e8e3cb372ce7d05a9eca-min.js"
                },
                "squarespace-calendar-block-renderer": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/calendar-block-renderer-032634519fa160b1d2da6986dce0cdae-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/calendar-block-renderer-b23ad4aed3546efc2209-min.js"
                },
                "squarespace-chartjs-helpers": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/chartjs-helpers-9935a41d63cf08ca108505d288c1712e-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/chartjs-helpers-3aca8c4360ac77e00944-min.js"
                },
                "squarespace-comments": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/comments-db79f121099c10e9346733da5bc6bb10-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/comments-28b9288197c12991c8a2-min.js"
                },
                "squarespace-dialog": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/dialog-41403d1f0d87846c1b05baa36a8d7c38-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/dialog-cca5a113e5e90c768558-min.js"
                },
                "squarespace-events-collection": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/events-collection-032634519fa160b1d2da6986dce0cdae-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/events-collection-d2c082fc55aa31722fdb-min.js"
                },
                "squarespace-gallery-collection-list": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/gallery-collection-list-d41d8cd98f00b204e9800998ecf8427e-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/gallery-collection-list-d084f5987180fa611cc7-min.js"
                },
                "squarespace-image-zoom": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/image-zoom-ae974921915aeccaff8ad60c60e19c31-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/image-zoom-78c46cb5fce5951f50ff-min.js"
                },
                "squarespace-pinterest": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/pinterest-d41d8cd98f00b204e9800998ecf8427e-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/pinterest-d207a80e0512c35617bb-min.js"
                },
                "squarespace-product-quick-view": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/product-quick-view-eb4b900ac0155bed2f175aa82e2a7c17-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/product-quick-view-b95d6de6dd4b59d126dc-min.js"
                },
                "squarespace-products-collection-item-v2": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/products-collection-item-v2-ae974921915aeccaff8ad60c60e19c31-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/products-collection-item-v2-3314a1cbfd16befd03bb-min.js"
                },
                "squarespace-products-collection-list-v2": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/products-collection-list-v2-ae974921915aeccaff8ad60c60e19c31-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/products-collection-list-v2-a60619d86c46a8549be9-min.js"
                },
                "squarespace-search-page": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/search-page-9e3daa07ec7490c2f0be98a39351cb63-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/search-page-d3e98b81c5b736ed5ce7-min.js"
                },
                "squarespace-share-buttons": {
                    "js": "http://static.squarespace.com/universal/scripts-compressed/share-buttons-f722f12d1e1931d98224-min.js"
                },
                "squarespace-simple-liking": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/simple-liking-09fa291ec2800c97714f0d157fd0a6ca-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/simple-liking-a1dae50751059ac7410e-min.js"
                },
                "squarespace-social-buttons": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/social-buttons-7a696232d1cd101fd62b5f174f9ae6ff-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/social-buttons-dfcdf171fd300f5f8d30-min.js"
                },
                "squarespace-tourdates": {
                    "css": "http://static.squarespace.com/universal/styles-compressed/tourdates-d41d8cd98f00b204e9800998ecf8427e-min.css",
                    "js": "http://static.squarespace.com/universal/scripts-compressed/tourdates-11bc1810546503a5aa1d-min.js"
                }
            },
            "pageType": 1,
            "website": {
                "id": "57b4e44603596eec70fcb3be",
                "identifier": "studentsforlifeofamerica",
                "websiteType": 4,
                "contentModifiedOn": 1475880484907,
                "cloneable": false,
                "siteStatus": {},
                "language": "en-US",
                "timeZone": "America/Chicago",
                "machineTimeZoneOffset": -21600000,
                "timeZoneOffset": -21600000,
                "timeZoneAbbr": "CST",
                "siteTitle": "Students for Life | Abolish Abortion in Our Lifetime",
                "siteTagLine": "Abolish Abortion in Our Lifetime",
                "siteDescription": "<p>Students for Life of America (SFLA) is one of the nation\u2019s most active pro-life organizations and the largest youth pro-life organization. We are the only national pro-life organization dedicated to training and equipping college, high school, medical, and law school students. Our approach is uniquely effective, and the methods we have developed are a combination of time-tested techniques and cutting-edge technology.</p>",
                "logoImageId": "57e18667bebafb329d418c8d",
                "socialLogoImageId": "57d88716414fb59067d8cc41",
                "shareButtonOptions": {
                    "1": true,
                    "8": true,
                    "5": true,
                    "6": true,
                    "2": true,
                    "4": true,
                    "3": true,
                    "7": true
                },
                "logoImageUrl": "http://static1.squarespace.com/static/57b4e44603596eec70fcb3be/t/57e18667bebafb329d418c8d/1475880484907/",
                "socialLogoImageUrl": "http://static1.squarespace.com/static/57b4e44603596eec70fcb3be/t/57d88716414fb59067d8cc41/1475880484907/",
                "authenticUrl": "http://studentsforlifeofamerica.squarespace.com",
                "internalUrl": "http://studentsforlifeofamerica.squarespace.com",
                "baseUrl": "http://studentsforlifeofamerica.squarespace.com",
                "socialAccounts": [{
                    "serviceId": 4,
                    "userId": "4710475123",
                    "userName": "practicecloudco",
                    "screenname": "PracticeCloud",
                    "addedOn": 1473807952822,
                    "profileUrl": "http://www.twitter.com/students4lifeHQ",
                    "iconUrl": "http://pbs.twimg.com/profile_images/687678962563039232/5Xl5kK3p_normal.png",
                    "collectionId": "57d88650e3df2827d17782d4",
                    "iconEnabled": true,
                    "serviceName": "twitter"
                }, {
                    "serviceId": 2,
                    "userId": "10100347346004567",
                    "screenname": "Charles Williams",
                    "addedOn": 1473807864281,
                    "profileUrl": "https://www.facebook.com/studentsforlife",
                    "iconUrl": "http://graph.facebook.com/10100347346004567/picture?type=square",
                    "metaData": {
                        "service": "facebook"
                    },
                    "iconEnabled": true,
                    "serviceName": "facebook"
                }],
                "typekitId": "",
                "statsMigrated": false,
                "imageMetadataProcessingEnabled": false
            },
            "websiteSettings": {
                "id": "57b4e44603596eec70fcb3c1",
                "websiteId": "57b4e44603596eec70fcb3be",
                "subjects": [],
                "country": "US",
                "state": "TX",
                "markdownMode": false,
                "simpleLikingEnabled": true,
                "mobileInfoBarSettings": {
                    "isContactEmailEnabled": false,
                    "isContactPhoneNumberEnabled": false,
                    "isLocationEnabled": false,
                    "isBusinessHoursEnabled": false
                },
                "announcementBarSettings": {
                    "style": 1,
                    "text": "<p>Lorem ipsum dolor sit amet</p>"
                },
                "lastAgreedTermsOfService": 2,
                "defaultPostFormat": "%y/%m/%d/%t",
                "commentLikesAllowed": true,
                "commentAnonAllowed": true,
                "commentThreaded": true,
                "commentApprovalRequired": false,
                "commentAvatarsOn": true,
                "commentSortType": 2,
                "commentFlagThreshold": 0,
                "commentFlagsAllowed": true,
                "commentEnableByDefault": true,
                "commentDisableAfterDaysDefault": 0,
                "disqusShortname": "",
                "homepageTitleFormat": "%s",
                "collectionTitleFormat": "%c \u2014 %s",
                "itemTitleFormat": "%i \u2014 %s",
                "commentsEnabled": false,
                "contactPhoneNumber": "5408344600",
                "allowSquarespacePromotion": true,
                "storeSettings": {
                    "returnPolicy": null,
                    "termsOfService": null,
                    "privacyPolicy": null,
                    "paymentSettings": {},
                    "expressCheckout": false,
                    "useLightCart": false,
                    "showNoteField": false,
                    "shippingCountryDefaultValue": "US",
                    "billToShippingDefaultValue": false,
                    "showShippingPhoneNumber": true,
                    "isShippingPhoneRequired": false,
                    "showBillingPhoneNumber": true,
                    "isBillingPhoneRequired": false,
                    "currenciesSupported": ["USD", "CAD", "GBP", "AUD", "EUR", "CHF", "NOK", "SEK", "DKK", "NZD", "SGD", "MXN", "HKD"],
                    "defaultCurrency": "USD",
                    "selectedCurrency": "USD",
                    "measurementStandard": 1,
                    "orderConfirmationInjectCode": "",
                    "showCustomCheckoutForm": false,
                    "enableMailingListOptInByDefault": true,
                    "contactLocation": {
                        "addressLine1": "4755 Jefferson Davis Highway",
                        "addressLine2": "Fredericksburg, VA, 22408",
                        "addressCountry": "United States"
                    },
                    "businessName": "Students for Life of America",
                    "sameAsRetailLocation": false,
                    "stripeConnected": false,
                    "isLive": false,
                    "storeState": 3
                },
                "useEscapeKeyToLogin": true,
                "ssBadgeType": 1,
                "ssBadgePosition": 4,
                "ssBadgeVisibility": 1,
                "ssBadgeDevices": 1,
                "pinterestOverlayOptions": {
                    "mode": "disabled"
                },
                "ampEnabled": false
            },
            "websiteCloneable": false,
            "collection": {
                "title": "Pro-Life Students",
                "id": "57d891e803596ed2af9fb17d",
                "fullUrl": "/college-become-a-voice/",
                "type": 1
            },
            "subscribed": false,
            "appDomain": "squarespace.com",
            "templateTweakable": true,
            "tweakJSON": {
                "aspect-ratio": "Auto",
                "design": "Grid",
                "gallery-arrow-style": "No Background",
                "gallery-aspect-ratio": "3:2 Standard",
                "gallery-auto-crop": "true",
                "gallery-autoplay": "false",
                "gallery-controls": "Both",
                "gallery-design": "Grid",
                "gallery-info-overlay": "Show on Hover",
                "gallery-loop": "false",
                "gallery-navigation": "Bullets",
                "gallery-show-arrows": "true",
                "gallery-transitions": "Fade",
                "galleryArrowBackground": "rgba(34,34,34,1)",
                "galleryArrowColor": "rgba(255,255,255,1)",
                "galleryAutoplaySpeed": "3",
                "galleryCircleColor": "rgba(255,255,255,1)",
                "galleryInfoBackground": "rgba(0, 0, 0, .7)",
                "galleryThumbnailSize": "100px",
                "grid-aspect-ratio": "1:1 (Square)",
                "gridSize": "350px",
                "gridSpacing": "20px",
                "headerPadding": "30px",
                "homepage-index-nav": "Show On Scroll",
                "logoWidth": "220px",
                "product-gallery-auto-crop": "false",
                "product-image-auto-crop": "true",
                "siteTitleContainerWidth": "245px",
                "slideshow-aspect-ratio": "16:9 (Widescreen)",
                "slideshow-autoplay": "true",
                "slideshow-transition": "Scroll"
            },
            "templateId": "52e96934e4b0ea14d0f64568",
            "pageFeatures": [1, 2, 4],
            "impersonatedSession": false,
            "demoCollections": [{
                "collectionId": "5406408fe4b0903f2ffbdaf4",
                "deleted": true
            }, {
                "collectionId": "541c8334e4b02b7c37ef091c",
                "deleted": true
            }, {
                "collectionId": "542439aae4b0cee499902f5a",
                "deleted": true
            }, {
                "collectionId": "54208810e4b08ff99b8b999c",
                "deleted": true
            }, {
                "collectionId": "54073e21e4b0cb374f5059f2",
                "deleted": true
            }, {
                "collectionId": "5420650be4b08ff99b8b3a7e",
                "deleted": true
            }, {
                "collectionId": "54063c43e4b0e522f5e0cae7",
                "deleted": true
            }, {
                "collectionId": "54073674e4b020055321574a",
                "deleted": true
            }, {
                "collectionId": "54073c8ce4b0b183867ee217",
                "deleted": true
            }, {
                "collectionId": "54073e29e4b0cb374f505a06",
                "deleted": true
            }, {
                "collectionId": "54073e34e4b03d3eb8662de5",
                "deleted": true
            }, {
                "collectionId": "54243925e4b0adfe6aa9bd50",
                "deleted": true
            }, {
                "collectionId": "5433fc11e4b01ca0f25c2865",
                "deleted": true
            }, {
                "collectionId": "54061d90e4b02d18666a8ed5",
                "deleted": true
            }, {
                "collectionId": "542f07a2e4b06b594fd9cea1",
                "deleted": true
            }, {
                "collectionId": "54061d89e4b0fd1f5b9456b1",
                "deleted": true
            }],
            "isFacebookTab": false,
            "tzData": {
                "zones": [[-360, "US", "C%sT", null]],
                "rules": {
                    "US": [[1967, 2006, null, "Oct", "lastSun", "2:00", "0", "S"], [1987, 2006, null, "Apr", "Sun>=1", "2:00", "1:00", "D"], [2007, "max", null, "Mar", "Sun>=8", "2:00", "1:00", "D"], [2007, "max", null, "Nov", "Sun>=1", "2:00", "0", "S"]]
                }
            }
        };
 
  
        SquarespaceFonts.loadViaContext();
        Squarespace.load(window);
 
/*    <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="http://studentsforlifeofamerica.squarespace.com/college-become-a-voice?format=RSS" />
    <script type="application/ld+json">{"@context":"http://schema.org","@type":"WebSite","url":"http://studentsforlifeofamerica.squarespace.com","name":"Students for Life | Abolish Abortion in Our Lifetime","description":"
        <p>Students for Life of America (SFLA) is one of the nation\u2019s most active pro-life organizations and the largest youth pro-life organization. We are the only national pro-life organization dedicated to training and equipping college, high school, medical, and law school students. Our approach is uniquely effective, and the methods we have developed are a combination of time-tested techniques and cutting-edge technology.</p>","image":"http://static1.squarespace.com/static/57b4e44603596eec70fcb3be/t/57e18667bebafb329d418c8d/1475880484907/"}</script>
    <script type="application/ld+json">{"@context":"http://schema.org","@type":"Organization","legalName":"Students for Life of America","telephone":"5408344600"}</script>
    <script type="application/ld+json">{"@context":"http://schema.org","@type":"LocalBusiness","address":"4755 Jefferson Davis Highway\nFredericksburg, VA, 22408\nUnited States"}</script>
    <!--[if gte IE 9]> <link rel="stylesheet" type="text/css" href="http://static1.squarespace.com/static/sitecss/57b4e44603596eec70fcb3be/102/52e96934e4b0ea14d0f64568/57b4e44603596eec70fcb3c5/1071-05142015/1475879239842/site.css?&filterFeatures=false&part=1"/><link rel="stylesheet" type="text/css" href="http://static1.squarespace.com/static/sitecss/57b4e44603596eec70fcb3be/102/52e96934e4b0ea14d0f64568/57b4e44603596eec70fcb3c5/1071-05142015/1475879239842/site.css?&filterFeatures=false&part=2"/><link rel="stylesheet" type="text/css" href="http://static1.squarespace.com/static/sitecss/57b4e44603596eec70fcb3be/102/52e96934e4b0ea14d0f64568/57b4e44603596eec70fcb3c5/1071-05142015/1475879239842/site.css?&filterFeatures=false&part=3"/><link rel="stylesheet" type="text/css" href="http://static1.squarespace.com/static/sitecss/57b4e44603596eec70fcb3be/102/52e96934e4b0ea14d0f64568/57b4e44603596eec70fcb3c5/1071-05142015/1475879239842/site.css?&filterFeatures=false&part=4"/><![endif]-->
    <!--[if lt IE 9]><link rel="stylesheet" type="text/css" href="http://static1.squarespace.com/static/sitecss/57b4e44603596eec70fcb3be/102/52e96934e4b0ea14d0f64568/57b4e44603596eec70fcb3c5/1071-05142015/1475879239842/site.css?&filterFeatures=false&noMedia=true&part=1"/><link rel="stylesheet" type="text/css" href="http://static1.squarespace.com/static/sitecss/57b4e44603596eec70fcb3be/102/52e96934e4b0ea14d0f64568/57b4e44603596eec70fcb3c5/1071-05142015/1475879239842/site.css?&filterFeatures=false&noMedia=true&part=2"/><link rel="stylesheet" type="text/css" href="http://static1.squarespace.com/static/sitecss/57b4e44603596eec70fcb3be/102/52e96934e4b0ea14d0f64568/57b4e44603596eec70fcb3c5/1071-05142015/1475879239842/site.css?&filterFeatures=false&noMedia=true&part=3"/><link rel="stylesheet" type="text/css" href="http://static1.squarespace.com/static/sitecss/57b4e44603596eec70fcb3be/102/52e96934e4b0ea14d0f64568/57b4e44603596eec70fcb3c5/1071-05142015/1475879239842/site.css?&filterFeatures=false&noMedia=true&part=4"/><![endif]-->
    <!--[if !IE]> -->
    <link rel="stylesheet" type="text/css" href="http://static1.squarespace.com/static/sitecss/57b4e44603596eec70fcb3be/102/52e96934e4b0ea14d0f64568/57b4e44603596eec70fcb3c5/1071-05142015/1475879239842/site.css?&filterFeatures=false" />
    <!-- <![endif]-->
    <link rel="stylesheet" type="text/css" href="http://static.voidray.co/sfl/build/app.css"></link>*/
  /*  <script type="text/javascript" src="http://static.voidray.co/sfl/build/app.js"></script>*/

/*    <!-- NGROK -->
    <!--
<link rel="stylesheet" type="text/css" href="https://8325b294.ngrok.io/sfl/build/app.css"></link>
<script type="text/javascript" src="https://8325b294.ngrok.io/sfl/build/app.js"></script>
-->
    <!-- End of Squarespace Headers -->*/
  
        /* Must be below squarespace-headers */
        (function () {
            var touchTest = "ontouchstart" in window || navigator.msMaxTouchPoints;
            if (!touchTest) {
                with(document.documentElement) {
                    className = className.replace(new RegExp("touch-styles"), "")
                }
            }
        })()
 