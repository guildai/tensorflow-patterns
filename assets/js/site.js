// Modified from https://v4-alpha.getbootstrap.com/assets/js/src/application.js
//
initHighlightCopy = function() {
    $('.highlight').each(function () {
        var btnHtml = ('<div class="clipboard"><span class="btn-clipboard" '
                       + 'title="Copy to clipboard">Copy</span></div>');
        $(this).before(btnHtml);
        $('.btn-clipboard').tooltip();
    });

    var clipboard = new Clipboard('.btn-clipboard', {
        target: function (trigger) {
            return trigger.parentNode.nextElementSibling;
        }
    });

    clipboard.on('success', function (e) {
        $(e.trigger)
            .attr('title', 'Copied!')
            .tooltip('_fixTitle')
            .tooltip('show')
            .attr('title', 'Copy to clipboard')
            .tooltip('_fixTitle');

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        var modifierKey = /Mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-';
        var fallbackMsg = 'Press ' + modifierKey + 'C to copy';
        $(e.trigger)
            .attr('title', fallbackMsg)
            .tooltip('_fixTitle')
            .tooltip('show')
            .attr('title', 'Copy to clipboard')
            .tooltip('_fixTitle');
    });
};

matchRow = function(row, terms) {
    var rowText = row.text().toLowerCase();
    for (var i = 0; i < terms.length; i++) {
        if (rowText.indexOf(terms[i]) == -1) {
            return false;
        }
    }
    return true;
};

initPatternsTable = function() {
    var input = $("#patterns-filter");
    var table = $("#patterns-table");
    var status = $("#patterns-filter-status");
    input.keyup(function() {
        var filter = input.val();
        if (filter) {
            filterPatternsTable(filter, table, status);
        } else {
            resetPatternsTable(table, status);
        }
    });
};

filterPatternsTable = function(filter, table, status) {
    var terms = filter.toLowerCase().split(/ +/);
    var total = 0;
    var visible = 0;
    $("tbody tr", table).each(function() {
        var row = $(this);
        if (matchRow(row, terms)) {
            row.show();
            visible += 1;
        } else {
            row.hide();
        }
        total += 1;
    });
    if (visible > 0) {
        status.text("Showing " + visible + " of " + total);
    } else {
        status.text("No matches");
    }
};

resetPatternsTable = function(table, status) {
    $("tbody tr", table).each(function() {
        $(this).show();
    });
    status.text("");
};
