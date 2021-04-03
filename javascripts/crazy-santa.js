"use strict";

function getIntParam(name) {
    var params, param, i;
    if (window.location.search === null || window.location.search.length === 0) {
        return 0;
    }
    params = window.location.search.substring(1).split('&');
    for (i = 0; i < params.length; i++) {
        param = params[i].split('=');
        if (param[0] == name && param[1] != null && param[1].match(/^[0-9]+$/)) {
            return parseInt(param[1]);
        }
    }
    return 0;
}

function getIntInput(name) {
    var value, input;
    input = document.getElementById(name);
    if (input == null) {
        return 0;
    }
    value = input.value;
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
    for (var i = cpart - 1; i > 0; i--) {
        if (getIntInput('swapped' + i) == 0) {
            return i;
        }
    }
  return 0;
}

function clickDone() {
    var cpart = getIntInput('cpart');
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
        for (var i = 1; i < cpart; i++) {
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
