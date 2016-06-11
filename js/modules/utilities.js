var site = site ? site : {};
(function($) {
    $.extend(site, {
        /**
         * Returns a query string parameter’s value if specified, object of query string parameters if not.
         * @function getUrlParams
         * @memberof utilities
         * @param {String} [parameter] Parameter passed in to retrieve from query string
         * @returns {Obj} [params] | {String} [param]
         */
        getUrlParams: function(parameter) {
            var queryString = window.location.search;

            if (queryString !== undefined) {
                queryString = window.location.search.replace('?', '');

                var params = {},
                    queryStringArray = queryString.split('&');

                for (var index in queryStringArray) {
                    var query = queryStringArray[index].split('=');

                    params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
                }

                if (parameter) {
                    return params[parameter];
                } else {
                    return params;
                }
            }
        },
        setUrlParams: function() {
            var self = this;
            self.settings.urlParams = self.getUrlParams(window.location.search);
        },
        /*
         * Safely outputs message to browser console. Use for debugging/logging.
         * @function log
         * @param {String|Object} content - Content to log to browser console.
         * @param {String} styles - CSS style to apply to text logged to browser console.
         * @example
         * site.log('Hello, World!', 'background:#F00;color:#FF0;');
         */
        log: function(content, style) {
            if (typeof(console) !== 'undefined') {
                if (style) {
                    console.log('%c' + content, style);
                } else {
                    console.log(content);
                }
            }
        },
        htmlEncode: function(value) {
            if (value) {
                return $('<div />').text(value).html();
            } else {
                return '';
            }
        },
        htmlDecode: function(value) {
            if (value) {
                return $('<div />').html(value).text();
            } else {
                return '';
            }
        },
        // get IE version from classname (acceptable values: 10,9,8 or 7)
        ltIE: function(version) {
            var self = this;
            if (self.settings.$html.hasClass('lt-ie' + version)) {
                return true;
            } else {
                return false;
            }
        },
        browserPrefix: function() {
            if (window.getComputedStyle) {
                var self = this,
                    styles = window.getComputedStyle(window.document.documentElement, ''),
                    prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
                self.settings.browserPrefix = '-' + prefix + '-';
            }
        },
        textDirection: function() {
            var self = this,
                direction = self.settings.$html.attr('dir');
            if (direction === 'rtl') {
                self.settings.rtl = true;
            }
        }
    });
    $.subscribe('pageReady', function() {
        site.textDirection();
        site.browserPrefix();
        site.setUrlParams();
    });
}(jQuery));