'use strict';

var app = angular.module('calendar', ['ngResource'])
    .constant('DIRTY_CLASS','ng-dirty')
    .constant('PRISTINE_CLASS','ng-pristine');