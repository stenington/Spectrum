
Spectrum = {};
Spectrum.labelTitle = function(name, failures, total) {
  var class = name.replace(/amp;|lt;|gt;|[^a-zA-Z0-9.\s]/g, "").replace(/\s+|\./g, "-").toLowerCase();
  var passfail = failures > 0 ? "fail" : "pass";
  var namedElement = $("."+class);
  if( namedElement.length == 1 ) { 
    namedElement.addClass(passfail);
  }
  else if( namedElement.length > 1 ) {
    $("#err").append("<p>Too many elements: [." + class + "]</p>");
  }
  else {
    $("#err").append("<p>No element: [." + class + "]</p>"); 
  }
};

Spectrum.summarize = function(failures, total) {
  var passed = total - failures;
  var msg = passed + "/" + total + " pass";
  if( failures != 0 ) {
    msg += ", " + failures + " failed";
  }
  $("#bar").text(msg);
  failures == 0 ? $("#bar").addClass("passed") : $("#bar").addClass("failed");
};

Spectrum.install = function() {
  QUnit.config.autostart = false;
  QUnit.moduleDone = Spectrum.labelTitle;
  QUnit.testDone = Spectrum.labelTitle;
  QUnit.done = Spectrum.summarize;

  $(window).load(function() { 
    eval($("pre.spectrum").text());
    $("pre.spectrum").addClass("brush: spectrum;");
    SyntaxHighlighter.highlight();
  });
};

Spectrum.run = function() {
  QUnit.start();
};
