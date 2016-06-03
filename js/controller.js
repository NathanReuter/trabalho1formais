/**
 * Created by nathanGodinho on 03/06/16.
 */

(function () {
    'use strict';
    var controller = function () {
        var elementListId = 'regExpList',
            inputRegExpId = 'reInput',

            getElement = function (element) {
                return document.getElementById(element);
            },

            createDOMElement = function (tag, value) {
                if (value) {
                    var element = document.createElement(tag);
                    element.innerHTML = value;

                    return element;
                }

                return document.createElement(tag);
            },

            getElementValue = function (element) {
                return getElement(element).innerText;
            },

            getElementInputValue = function (element) {
                return getElement(element).value;
            },

            cleanInnerElements = function (element) {
                var node = getElement(element);

                while (node.hasChildNodes()) {
                    node.removeChild(node.lastChild);
                }
            },

            cleanInput = function (input) {
                getElement(input).value = '';
            },

            cleanRegExpInput = function () {
                cleanInput(inputRegExpId);
            },

            getInputValueAndDoSomething = function (targetInput, cb) {
                var value = getElementInputValue(targetInput);

                if (value) {
                    cb(value, controller);
                    return;
                }

                console.error('Missing value');
            },

            refreshRegExpList = function (reList) {
                cleanInnerElements(elementListId);
                reList.forEach(function (element, index) {
                    var h4 = createDOMElement('h5', element),
                        div = createDOMElement('div');
                    div.appendChild(h4);
                    div.className = 'col-sm-12';
                    div.setAttribute('id', 'reglist-'.concat(index));
                    getElement(elementListId).appendChild(div);
                });
            };

        return {
            getInputValueAndDoSomething: getInputValueAndDoSomething,
            refreshRegExpList: refreshRegExpList,
            cleanRegExpInput: cleanRegExpInput,
            cleanInput: cleanInput
        }
    }();

    window.controller = controller;
})();



