/**
 *
 * @source: https://github.com/thomasleplus/crazy-santa/blob/master/crazy-santa.js
 *
 * @licstart The following is the entire license notice for the 
 * JavaScript code in this page.
 *
 * Copyright (C) 2014 Thomas Leplus
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice for the
 * JavaScript code in this page.
 *
 */

function getParam(name) {
    if (window.location.search == null || window.location.search.length == 0) {
      return null;
    }
    var params = window.location.search.substring(1).split('&');
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        if (param[0] == name && (param[1] == null || param[1].match(/^[a-zA-Z0-9]*$/))) {
            return param[1];
        }
    }
    return null;
}

function start() {
  var output = '';
  var step = getParam('step');
  var npart = getParam('npart');
  var chosen = getParam('chosen');
  var swap = getParam('swap');
  if (step == null || step == 0) {
    output += '<form class="form" method="get" action="">';
    output += '<input type="hidden" name="step" value="1" />';
    output += 'How many people are participating? ';
    output += '<input type="text" name="npart"/>';
    output += '<input type="submit" value="Next"/>';
    output += '</form>';
  } else if (chosen == null || chosen == 'false') {
    output += '<form class="form" method="get" action="">';
    output += '<input type="hidden" name="chosen" value="true" />';
    var next = 0;
    for (i = 1; i < step; i++) {
        var s = getParam('swap' + i);
        if (s == null || s != 'true') {
            s = 'false';
            if (i > next) {
                next = i;
            }
        }
        output += '<input type="hidden" name="swap' + i + '" value="' + s + '" />';
    }
    if (next == 0) {
        output += '<input type="hidden" name="step" value="' + (step + 1) + '" />';
    } else {
        output += '<input type="hidden" name="swap" value="' + next + '" />';
        output += '<input type="hidden" name="step" value="' + step + '" />';
    }
    output += 'Participant #' + step + ' may pick a gift and open it. ';
    output += '<input type="submit" value="Done"/>';
    output += '</form>';
  } else if (chosen == 'true') {
    output += '<form class="form" method="get" action="">';
    output += '<input type="hidden" name="chosen" value="true" />';
    var next = 0;
    for (i = 1; i < step; i++) {
        if (i != swap) {
            var s = getParam('swap' + i);
            if (s == null || s != 'true') {
                s = 'false';
                if (i > next && i < swap) {
                    next = i;
                }
            }
            output += '<input type="hidden" name="swap' + i + '" value="' + s + '" />';
        }
    }
    if (next == 0) {
        output += '<input type="hidden" name="step" value="' + (step + 1) + '" />';
    } else {
        output += '<input type="hidden" name="swap" value="' + next + '" />';
        output += '<input type="hidden" name="step" value="' + step + '" />';
    }
    output += 'Does participant #' + swap + ' want to swap gift with participant #' + step + '? ';
    output += '<input type="submit" value="Done"/>';
    output += '</form>';
  }
  $( "#main_content" ).html(output);
}

$( document ).ready(function() {
  start();
});
