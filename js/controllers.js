'use strict';

var app_update_year = false;

app.controller('calendarCtrl', function ($scope, Days, DataCache, UserDays) {
    $scope.model = {
        user: null,
        user_id: null,
        date: [],
        date_type: 1,
        date_data: {},
        year: null
    };

    /*var cacheData = DataCache.get('date_data');

     console.log(cacheData);

     if (!cacheData) {*/
    Days.get({}, function (data) {

        var classes = [], options = [];

        angular.forEach(data.days, function (value) {

            classes.push('moc-calendar-' + value.title);
            options.push({id: value.id, title: value.title, color: value.color});

        });

//            DataCache.put('date_data', classes);

        $scope.model.date_data = {classes: classes, options: options};

    });
    /*} else {
     $scope.model.date_data = cacheData;
     }*/

    $scope.$watch('model.user_id', function (newValue, oldValue) {

        app_update_year = !(newValue == oldValue);

    });

    $scope.$watch('model.year', function (newValue, oldValue) {

        if (!$scope.model.user_id) return;

        if (app_update_year) {
            app_update_year = false;
            return;
        }

        $scope.getUserDays(null, false);

    });

    $scope.addDate = function (date) {

        if (!$scope.model.date_type || !$scope.model.user_id) return;

        if (angular.isNumber(date)) {

            $scope.model.date.push({day: date, type: Number($scope.model.date_type)});

        }

    };

    $scope.updateYear = function (year, inController) {

        if (angular.isNumber(year)) {

            if (!inController) {

                $scope.$apply(function () {
                    $scope.model.year = year;
                });

            } else {

                $scope.model.year = year;

            }

        }

    };

    $scope.getUserDays = function (id, updateYear) {

        if (id && angular.isNumber(id)) {

            $scope.$apply(function () {
                $scope.model.user_id = id;
            });

        }

        if (updateYear) $scope.updateYear((new Date()).getFullYear(), true);

        UserDays.get({id: $scope.model.user_id, year: $scope.model.year}, function (data) {

            $scope.model.date = (data.days) ? data.days : [];

        });

    };

    $scope.resetFormItem = function (item, inController) {

        if (inController) {

            item.$dirty = false;
            item.$pristine = true;

        } else {

            $scope.$apply(function () {

                item.$dirty = false;
                item.$pristine = true;

            });

        }
    };

    $scope.resetTypeForm = function (item, editVal, inController) {

        $scope.resetFormItem($scope['moc_days_form_' + item], inController);
        $scope.resetFormItem($scope['moc_days_form_' + item][item + '_color'], inController);

        if (editVal) $scope.types[item].title = editVal;

        $scope.resetFormItem($scope['moc_days_form_' + item][item + '_title'], inController);

    };

    $scope.updateDateType = function (item) {

        Days.save($scope.types[item], function (success) {

            $scope.resetTypeForm(item, false, true);

        }, function (error) {

        });

        return $scope.types[item].title;

    };

});