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

function validateNPart() {
    var npart = $( "#npart" ).val();
    if (npart == null || !npart.match(/^[1-9][0-9]*$/)) {
        alert("Please type a valid number of participants!");
        return false;
    }
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
    output += '<form name="santa" id="santa" method="get" action="" onsubmit="return validateNPart()">';
    output += '<input type="hidden" name="cpart" id="cpart" value="1" />';
    output += 'Before we start, write a number for each participant on pieces of paper and ask each participant to blindly draw one of the pieces of paper from a hat. When you are ready, tell me how many people are participating? ';
    output += '<input type="text" name="npart" id="npart" size="3" />';
    output += '<input type="submit" value="Next"/>';
    output += '</form>';
  } else if (cpart > npart) {
    output += '<form name="restart" id="restart" method="get" action="">';
    output += 'Finally participant #' + npart + ' can swap gift with participant #1.<br/>That\'s all folks!<br/>';
    output += '<input type="submit" value="Restart"/>';
    output += '</form>';
  } else if (chosen == null || chosen == 'False') {
    output += '<form name="santa" id="santa" method="get" action="">';
    output += '<input type="hidden" name="npart" id="npart" value="' + npart + '" />';
    var next = 0;
    for (i = 1; i < cpart; i++) {
        var swapped = getParam('swapped' + i);
        if (swapped == null || swapped != 'Yes') {
            swapped = 'No';
            if (i > next) {
                next = i;
            }
        }
        output += '<input type="hidden" name="swapped' + i + '" id="swapped' + i + '" value="' + swapped + '" />';
    }
    if (next == 0) {
        output += '<input type="hidden" name="chosen" id="chosen" value="False" />';
        output += '<input type="hidden" name="cpart" id="cpart" value="' + (cpart + 1) + '" />';
    } else {
        output += '<input type="hidden" name="chosen" id="chosen" value="True" />';
        output += '<input type="hidden" name="cswap" id="cswap" value="' + next + '" />';
        output += '<input type="hidden" name="cpart" id="cpart" value="' + cpart + '" />';
    }
    output += 'Participant #' + cpart + ' may pick a gift and open it. ';
    output += '<input type="submit" value="Done"/>';
    output += '</form>';
    output += '<form name="reset" id="reset" method="get" action="">';
    output += '<input type="submit" value="Reset"/>';
    output += '</form>';
  } else if (chosen == 'True') {
    output += '<form name="santa" id="santa" method="get" action="">';
    output += '<input type="hidden" name="npart" id="npart" value="' + npart + '" />';
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
            output += '<input type="hidden" name="swapped' + i + '" id="swapped' + i + '" value="' + swapped + '" />';
        }
    }
    if (next == 0) {
        output += '<input type="hidden" name="chosen" id="chosen" value="False" />';
        output += '<input type="hidden" name="cpart" id="cpart" value="' + (cpart + 1) + '" />';
    } else {
        output += '<input type="hidden" name="chosen" id="chosen" value="True" />';
        output += '<input type="hidden" name="cswap" id="cswap" value="' + next + '" />';
        output += '<input type="hidden" name="cpart" id="cpart" value="' + cpart + '" />';
    }
    output += 'Does participant #' + cswap + ' want to swap gift with participant #' + cpart + '? ';
    output += '<input type="submit" name="swapped' + cswap + '" id="swapYes" value="Yes"/>';
    output += '<input type="submit" name="swapped' + cswap + '" id="swapNo" value="No"/>';
    output += '</form>';
    output += '<form name="reset" id="reset" method="get" action="">';
    output += '<input type="submit" value="Reset"/>';
    output += '</form>';
  }
  $( "#main_content" ).html(output);
}

$( document ).ready(function() {
  start();
});
