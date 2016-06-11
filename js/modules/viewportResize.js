var site = site ? site : {};
(function($) {
    $.extend(site, {
        /**
         * Reusable site resize function.
         * @namespace viewportResize
         */
        viewportResize: {
            // Configuration
            resizeTimeout: null,
            timeoutDuration: 200,
            /**
             * Initialises viewport resize module, binds event to window resize.
             * @function init
             * @memberOf viewportResize
             */
            init: function() {
                var self = this;

                site.settings.$window.on('resize.viewportResize', function() {
                    if (self.resizeTimeout) {
                        clearTimeout(self.resizeTimeout);
                    }

                    $.publish('viewportResizeStart');

                    self.resizeTimeout = setTimeout(function() {
                        $.publish('viewportResizeEnd_prioritize');
                        $.publish('viewportResizeEnd');
                    }, self.timeoutDuration);
                });
            }
        }
    });
    $.subscribe('pageReady', function() {
        site.viewportResize.init();
    });
}(jQuery));