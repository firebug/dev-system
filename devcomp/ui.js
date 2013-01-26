
const PATH = require("path");
const FS = require("fs");


exports.main = function(options) {

	var API = options.API;
	var $ = API.$;
	var document = API.document;


	$(document).ready(function(){

		function append(html) {
			$("body").append(html);
		}

		append("<h3>Firebug Developer Workspace</h3>");

	});
}
