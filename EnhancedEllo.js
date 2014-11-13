// ==UserScript==
// @name        Enhanced Ello
// @namespace   Ello
// @description Making Ello a better place.
// @include     https://ello.co/*
// @version     1
// @grant       none
// ==/UserScript==

/* Add hilight JS  && CSS */
  script = "https://highlightjs.org/static/highlight.pack.js";
  //$("head").append('<script type="text/javascript" src="' + script + '"></script>');
  $.getScript(script, function() {
    	hljs.initHighlighting();
  });
  $("head").append('<link rel="stylesheet" type="text/css" href="https://highlightjs.org/static/styles/default.css">');

$(document).ajaxComplete(function(e, jqXHR){
  val = $(document).find("pre code");
  for (i = 0; val[i] != 'undefined'; i++) {
    hljs.highlightBlock(val[i]);
    $(val[i]).css("font-style", "normal");
  }
});

$(document).ready(function (){
    // Fix Italic on Code
  $('pre code').each(function(i, block) {
    $(block).css("font-style", "normal");
  });
});
