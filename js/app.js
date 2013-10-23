'use strict';

var app = angular.module('calendar', ['ngResource', 'ui.bootstrap'])
    .constant('DIRTY_CLASS', 'ng-dirty')
    .constant('PRISTINE_CLASS', 'ng-pristine');