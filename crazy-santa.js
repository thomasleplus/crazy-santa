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
  var npart = getParam('npart');
  if (npart != null) {
    npart = parseInt(npart);
  }
  var cpart = getParam('cpart');
  if (cpart != null) {
    cpart = parseInt(cpart);
  }
  var chosen = getParam('chosen');
  var cswap = getParam('cswap');
  if (cswap != null) {
    cswap = parseInt(cswap);
  }
  if (npart == null) {
    output += '<form class="form" method="get" action="">';
    output += '<input type="hidden" name="cpart" value="1" />';
    output += 'Before we start, write a number for each participant on pieces of paper and ask each participant to blindly draw one of the pieces of paper from a hat. When you are ready, tell me how many people are participating?<br/>';
    output += '<input type="text" name="npart"/>';
    output += '<input type="submit" value="Next"/>';
    output += '</form>';
  } else if (cpart > npart) {
    output += '<form class="form" method="get" action="">';
    output += 'Finally participant #' + npart + ' can swap gift with participant #1.<br/>That\'s all folks!';
    output += '</form>';
  } else if (chosen == null || chosen == 'False') {
    output += '<form class="form" method="get" action="">';
    output += '<input type="hidden" name="npart" value="' + npart + '" />';
    var next = 0;
    for (i = 1; i < cpart; i++) {
        var swapped = getParam('swapped' + i);
        if (swapped == null || swapped != 'Yes') {
            swapped = 'No';
            if (i > next) {
                next = i;
            }
        }
        output += '<input type="hidden" name="swapped' + i + '" value="' + swapped + '" />';
    }
    if (next == 0) {
        output += '<input type="hidden" name="chosen" value="False" />';
        output += '<input type="hidden" name="cpart" value="' + (cpart + 1) + '" />';
    } else {
        output += '<input type="hidden" name="chosen" value="True" />';
        output += '<input type="hidden" name="cswap" value="' + next + '" />';
        output += '<input type="hidden" name="cpart" value="' + cpart + '" />';
    }
    output += 'Participant #' + cpart + ' may pick a gift and open it.<br/>';
    output += '<input type="submit" value="Done"/>';
    output += '</form>';
  } else if (chosen == 'True') {
    output += '<form class="form" method="get" action="">';
    output += '<input type="hidden" name="npart" value="' + npart + '" />';
    var next = 0;
    for (i = 1; i < cpart; i++) {
        if (i != cswap) {
            var swapped = getParam('swapped' + i);
            if (swapped == null || swapped != 'Yes') {
                swapped = 'No';
                if (i > next && i < cswap) {
                    next = i;
                }
            }
            output += '<input type="hidden" name="swapped' + i + '" value="' + swapped + '" />';
        }
    }
    if (next == 0) {
        output += '<input type="hidden" name="chosen" value="False" />';
        output += '<input type="hidden" name="cpart" value="' + (cpart + 1) + '" />';
    } else {
        output += '<input type="hidden" name="chosen" value="True" />';
        output += '<input type="hidden" name="cswap" value="' + next + '" />';
        output += '<input type="hidden" name="cpart" value="' + cpart + '" />';
    }
    output += 'Does participant #' + cswap + ' want to swap gift with participant #' + cpart + '?<br/>';
    output += '<input type="submit" name="swapped' + cswap + '" value="Yes"/>';
    output += '<input type="submit" name="swapped' + cswap + '" value="No"/>';
    output += '</form>';
  }
  output += '<form class="reset" method="get" action="">';
  output += '<input type="submit" value="Reset"/>';
  output += '</form>';
  $( "#main_content" ).html(output);
}

$( document ).ready(function() {
  start();
});
