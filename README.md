Angular Phonegap Push Notification
==================================
Client side code for receiving notifications

Supports Android GCM notifications

Phonegap/Cordova Plugins used:
- com.phonegap.plugins.PushPlugin
- org.apache.cordova.device
- org.apache.cordova.dialogs
- org.apache.cordova.vibration

Plugin Installation via Cordova CLI:
$ cordova plugin add https://github.com/phonegap-build/PushPlugin.git
$ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
$ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-dialogs.git
$ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-vibration.git

Steps:
1. Install the plugins
2. Include the Notification.js script in index.html
3. Add your Project ID to the pushNotification service
4. Add your custom code to handle the notifications

TO-DO:
1) Add Example
2) Tests


