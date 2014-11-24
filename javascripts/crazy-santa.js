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

function getIntParam(name) {
  if (window.location.search == null || window.location.search.length == 0) {
    return 0;
  }
  var params = window.location.search.substring(1).split('&');
  for (var i = 0; i < params.length; i++) {
    var param = params[i].split('=');
    if (param[0] == name && param[1] != null && param[1].match(/^[0-9]+$/)) {
      return parseInt(param[1]);
    }
  }
  return 0;
}

function getIntInput(name) {
  var input = document.getElementById(name);
  if (input == null) {
    return 0;
  }
  var value = input.value;
  if (value != null && value.match(/^[0-9]+$/)) {
      return parseInt(value);
  }
  return 0;
}

function validateNPart() {
  var npart = getIntInput('npart');
  if (npart == 0) {
    alert('Please type a valid number of participants!');
    return false;
  }
}

function findNextSwap(cpart) {
  for (i = cpart - 1; i > 0; i--) {
    if (document.getElementById('swapped' + i).value == 0) {
      return i;
    }
  }
  return 0;
}

function clickDone() {
  var cpart = getIntInput('cpart');
  var cswap = getIntInput('cswap');
  var nswap = findNextSwap(cpart);
  if (nswap > 0) {
    document.getElementById('cswap').value = nswap;
  } else {
    document.getElementById('cpart').value = cpart + 1;
    document.getElementById('cswap').value = 0;
  }
}

function clickYes() {
  var cpart = getIntInput('cpart');
  var cswap = getIntInput('cswap');
  document.getElementById('swapped' + cswap).value = 1;
  document.getElementById('cpart').value = cpart + 1;
  document.getElementById('cswap').value = 0;
}

function clickNo() {
  var cpart = getIntInput('cpart');
  var cswap = getIntInput('cswap');
  var nswap = findNextSwap(cswap);
  if (nswap > 0) {
    document.getElementById('cswap').value = nswap;
  } else {
    document.getElementById('cpart').value = cpart + 1;
    document.getElementById('cswap').value = 0;
  }
}

function start() {
  var output = '';
  var npart = getIntParam('npart');
  var cpart = getIntParam('cpart');
  var cswap = getIntParam('cswap');
  if (npart == 0) {
    output += '<form name="santa" id="santa" method="get" action="" onsubmit="return validateNPart()">';
    output += 'Before we start, write a number for each participant on pieces of paper and ask everyone to blindly draw one paper from a hat. When you are ready, tell me how many people are participating? ';
    output += '<input type="hidden" name="cpart" id="cpart" value="1" />';
    output += '<input type="hidden" name="cswap" id="cswap" value="0" />';
    output += '<input type="text" name="npart" id="npart" size="3" />&nbsp;';
    output += '<input type="submit" value="Next"/>';
    output += '</form>';
  } else if (cpart > npart) {
    output += '<form name="santa" id="santa" method="get" action="">';
    output += 'Finally participant #' + npart + ' can swap gift with participant #1. That\'s all folks! ';
    output += '<input type="submit" value="Restart"/>';
    output += '</form>';
  } else {
    output += '<form name="santa" id="santa" method="get" action="">';
    output += '<input type="hidden" name="npart" id="npart" value="' + npart + '" />';
    output += '<input type="hidden" name="cpart" id="cpart" value="' + cpart + '" />';
    output += '<input type="hidden" name="cswap" id="cswap" value="' + cswap + '" />';
    for (i = 1; i < cpart; i++) {
      output += '<input type="hidden" name="swapped' + i + '" id="swapped' + i + '" value="' + getIntParam('swapped' + i) + '" />';
    }
    if (cswap == 0) {
      output += 'Participant #' + cpart + ' may pick a gift and open it. ';
      output += '<input type="submit" value="Done" onclick="clickDone()"/>';
    } else {
      output += 'Does participant #' + cswap + ' want to swap gift with participant #' + cpart + '? ';
      output += '<input type="submit" value="Yes" onclick="clickYes()"/>&nbsp;';
      output += '<input type="submit" value="No" onclick="clickNo()"/>';
    }
    output += '</form>';
  }
  document.getElementById('main_content').innerHTML = output;
}

document.addEventListener('DOMContentLoaded', function(event) { 
  start();
});
