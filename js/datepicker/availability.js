(function(gruseltourApp) {
    'use strict';

    gruseltourApp.dateHelper = function () {
        var DATE_FRIDAY = 5, DATE_SATURDAY = 6, DATE_SUNDAY = 0;

        return {
            isDisabled: function(date, disabledDates) {
                var germanDateString = gruseltourApp.util.toGermanDateString(date);
                return jQuery.inArray(germanDateString, disabledDates) !== -1;
            },

            // weekend includes friday
            isWeekend: function(date) {
                var day = date.getDay();
                return day === DATE_FRIDAY || day === DATE_SATURDAY || day === DATE_SUNDAY;
            },

            // weekday excludes friday
            isNotWeekend: function(date) {
                return !this.isWeekend(date);
            }
        };
    };

    gruseltourApp.tourHTMLEntities = function () {
        return {
            disabled: {
                title: 'Ausgebucht',
                tooltip: 'Die Tour ist an diesem Tag schon ausgebucht.',
                style: 'full'
            },

            noRegularTour: {
                title: 'Nicht verfügbar',
                tooltip: 'An diesem Tag findet keine reguläre Tour statt.',
                style: 'not-available'
            }
        };
    };

    gruseltourApp.dateChecker = function (dataProvider) {
        var disabledDates = dataProvider.getData(),
            dateHelper = gruseltourApp.dateHelper(),
            htmlEntities = gruseltourApp.tourHTMLEntities(),
            noRegularTour = htmlEntities.noRegularTour,
            disabledTour = htmlEntities.disabled;

        return {
            isAvailable: function (date) {
                if (dateHelper.isNotWeekend(date)) {
                    return [false, noRegularTour.style, noRegularTour.tooltip];
                }

                if (dateHelper.isDisabled(date, disabledDates)) {
                    return [false, disabledTour.style, disabledTour.tooltip];
                }

                return [true];
            }
        };
    };
}(window.gruseltourApp = window.gruseltourApp || {}));
