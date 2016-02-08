(function (gruseltourApp) {
  'use strict';

  var augmentStringWithFormat = (function() {
    if (String.prototype.format) { // First, checks if it isn't implemented yet.
      return;
    }

    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return args[number] !== 'undefined' ? args[number] : match;
      });
    };
  }()); // augment the format function now!

  // package namespace
  gruseltourApp.util = {
    padZero: function(n) {
      return n < 10 ? '0' + n : n;
    },

    toLocalDateString: function(date) {
      // getDate() returns the day of the month, where as getDay() returns which day of the week it is
      var day = gruseltourApp.util.padZero(date.getDate()),
          month = gruseltourApp.util.padZero(date.getMonth() + 1),
          year = date.getFullYear();
      return '{0}/{1}/{2}'.format(month, day, year);
    },

    toLocalTimeString: function(date) {
      var hour = this.padZero(date.getHours()),
          minute = this.padZero(date.getMinutes()),
          isAmPm = (hour >= 12),
          ampm = isAmPm ? "PM" : "AM",
          usHour = (hour > 12) ? hour - 12 : hour;
      return '{0}:{1} {2}'.format(usHour, minute, ampm);
    },

    parseGermanDate: function(dateString) {
      dateString = dateString || '';

      var createDate = function(parts) {
        if (!parts || parts.length < 2) {
          console.log('Cannot parse the Date ' + parts);
          return {};
        }

        var day = parts[0],
            // subtract one from the month, because it's range is expected from 0-11
            month = parts[1] - 1,
            year = parts[2];
        return new Date(year, month, day);
      };

      return createDate(dateString.split('.'));
    },

    stringToLocalDateString: function(str) {
      var germanDate = gruseltourApp.util.parseGermanDate(str);
      return gruseltourApp.util.toLocalDateString(germanDate);
    },

    cleanDisabledDateString: function(dirtyString) {
      return jQuery.trim(dirtyString).replace(/ /g,'').replace(/\r\n/g, '\n');
    },

    // clean, split and parseToLocal
    transformDateLinesToArray: function(lines) {
      var cleanedLines = this.cleanDisabledDateString(lines);
      var splittedCleanedLines = cleanedLines.split('\n');

      // within jQuery.map, this refers to the global object
      return jQuery.map(splittedCleanedLines, gruseltourApp.util.stringToLocalDateString);
    }
  };
// create global namespace and run it
}(window.gruseltourApp = window.gruseltourApp || {}));
