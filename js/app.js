/**
 * Created by nathanGodinho on 03/06/16.
 */

(function () {
    'use strict';

    var app = function () {
        var regexpList = [],

            addRegExpToList = function (regExp, controller) {
                regexpList.push(regExp);
                controller.refreshRegExpList(getRegExpList());
                controller.cleanRegExpInput();
            },

            getRegExpList = function () {
                return regexpList;
            };

        return {
            addRegExpToList: addRegExpToList,
            getRegExpList: getRegExpList
        };
    }();

    window.app = app;
})();
