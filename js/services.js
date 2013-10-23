'use strict';

app.factory('UserDays',function ($resource) {
    return $resource('/back/:action/:id/:year', {}, {
        create: {method: 'PUT', params: {action: 'updateudays'}, responseType: 'json'},
        save: {method: 'POST', params: {action: 'updateudays'}, responseType: 'json'},
        get: {method: 'GET', params: {id: '@id', year: '@year', action: 'udays'}, responseType: 'json'}
    });
}).factory('Days',function ($resource) {
        return $resource('/back/:action', {}, {
            create: {method: 'PUT', params: {action: 'updatedays'}, responseType: 'json'},
            save: {method: 'POST', params: {action: 'updatedays'}, responseType: 'json'},
            get: {method: 'GET', params: {action: 'days'}, responseType: 'json'}
        });
    }).factory('DataCache', function ($cacheFactory) {
        return $cacheFactory('dataCache', {});
    });