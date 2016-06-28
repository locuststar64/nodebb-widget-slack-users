(function(module, realModule) {

    "use strict";

    var fs = require("fs");
    var path = require("path");
    var http = require("https");
    var handlebars = require('handlebars');
    var translator = require.main.require('./public/src/modules/translator');

    var errorTemplate = handlebars.compile("" + fs.readFileSync(path.resolve(__dirname, "./private/templates/errors.tpl")));
    var nousersTemplate = handlebars.compile("" + fs.readFileSync(path.resolve(__dirname, "./private/templates/nousers.tpl")));
    var listTemplate = handlebars.compile("" + fs.readFileSync(path.resolve(__dirname, "./private/templates/list.tpl")));

    module.renderSlackUsersWidget = function(widget, callback) {
        var token = widget.data.token;
        var cb = callback;

        if (!token) {
            translator.translate('[[slackusers:notoken]]', function(translated) {
                cb(null, errorTemplate({
                    message: translated
                }));
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
                        cb(null, errorTemplate({
                            message: translated + ' ' + data.error
                        }));
                    });
                    return;
                }
                data.members.forEach(member => {
                    if (member.presence == 'active') {
                        online.push({
                            name: member.name
                        });
                    }
                });

                if (online.length == 0) {
                    translator.translate('[[slackusers:nousers]]', function(translated) {
                        cb(null, nousersTemplate({
                            message: translated
                        }));
                    });
                    return;
                }

                cb(null, listTemplate({
                    users: online
                }));

            });
        };

        // Make a request to the server
        var req = http.request(options, requestCallback);
        req.on('error', (e) => {
            translator.translate('[[slackusers:requesterror]]', function(translated) {
                cb(null, errorTemplate({
                    message: translated + ' ' + e.message
                }));
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
                    content: fs.readFileSync(path.resolve(__dirname, './private/templates/widget.tpl')),
                });
                callback(null, widgets);
            });
        });
    };

}(module.exports, module));