'use strict';

var appStyleSheet = null,
    appEditDate = jQuery.Event("appEditDate"),
    timeOut;

app.directive('datePicker',function () {

    return function (scope, element, attrs) {

        scope.$watch('model.date', function (newValue, oldValue) {

            (function ($) {

                var gotThisDate = false, curClass = '', timeLength = newValue.length,
                    curYear = (scope.model.year) ? scope.model.year : (new Date()).getFullYear();

                if ($(element).data('datepicker') != undefined) $(element).datepicker('destroy');

                $(element).datepicker({
                    defaultDate: new Date(curYear, 0, 1),
                    numberOfMonths: [3, 4],
                    changeMonth: false,
                    changeYear: false,
                    firstDay: 1,
                    stepMonths: 12,
                    onChangeMonthYear: function (year, month, inst) {

                        if (scope.model.add_date && !confirm('All unsaved data will be lost. Continue?')) {
                            inst.selectedYear = curYear;
                            inst.drawYear = curYear;
                            return;
                        }

                        scope.updateYear(year, false);

                    },
                    beforeShowDay: function (date) {

                        if (timeLength < 1) return [true, ''];

                        gotThisDate = date.getTime() / 1000;

                        if (newValue[gotThisDate]) {

                            curClass = scope.model.date_data.classes[(newValue[gotThisDate] - 1)];

                            return [true, curClass];
                        }

                        return [true, ''];
                    },
                    onSelect: function (date, inst) {

                        gotThisDate = (new Date(date)).getTime() / 1000;

                        ++timeLength;

                        scope.addDate(gotThisDate);
                    }
                });

            })(jQuery);

        });

    }

}).directive('autoComplete',function () {
        return function (scope, element, attr) {

            (function ($) {
                $(element).autocomplete({
                    source: '/back/',
                    minLength: 2,
                    search: function () {
                        scope.startLoading();
                    },
                    response: function () {
                        scope.endLoading();
                    }
                }).on('autocompleteselect', function (event, ui) {

                        scope.getUserDays(ui.item.id, true);

                    });
            })(jQuery);

        }
    }).directive('dateSelect',function ($compile) {
        return function (scope, element, attr) {

            scope.$watch('model.date_data', function (newValue, oldValue) {

                if (!newValue.classes) return;
                if (oldValue.classes) return;

                var list = '<label for="moc-days-list">Reason: </label><select id="moc-days-list" ng-model="model.date_type">',
                    style = '<style type="text/css" id="moc-style">',
                    block = '<ul id="moc-days-block">',//<a id="moc-days-block-toggle" data-show="">Show</a>
                    boot = '<div class="btn-group">' +
                        '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Reason <span class="caret"></span></button>' +
                        '<ul class="dropdown-menu"><li ng-repeat="type in types" data-value="{{type.id}}"><a>{{type.title}}</a></li></ul></div>',
                    itemName = '';

                scope.types = {};

                angular.forEach(newValue.options, function (value) {

                    itemName = value.id + 'item';

                    scope.types[itemName] = {id: value.id, title: value.title, color: value.color, iname: itemName};

                    list += '<option value="' + value.id + '">{{types.' + itemName + '.title}}</option>';
                    style += appClassTemplate(itemName, value.color, false);
                    block += '<li><form name="moc_days_form_' + itemName + '" id="moc_days_form_' + itemName + '" class="moc_days_forms">' +
                        '<div id="moc-colorpicker-' + itemName + '" class="moc-colorpicker-block" data-color="' + value.color + '" data-item="' + value.id + '">' +
                        '<div edit-date-type="" name="' + itemName + '_color" ng-model="types.' + itemName + '.color" style="background-color: #' + value.color + ';"></div>' +
                        '</div>' +
                        '<span class=""> - {{types.' + itemName + '.title}}</span>' +
                        '<input type="text" data-title="' + value.title + '" ng-model="types.' + itemName + '.title" name="' + itemName + '_title" class="moc-edit-title form-control" required>' +
                        '<button type="button" class="btn btn-primary">Edit</button>' +
                        '<button type="button" class="btn btn-success" update-date-type="' + itemName + '" ng-disabled="moc_days_form_' + itemName + '.$pristine">Save</button>' +
                        '<button type="button" class="btn btn-warning" cancel-date-type="' + itemName + '" ng-model="types.' + itemName + '" ng-disabled="moc_days_form_' + itemName + '.$pristine">Cancel</button></form></li>';
                });

                list += '</select>';

                style += '</style>';

                block += '</ul>';

                element.html(list + block+boot);

                $compile(element.contents())(scope);

                element.append(style);

                (function ($) {

                    var styleSheet = $('#moc-style');

                    if (styleSheet.length && styleSheet[0].sheet) appStyleSheet = styleSheet[0].sheet;

                    $('div.moc-colorpicker-block').each(function (index, element) {

                        var self = $(element);

                        self.ColorPicker({
                            color: '#' + self.data('color'),
                            onShow: function (colpkr) {
                                $(colpkr).fadeIn(500);
                                return false;
                            },
                            onHide: function (colpkr) {
                                var picker = $(colpkr), hsb = picker.data('colorpicker').color;

                                if (hsb) {
                                    var color = appHSBToHex(hsb);

                                    if (self.data('color') == color) {
                                        picker.fadeOut(500);
                                        return false;
                                    }

                                    var item = scope.model.date_data.classes[Number(self.data('item')) - 1];

                                    if (appStyleSheet && item) {

                                        var rules = (appStyleSheet.cssRules || appStyleSheet.rules),
                                            className = appSelectorTemplate(item, true),
                                            index = appFindClassIndex(appStyleSheet, className);

                                        if (index !== false) {
                                            appStyleSheet.deleteRule(index);
                                        }

                                        appStyleSheet.insertRule(appClassTemplate(item, color, true), rules.length);

                                    }

                                    self.find('div').trigger(appEditDate, color).css('backgroundColor', '#' + color);
                                }

                                picker.fadeOut(500);
                                return false;
                            }
                        });

                    });

                })(jQuery);

            });

        }
    }).directive('editDateType',function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ngModel) {
                if (!ngModel) return;

                (function ($) {

                    $(element).on('appEditDate', function (event, param) {

                        scope.$apply(function () {

                            ngModel.$setViewValue(param);

                        });
                    });

                })(jQuery);
            }
        };
    }).directive('cancelDateType',function (DIRTY_CLASS, PRISTINE_CLASS) {
        return function (scope, element, attr) {

            (function ($) {

                $(element).on('click', function () {

                    var parent = $(element).closest('.moc_days_forms').removeClass(DIRTY_CLASS).addClass(PRISTINE_CLASS),
                        picker = parent.find('div.moc-colorpicker-block'),
                        color = picker.data('color'),
                        editTitle = $('input.moc-edit-title', parent).removeClass(DIRTY_CLASS).addClass(PRISTINE_CLASS);

                    picker.ColorPickerSetColor(color).find('div').css('background-color', '#' + color);

                    scope.resetTypeForm(attr.cancelDateType, editTitle.data('title'), false);

                });

            })(jQuery);
        };
    }).directive('updateDateType',function (DIRTY_CLASS, PRISTINE_CLASS) {
        return function (scope, element, attr) {

            (function ($) {

                $(element).on('click', function () {

                    var parent = $(element).closest('.moc_days_forms').removeClass(DIRTY_CLASS).addClass(PRISTINE_CLASS);

                    parent.find('div.moc-colorpicker-block').data('color', scope.types[attr.updateDateType].color);
                    $('input.moc-edit-title', parent).removeClass(DIRTY_CLASS).addClass(PRISTINE_CLASS).data('title', scope.types[attr.updateDateType].title);

                    scope.saveDateType(attr.updateDateType);

                });

            })(jQuery);
        };
    }).directive('resultMessage', function () {
        return function (scope, element, attr) {

            scope.$watch('model.success', function (newValue, oldValue) {

                if (newValue == null) return;

                (function ($) {
                    clearTimeout(timeOut);

                    if (scope.model.success) {
                        $(element).html('Success').removeClass('moc-error').addClass('moc-success').fadeIn();
                    } else {
                        $(element).html('Error').removeClass('moc-success').addClass('moc-error').fadeIn();
                    }

                    timeOut = setTimeout(function () {
                        $(element).fadeOut();
                    }, 3000);

                })(jQuery);

            });
        };
    });