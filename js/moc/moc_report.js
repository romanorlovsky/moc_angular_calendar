function toggleDiv(el) {
    var block = $(el).parents("li:first").children("div:first");
    $(el).toggleClass('collapsed');
    block.toggle();
}

$('.hasDatepicker').live('change', function() {

    var date_from = $('#personal_exceptional_date_from').val();
    var date_to = $('#personal_exceptional_date_to').val();
    if (date_from && date_to) {

        var from = new Date(date_from);
        var to = new Date(date_to);
        var countDays = (to < from) ? 0 : (new Date(to - from).getDate());
        $('#personal_exceptional_summary').val(countDays*8);
    }
});

function clearForm(form) {
    form.find(":input").each(function() {
        switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
}

function initCalendar(calendarId, selectedDates, disabledDates, returnId, returnCountId) {
    var calendar = $(calendarId);
    var today = new Date();
    var firstYearDay = new Date(today.getFullYear(),0,1);
    var dates = selectedDates;
    var generalDates = disabledDates;
    var dates_selected = false;
    var general_dates_selected = false;

    if (dates) {
        dates_selected = [];
        for (var i=0; i < dates.length; i++) {
        dates_selected.push(new Date(dates[i]*1000));
        }
    }

    if (generalDates) {
        general_dates_selected = [];
        for (var i=0; i < generalDates.length; i++) {
            general_dates_selected.push(new Date(generalDates[i]*1000));
        }
    }

    calendar.multiDatesPicker({
        addDates: dates_selected,
        addDisabledDates: general_dates_selected,
        defaultDate: firstYearDay,
        numberOfMonths: [3,4],
        changeMonth: false,
        changeYear: false,
        firstDay: 1,
        stepMonths: 12,

        onSelect: function(dateText, datePicker) {
            datePicker.drawMonth = 0;
            datePicker.drawYear = datePicker.currentYear;

            dates_timestamp = [];
            dates = $(this).multiDatesPicker('getDates');
            for(var i=0; i < dates.length; i++) {
                d = new Date(dates[i]);
                dates_timestamp.push(d.getTime()/1000);
            }

            $(returnId).val(dates_timestamp.join(','));
            if (returnCountId) {
                $(returnCountId).val(dates.length*8 - old_hours);
            }
        }
    });
}

$(document).ready(function () {


    $('#form_send_to_users').submit( function() {
        $('#report_user_from').val($('#from').val());
        $('#report_user_to').val($('#to').val());

        var user_ids = [];
        $('table.list input:checked').each(function(i) {
            user_ids.push($(this).attr('id').replace('send_', ''));
        });
        $('#report_user_ids').val(user_ids.join(','));
    });

    $('#form_send_to_admin').submit( function() {
        $('#report_admin_from').val($('#from').val());
        $('#report_admin_to').val($('#to').val());

        var user_ids = [];
        $('table.list input:checked').each(function(i) {
            user_ids.push($(this).attr('id').replace('send_', ''));
        });
        $('#report_admin_ids').val(user_ids.join(','));
    });

    $('#form_personal_exceptional').live('ajax:beforeSend', function() {

        $('#flash_notice').remove();
        $('#flash_error').remove();

    }).live('ajax:success',function(event, data, status, xhr){

            $('.personal_exceptionals_list').html(data.html);
            $('#form_personal_exceptional').replaceWith(data.form);

        }).live('ajax:error',function(event, data, status, xhr){

            var responseObject = $.parseJSON(data.responseText)
            var errors = '<div id="flash_error" class="flash error"><ul>';

            $.each(responseObject.errors, function(index, value){
                errors += '<li>' + index + ': ' + value + '</li>';
            });
            errors += '</ul></div>';
            $(errors).insertBefore('#content h2');

        });


    $("a.personal_exceptional_remove_link").live('ajax:beforeSend', function(e, data, status, xhr) {

        $('#flash_notice').remove();
        $('#flash_error').remove();

    }).live('ajax:success', function(e, data, status, xhr) {

            $('.personal_exceptionals_list').html(data.html);

        }).live('ajax:error', function(e, data, status, xhr) {

            $('<div id="flash_error" class="flash error">'+ data.message +'</div>').insertBefore('#content h2');

        });


    $("a.personal_exceptional_edit_link").live('ajax:beforeSend', function(e, data, status, xhr) {

        $('#flash_notice').remove();
        $('#flash_error').remove();

    }).live('ajax:success', function(e, data, status, xhr) {

            $('#form_personal_exceptional').replaceWith(data.html);

        }).live('ajax:error', function(e, data, status, xhr) {


        });

});
