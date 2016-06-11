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

            updateRegExp = function (index, newValue) {
                regexpList[index] = newValue;
            },

            getRegExpList = function () {
                return regexpList;
            },

            removeRegExpList = function (id) {
                regexpList.splice(id, 1);
            };

        return {
            addRegExpToList: addRegExpToList,
            getRegExpList: getRegExpList,
            removeRegExpList: removeRegExpList,
            updateRegExp: updateRegExp
        };
    }();

    window.app = app;
})();
