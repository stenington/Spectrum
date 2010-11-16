;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush()
	{

    function refineMatch(class) {
      return function (matchAndGroups, regexInfo) {
        var match, index, css, norm;
        match = matchAndGroups[2];
        index = matchAndGroups.index + matchAndGroups[1].length;
        norm = match.replace(/amp;|lt;|gt;|[^a-zA-Z0-9.\s]/g, "").replace(/^\s*/, "").replace(/\s*$/, "").replace(/\s+|\./g, "-").toLowerCase();
        css = class + " " + norm
        return [new SyntaxHighlighter.Match(match, index, css)]; 
      };
    }

		this.regexList = [
			//{ regex: /\bdescribe\s*\(\s*\"([^\"]*)\"\s*\)/igm, func: cssMakerMaker("module-") }	
			{ regex: /(\bdescribe\s*\(\s*\")([^\"]*)\"/gm, func:refineMatch("describe") },
			{ regex: /(\bit\s*\(\s*\")([^\"]*)\"/gm, func:refineMatch("it") },
      { regex: /\/\/.*$/gm, css:"comment" }
			];
	
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['spectrum'];

	SyntaxHighlighter.brushes.SpecIt = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
