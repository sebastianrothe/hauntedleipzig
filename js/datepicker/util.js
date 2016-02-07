(function (gruseltourApp) {
  'use strict';

  var augmentStringWithFormat = (function () {
    if (String.prototype.format) { // First, checks if it isn't implemented yet.
      return;
    }

    String.prototype.format = function () {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return args[number] !== 'undefined' ? args[number] : match;
      });
    };
  }()); // augment the format function now!

  // package namespace
  gruseltourApp.util = {
    padZero: function (n) {
      return n < 10 ? '0' + n : n;
    },

    toGermanDateString: function (date) {
      // getDate() returns the day of the month, where as getDay() returns which day of the week it is
      var day = gruseltourApp.util.padZero(date.getDate()),
          month = gruseltourApp.util.padZero(date.getMonth() + 1),
          year = date.getFullYear();
      return '{0}.{1}.{2}'.format(day, month, year);
    },

    toGermanTimeString: function (date) {
      var hour = this.padZero(date.getHours()),
          minute = this.padZero(date.getMinutes());
      return '{0}:{1}'.format(hour, minute);
    },

    parseGermanDate: function (dateString) {
      dateString = dateString || '';

      var createDate = function (parts) {
        if (!parts || parts.length < 2) {
          console.log('Cannot parse the Date ' + parts);
          return {};
        }

        var day = parts[2],
            month = parts[1] - 1,
            year = parts[0];
        return new Date(day, month, year);
      };

      return createDate(dateString.split('.'));
    },

    stringToGermanDateString: function (str) {
      var germanDate = gruseltourApp.util.parseGermanDate(str);
      return gruseltourApp.util.toGermanDateString(germanDate);
    },

    cleanDisabledDateString: function (dirtyString) {
      return jQuery.trim(dirtyString).replace(/ /g,'').replace(/\r\n/g, '\n');
    },

    // clean, split and parseToGerman
    transformDateLinesToArray: function (lines) {
      var cleanedLines = this.cleanDisabledDateString(lines);
      var splittedCleanedLines = cleanedLines.split('\n');

      // within jQuery.map, this refers to the global object
      return jQuery.map(splittedCleanedLines, gruseltourApp.util.stringToGermanDateString);
    }
  };
// create global namespace and run it
}(window.gruseltourApp = window.gruseltourApp || {}));
