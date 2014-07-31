angular.module('notification')
  .factory('phonegapReady', function($rootScope, $q) {
    var loadingDeferred = $q.defer();

    document.addEventListener('deviceready', function() {
      $rootScope.$apply(loadingDeferred.resolve);
    });

    return function phonegapReady() {
      return loadingDeferred.promise;
    };
  })
  .factory('pushNotification', function(phonegapReady) {
    return {
      registerPush: function(fn) {
        phonegapReady().then(function() {
          var pushNotification = window.plugins.pushNotification,
            successHandler = function(result) {
              console.log('result = ' + result);
            },
            errorHandler = function(error) {
              console.log('error = ' + error);
            };
          if (device.platform == 'android' || device.platform == 'Android') {
            //register the device with GCM
            pushNotification.register(successHandler, errorHandler, {
              'senderID': 'your project ID',
              'ecb': 'onNotificationGCM'
            });
          }
        })

      },
      storeDeviceId: function(id) {
        // store device id for future use when sending notifications from server
      },
      processNotification: function(payload) {
        console.log(payload);
        //process the data sent in the notification 

      },
      unregister: function() {
        //unregister the device id
        console.info('unregister')
        var push = window.plugins.pushNotification;
        if (push) {
          push.unregister(function() {
            console.info('unregister success')
          });
        }
      }
    }
  });

// handle GCM notifications for Android
function onNotificationGCM(event) {
  // get a reference to the pushNotification service
  var elem = angular.element(document.querySelector('[ng-app]'));
  var injector = elem.injector();
  var pushService = injector.get('pushNotification');

  switch (event.event) {
    case 'registered':
      if (event.regid.length > 0) {      
        console.log('REGISTERED' + event.regid);
        pushService.storeDeviceId(event.regid);
      }
      break;

    case 'message':
        //you can choose to handle notifications differently based on when they occur. 
        //i.e. when app is running in the foreground, background or not open
      if (event.foreground) {
        console.log('Inline Notification'); 
      } else {
        if (event.coldstart) {
          console.log('coldstart Notification');
        } else {
          console.log('Background Notification');
        }
      }
          /*Sample way to deal with incoming notification*/
          //pass notification payload to the service
          pushService.processNotification(payload);
          // Example for vibration, beep and alert
          navigator.notification.vibrate(1000);
          navigator.notification.beep(1);
          navigator.notification.alert(event.payload.message);

          console.log('Message' + event.payload.message);
      break;

    case 'error':
      console.log('ERROR -> MSG:' + event.msg);
      break;

    default:
      console.log('EVENT -> Unknown, an event was received and we do not know what it is');
      break;
  }
}

