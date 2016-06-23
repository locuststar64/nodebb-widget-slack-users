(function(module, realModule) {

  "use strict";

  var fs = require("fs"),
      path = require("path");

  module.renderSlackUsersWidget = function(widget, callback) {

  };

  module.defineWidget = function(widgets, callback) {
    widgets.push({
      widget: "slackusers",
      name: "Slack users viewer",
      description: "Any text, html, or embedded script.",
      content: fs.readFileSync(path.resolve(__dirname, './public/templates/widget.tpl')),
    });

    callback(null, widgets);
  };

}(module.exports, module));
