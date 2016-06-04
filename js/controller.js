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

            createListComponent = function (element, id) {
                var regexpText = createDOMElement('h5', element),
                    indexText = createDOMElement('h5', String(id + 1).concat('-')),
                    mainDiv = createDOMElement('div'),
                    rowDiv = createDOMElement('div'),
                    numberCol = createDOMElement('div'),
                    expCol = createDOMElement('div'),
                    actionsCol = createDOMElement('div'),
                    buttonEdit = createDOMElement('button'),
                    buttonDelete = createDOMElement('button'),
                    editIcon = createDOMElement('i'),
                    deleteIcon = createDOMElement('i');

                rowDiv.className = 'row';
                numberCol.className = 'col-sm-2';
                expCol.className = 'col-sm-6';
                actionsCol.className = 'col-sm-4';
                numberCol.appendChild(indexText);
                editIcon.className = 'fa fa-pencil';
                deleteIcon.className = 'fa fa-trash';
                buttonEdit.appendChild(editIcon);
                buttonEdit.className = 'edit-button';
                buttonDelete.appendChild(deleteIcon);
                buttonDelete.className = 'delete-button';
                actionsCol.appendChild(buttonEdit);
                actionsCol.appendChild(buttonDelete);
                expCol.appendChild(regexpText);
                rowDiv.appendChild(numberCol);
                rowDiv.appendChild(expCol);
                rowDiv.appendChild(actionsCol);
                mainDiv.appendChild(rowDiv);
                mainDiv.className = 'col-sm-12';
                mainDiv.setAttribute('id', 'reglist-'.concat(id));

                return mainDiv;
            },

            refreshRegExpList = function (reList) {
                cleanInnerElements(elementListId);
                reList.forEach(function (element, index) {
                    var div = createListComponent(element, index);
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



