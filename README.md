#nodebb-widget-slack-users

This plugin for NodeBB allows people to put a configurable widget on their website which shows their Slack server's details.

##Installation

Two options:

 1.  Install the plugin through the ACP (if it ever gets added to the list *cough cough*)
 2.  Run `npm install nodebb-widget-slack-users` in the root directory of the NodeBB install

Don't forget to restart after installing the plugin. After installing, a new Slack widget should appear next to the rest

##Configuration
All one must do is, in the NodeBB Admin area, go to Themes > Widgets, drag the widget wherever you want, and configure the options for the widget.  You will need to provide the Slack authoization token.

# How to get a Slack token?

In Slack, go to 
1. Go to
  * Apps
  * Manage (top of page)
  * Custom Integrations (left column)
  * Bots
4. Add Configuration
  * Enter a user name for the bot.
  * Grab token on next page

##Features
* Show how many users are online in the Teamspeak server
* Can be themed easily
* Shows the server info and a click on the title or link will open the Teamspeak server in the client
* Can show the full channel tree, and users can be themed by server group, and channels can be themed by channel type

## Suggestions? Encountered a Bug?
Please submit all feature requests and bugs with the [Issue tracker at Github.](https://github.com/sunsetbrew/nodebb-widget-slack-users/issues) Thanks
