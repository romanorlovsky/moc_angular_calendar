function appHSBToRGB(hsb) {
    var rgb = {};
    var h = Math.round(hsb.h);
    var s = Math.round(hsb.s * 255 / 100);
    var v = Math.round(hsb.b * 255 / 100);
    if (s == 0) {
        rgb.r = rgb.g = rgb.b = v;
    } else {
        var t1 = v;
        var t2 = (255 - s) * v / 255;
        var t3 = (t1 - t2) * (h % 60) / 60;
        if (h == 360) h = 0;
        if (h < 60) {
            rgb.r = t1;
            rgb.b = t2;
            rgb.g = t2 + t3
        }
        else if (h < 120) {
            rgb.g = t1;
            rgb.b = t2;
            rgb.r = t1 - t3
        }
        else if (h < 180) {
            rgb.g = t1;
            rgb.r = t2;
            rgb.b = t2 + t3
        }
        else if (h < 240) {
            rgb.b = t1;
            rgb.r = t2;
            rgb.g = t1 - t3
        }
        else if (h < 300) {
            rgb.b = t1;
            rgb.g = t2;
            rgb.r = t2 + t3
        }
        else if (h < 360) {
            rgb.r = t1;
            rgb.g = t2;
            rgb.b = t1 - t3
        }
        else {
            rgb.r = 0;
            rgb.g = 0;
            rgb.b = 0
        }
    }
    return {r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b)};
}

function appRGBToHex(rgb) {
    var hex = [
        rgb.r.toString(16),
        rgb.g.toString(16),
        rgb.b.toString(16)
    ];
    $.each(hex, function (nr, val) {
        if (val.length == 1) {
            hex[nr] = '0' + val;
        }
    });
    return hex.join('');
}

function appHSBToHex(hsb) {
    return appRGBToHex(appHSBToRGB(hsb));
}

function appSelectorTemplate(title, full) {
    return (full) ? 'td.' + title + ', td.' + title + ' a.ui-state-default' : 'td.moc-calendar-' + title + ', td.moc-calendar-' + title + ' a.ui-state-default';
}

function appClassTemplate(title, color, full) {
    return appSelectorTemplate(title, full) + ' {background-color: #' + color + '; border: 1px solid #' + color + ';}';
}

function appFindClassIndex(styleSheet, className) {
    var index, classes;

    classes = styleSheet.cssRules || styleSheet.rules;

    for (index = 0; index < classes.length; index++) {
        if (classes[index].selectorText === className) {
            return  index;
        }
    }

    return false;
}

function appDateBlockTemplate(options) {
    var list = '<label for="moc-days-list">Day type: </label><select id="moc-days-list" ng-model="model.date_type">',
        style = '<style type="text/css" id="moc-style">',
        block = '<form name="mocDaysForm"><ul id="moc-days-block">';//<a id="moc-days-block-toggle" data-show="">Show</a>

    angular.forEach(options, function (value) {
        list += '<option value="' + value.id + '">' + value.title + '</option>';
        style += appClassTemplate(value.title, value.color, false);
        block += '<li><div class="moc-colorpicker-' + value.title + ' moc-colorpicker-block" data-color="' + value.color + '" data-item="' + value.id +
            '"><div edit-date-type="" name="' + value.title + 'Item" ng-model="types.' + value.title + '" style="background-color: #' + value.color +
            ';"></div></div><span> - ' + value.title + '</span><button ng-click="updateDate()" ng-disabled="mocDaysForm.' + value.title + 'Item.$pristine">Update</button><button ng-disabled="mocDaysForm.' + value.title + 'Item.$pristine">Cancel</button></li>';
    });

    list += '</select>';

    style += '</style>';

    block += '</ul></form>';

    return {html: list + block, style: style};
}

function parseResponseData(data) {

    var result = [];

    if (data.length > 0) {

        angular.forEach(data, function (value) {
            this[value.day] = value.type;
        }, result);

    }

    return result;
}

function genSendData(data) {
    var result = [];

    if (data.length > 0) {

        for (var item in data) {
            result.push({day: item, type: data[item]});
        }
    }

    return result;
}