'use strict';

var app_update_year = false;

app.controller('calendarCtrl', function ($scope, Days, DataCache, UserDays) {
    $scope.model = {
        user: null,
        user_id: null,
        date: [],
        date_type: 1,
        date_data: {},
        year: null,
        loading: true,
        add_date: false,
        empty_date: false,
        success: null
    };

    $scope.alert = [];

    /*var cacheData = DataCache.get('date_data');

     console.log(cacheData);

     if (!cacheData) {*/
    Days.get({}, function (data) {

        var classes = [], options = [];

        angular.forEach(data.days, function (value) {

            classes.push('moc-calendar-' + (value.id + 'item'));
            options.push({id: value.id, title: value.title, color: value.color});

        });

//            DataCache.put('date_data', classes);

        $scope.model.date_data = {classes: classes, options: options};

        $scope.model.loading = false;

    }, function () {
        $scope.model.loading = false;
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

            if (!$scope.model.add_date) {

                $scope.$apply(function () {

                    $scope.model.add_date = true;

                });
            }

            var current = $scope.model.date[date];

            if(current && !($scope.model.date_type != current)) {
                delete $scope.model.date[date];
            }
            else {
                $scope.model.date[date] = Number($scope.model.date_type);
            }

        }

    };

    $scope.updateYear = function (year, inController) {

        if (angular.isNumber(year)) {

            if (!inController) {

                $scope.$apply(function () {

                    if ($scope.model.add_date) $scope.model.add_date = false;

                    $scope.model.year = year;
                });

            } else {

                if ($scope.model.add_date) $scope.model.add_date = false;

                $scope.model.year = year;

            }

        }

    };


    $scope.getUserDays = function (id, updateYear) {

        $scope.model.loading = true;

        if (id && angular.isNumber(id)) {

            $scope.$apply(function () {
                $scope.model.user_id = id;
            });

        }

        if (updateYear) $scope.updateYear((new Date()).getFullYear(), true);

        UserDays.get({id: $scope.model.user_id, year: $scope.model.year}, function (data) {

            if (data.days) {
                $scope.model.date = parseResponseData(data.days);
                $scope.model.empty_date = false;
            } else {
                $scope.model.date = [];
                $scope.model.empty_date = true;
            }

            $scope.model.loading = false;

        }, function () {
            $scope.model.loading = false;
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

    $scope.saveDateType = function (item) {

        $scope.model.loading = true;

        Days.save($scope.types[item], function (success) {

            $scope.resetTypeForm(item, false, true);

            $scope.getResponse(success);

        }, function (error) {
            $scope.getResponse(error);
        });

    };

    $scope.saveUserDate = function () {

        if (!$scope.model.user_id) return;

        $scope.model.loading = true;

        var data = {
            id: $scope.model.user_id,
            days: genSendData($scope.model.date),
            year: (($scope.model.year) ? $scope.model.year : (new Date()).getFullYear())
        };

        if (!$scope.model.empty_date) {

            UserDays.save(data, function (success) {

                $scope.getResponse(success);

            }, function (error) {
                $scope.getResponse(error);
            });

        } else {

            UserDays.create(data, function (success) {

                $scope.getResponse(success);

            }, function (error) {
                $scope.getResponse(error);
            });

        }

    };

    $scope.startLoading = function () {
        $scope.$apply(function () {
            $scope.model.loading = true;
        });
    };

    $scope.endLoading = function () {
        $scope.$apply(function () {
            $scope.model.loading = false;
        });
    };

    $scope.getResponse = function (response) {
        $scope.model.loading = false;
        $scope.model.add_date = !($scope.model.success = (response.result == true));
    };

});