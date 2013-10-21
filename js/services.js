'use strict';

app.factory('UserDays',function ($resource) {
    return $resource('/back/:action/:id/:year', {id: '@id', year: '@year'}, {
        create: {method: 'PUT'},
        save: {method: 'POST', params: {action: 'updateudays'}, responseType: 'json'},
        get: {method: 'GET', params: {action: 'udays'}, responseType: 'json'}
    });
}).factory('Days',function ($resource) {
        return $resource('/back/:action', {}, {
            create: {method: 'PUT'},
            save: {method: 'POST', params: {action: 'updatedays'}, responseType: 'json'},
            get: {method: 'GET', params: {action: 'days'}, responseType: 'json'}
        });
    }).factory('DataCache', function ($cacheFactory) {
        return $cacheFactory('dataCache', {});
    });