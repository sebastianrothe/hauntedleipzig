(function(Module) {
    'use strict';

    Module.Logging = LoggingModule;
    var LoggingModule = function() {
        var service = {
            getLogger: getLogger
        }
        return service;

        function getLogger() {
            var service = {
                debug: debug,
                warn: warn,
                error: error
            }
            return service;

            function error(message) {
                console.error(message);
            }

            function warn(message) {
                console.warn(message);
            }

            function debug(message) {
                console.log(message);
            }
        }
    }
})(window.gruseltourApp = window.gruseltourApp || {});
