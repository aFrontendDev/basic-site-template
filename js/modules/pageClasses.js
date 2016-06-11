var site = site ? site : {};
(function($) {
    $.extend(site, {
        pageReadyClass: function() {
            var self = this;

            self.settings.$html.addClass('page-ready');
        },
        pageLoadedClass: function() {
            var self = this;

            self.settings.$html.addClass('page-loaded');
        }
    });
    $.subscribe('pageReady', function() {
        site.pageReadyClass();
    });
    $.subscribe('pageLoaded', function() {
        site.pageLoadedClass();
    });
}(jQuery));