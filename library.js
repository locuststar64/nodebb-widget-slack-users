(function(module, realModule) {

    "use strict";

    var fs = require("fs");
    var path = require("path");
    var http = require("https");
    var handlebars = require('handlebars');
    var translator = require.main.require('./public/src/modules/translator');

	var prepError = Handlebars.compile(fs.readFileSync("./public/templates/errors.tpl"));
   
    
     var prepError2 = function(message) {
                var markup = '<div class="slackusers-module">';
                 markup = '<div class="slackusers-module-error">';
                 markup += message;
                 markup += '</div>';
                 markup += '</div>';
	return markup;
    };
     var prepNoUser = function(message) {
                var markup = '<div class="slackusers-module">';
                 markup = '<div class="slackusers-module-nouser">';
                 markup += message;
                 markup += '</div>';
                 markup += '</div>';
	return markup;
    };

    module.renderSlackUsersWidget = function(widget, callback) {
        var token = widget.data.token;
	var cb = callback;

        if (!token) {
		translator.translate('[[slackusers:notoken]]', function(translated) {
            		cb(null, prepError(translated));
		});
            return;
        }

        // Options to be used by request
        var options = {
            host: 'slack.com',
            port: 443,
            path: '/api/users.list?presence=1&token=' + token
        };

        var requestCallback = function(response) {

            // Continuously update stream with data
            var body = '';
            var online = [];

            response.on('data', function(data) {
                body += data;
            });

            response.on('end', function() {
                var data = JSON.parse(body);

                if (!data.ok) {
		translator.translate('[[slackusers:requestfailed]]', function(translated) {
            		cb(null, prepError(translated  + ' ' + data.error));
		});
                    return;
                }
                data.members.forEach(member => {
                    if (member.presence == 'active') {
                        online.push(member.name);
                    }
                });

                if (online.length == 0) {
                    cb(null, prepNoUsers("No active users."));
                    return;
                }

                var markup = '<div class="slackusers-module"><ul>';
                online.forEach(name => {
                    markup += '<li>' + name + '</li>';
                });
                markup += '</ul></div>';
                cb(null, markup);

            });
        };

        // Make a request to the server
        var req = http.request(options, requestCallback);
	req.on('error', (e) => {
		translator.translate('[[slackusers:requesterror]]', function(translated) {
            		cb(null, prepError(translated  + ' ' + data.error));
		});
	});
        req.end();
    };

    module.defineWidget = function(widgets, callback) {
	translator.translate('[[slackusers:name]]', function(name) {
	translator.translate('[[slackusers:description]]', function(description) {
        widgets.push({
            widget: "slackusers",
            name: name,
            description: description,
            content: fs.readFileSync(path.resolve(__dirname, './public/templates/widget.tpl')),
        });
        callback(null, widgets);
	});
	});
    };

}(module.exports, module));
