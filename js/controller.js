/**
 * Created by nathanGodinho on 03/06/16.
 */

(function () {
    'use strict';
    var controller = function () {
        var elementListId = 'regExpList',
            inputRegExpId = 'reInput',
            viewList = ['menu-view', 'converexp-view', 'compare-view'],

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

            deleteButtonHanddler = function (id) {
                return function () {
                    app.removeRegExpList(id);
                    refreshRegExpList(app.getRegExpList());
                };
            },

            hideElement = function (element) {
                console.log(element);
                if (element.className.search('hide') === -1) {
                    element.className = element
                    .className
                    .trim()
                    .concat(element.className.length ? ' hide': 'hide');
                }
            },

            showElement = function (element) {
                element.className = element.className.replace('hide', '');
            },

            editionButtonHanddler = function (id, text, input, thisButton, confirmButton) {
                return function () {
                    input.value = text.innerText;
                    hideElement(text);
                    hideElement(thisButton);
                    showElement(input);
                    showElement(confirmButton);
                    confirmButton.addEventListener('click', function() {
                        app.updateRegExp(id, input.value);
                        text.innerText = input.value;
                        hideElement(input);
                        hideElement(confirmButton);
                        showElement(text);
                        showElement(thisButton);
                        confirmButton.removeEventListener('click', function () {});
                    });
                };
            },

            createListComponent = function (element, id) {
                var regexpText = createDOMElement('code', element),
                    indexText = createDOMElement('p', String(id + 1).concat('-')),
                    mainDiv = createDOMElement('div'),
                    rowDiv = createDOMElement('div'),
                    numberCol = createDOMElement('div'),
                    expCol = createDOMElement('div'),
                    actionsCol = createDOMElement('div'),
                    buttonEdit = createDOMElement('button'),
                    buttonDelete = createDOMElement('button'),
                    buttonEditConfirm = createDOMElement('button'),
                    checkIcon = createDOMElement('i'),
                    editIcon = createDOMElement('i'),
                    deleteIcon = createDOMElement('i'),
                    editionInput = createDOMElement('input');

                rowDiv.className = 'row';
                numberCol.className = 'col-sm-2';
                expCol.className = 'col-sm-6';
                actionsCol.className = 'col-sm-4';
                numberCol.appendChild(indexText);
                editIcon.className = 'fa fa-pencil';
                deleteIcon.className = 'fa fa-trash';
                checkIcon.className = 'fa fa-check';
                buttonEdit.appendChild(editIcon);
                buttonEdit.className = 'edit-button';
                buttonEdit.addEventListener('click',
                    editionButtonHanddler(id, regexpText, editionInput, buttonEdit ,buttonEditConfirm));
                buttonEditConfirm.appendChild(checkIcon);
                buttonEditConfirm.className = 'hide confirm-button';
                buttonDelete.appendChild(deleteIcon);
                buttonDelete.className = 'delete-button';
                buttonDelete.addEventListener('click', deleteButtonHanddler(id));
                actionsCol.appendChild(buttonEditConfirm);
                actionsCol.appendChild(buttonEdit);
                actionsCol.appendChild(buttonDelete);
                editionInput.className = 'hide';
                editionInput.setAttribute('id', 'input-'.concat(id))
                expCol.appendChild(regexpText);
                expCol.appendChild(editionInput);
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
            },

            showMenuView = function (view) {
                viewList.forEach(function (view) {
                    hideElement(getElement(view));
                });

                showElement(getElement(view));
            };

        return {
            getInputValueAndDoSomething: getInputValueAndDoSomething,
            refreshRegExpList: refreshRegExpList,
            cleanRegExpInput: cleanRegExpInput,
            cleanInput: cleanInput,
            showMenuView: showMenuView
        }
    }();

    window.controller = controller;

})();



