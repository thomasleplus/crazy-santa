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
        if (param[0] == name) {
            return param[1];
        }
    }
    return null;
}

function start() {
  var output;
  var step = getParam("step");
  if (step == null || step == 0) {
    output = "Hello world!";
  } else {
    output = "Sorry the script encountered an unexpected error!";
  }
  $( "#main_content" ).html(output);
}

$( document ).ready(function() {
  start();
});
