#nodebb-widget-slack-users

This plugin for NodeBB allows people to put a configurable widget on their website which shows their Slack server's details.

## Installation
 
Two options:

 1.  Install the plugin through the ACP (if it ever gets added to the list *cough cough*)
 2.  Run `npm install nodebb-widget-slack-users` in the root directory of the NodeBB install

Don't forget to restart after installing the plugin. After installing, a new Slack widget should appear next to the rest

## Configuration
All one must do is, in the NodeBB Admin area, go to Themes > Widgets, drag the widget wherever you want, and configure the options for the widget.  You will need to provide the Slack authoization token.

## Get a Slack token

In Slack

1. Go to
  * Apps
  * Manage (top of page)
  * Custom Integrations (left column)
  * Bots
4. Add Configuration
  * Enter a user name for the bot.
  * Grab token on next page

## Features
* Show how many users are online in the Teamspeak server
* Can be themed easily

## Tips
* Enable scrolling in the widget container by setting style to something lile `max-height:400px;overflow-y:auto`.
* Add a link to you Slack by adding it to the container.  Example below.
```html
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">
      <a href="http://my.slack.com/">{{title}}</a>
    </h3>
  </div>
  <div class="panel-body" style="max-height:400px;overflow-y:auto">{{body}}</div>
 </div>
```

## Suggestions? Encountered a Bug?
Please submit all feature requests and bugs with the [Issue tracker at Github.](https://github.com/sunsetbrew/nodebb-widget-slack-users/issues) Thanks
