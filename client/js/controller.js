angular.module("tirc-controllers", []).controller(
        "tirc-controller",
        [
            '$scope',
            '$timeout',
            '$interval',
            '$filter',
            '$window',
            'TircService',
            'tircLogs',
            'connectdata',
            function($scope, $timeout, $interval, $filter, $window,
                    TircService, tircLogs, connectdata) {
              console.log('got connect data: ' + angular.toJson(connectdata));
              $scope.todaytexts = [];
              $scope.location = null;
              $scope.topic = "";
              $scope.nicks = [];

              $scope.texts = $scope.todaytexts;
              $scope.users = [];
              $scope.dt = $filter("date")(Date.now(), 'yyyy-MM-dd');

              $scope.onerror = function(data, status) {
                console.log('timeout occured, retrying...:' + status);
              };
              
              $scope.errorCallback = function() {
                console.log('server error, stopped');
              };
              $scope.onusers = function(data) {
                console.log('on users');
                $scope.users = data.users;

              };

              $scope.ontopic = function(data) {
                console.log('on topic: '+data);
                $scope.topic = data;
              };
              
              $scope.onmessage = function(datajson) {
                console.log('on arrived');
                $timeout(function() {
                  $scope[datajson.type].apply(this, [datajson.data]);
                  TircService.listen(datajson.lastid, $scope.onmessage,
                          $scope.onerror);
                });
              };

            
              $scope.receive = function(data) {
                console.log('on receive');
                var row = data;
                $scope.todaytexts.push(data);
                $scope.newMessages += 1;

              };
              $scope.onconnectmessages = [];
              $scope.nick = "Andon";
              if (localStorage && localStorage.getItem('tircnick') !== null) {
                $scope.nick = localStorage.getItem('tircnick');
              }
              $scope.names = ['Andon', 'andyn', 'BB', 'Aris', 'Aranda', 'taho',
                  'hasu', 'melfstro', 'mcw'];
              $scope.names.sort(function(a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
              });
              $scope.toDateString = function(dateObj) {
                var dateString = dateObj.getFullYear();

                var month = dateObj.getMonth() + 1;
                if (month < 10) {
                  month = "0" + month;
                }
                dateString += "-" + month;

                var day = dateObj.getDate();
                if (day < 10) {
                  day = "0" + day;
                }
                dateString += "-" + day;
                return dateString;
              };
              $scope.today = true;
              $scope.title = 'tIrc 2.0';

              $scope.texts = connectdata.logsData;
              $scope.ontopic(connectdata.topic);
              $scope.onusers(connectdata.users);
              $scope.todaytexts = $scope.texts || [];

              angular.forEach(connectdata.currentData, function(line) {
                $scope.todaytexts.push(line);
              });
              var currentloc = $scope.currentlocation !== null
                      && $scope.currentLocation !== undefined
                      ? $scope.currentlocation : null;
              $scope.$on('gotlocation', function(data, location) {
                TircService.sayWelcome($scope.nick, location);
              });

              $scope.$on('nolocation', function() {
                console.log('no location...');
                TircService.sayWelcome($scope.nick);

              });
              TircService.listen(connectdata.id, $scope.onmessage,
                      $scope.onerror);

              // save -5 day logs into localstorage
              if (tircLogs.isWebStorageSupported) {
                // to timestamp
                var currentDate = new Date($scope.dt);
                for (var datediff = -1; datediff >= -5; datediff--) {
                  var newDate = new Date();
                  newDate.setDate(currentDate.getDate() + datediff);

                  var timestamp = newDate.getTime();
                  var dateStr = $scope.toDateString(newDate);
                  if (tircLogs.getLogs(dateStr) !== null) {
                    continue;
                  }
                  TircService.serveDay(timestamp).then(function(response) {
                    var logsData = response.data.logsData;
                    var time = response.data.timestamp;
                    var datetime = new Date(time);
                    var dateString = $scope.toDateString(datetime);

                    if (logsData.length > 0) {
                      tircLogs.saveLogs(dateString, logsData);
                    }
                  }, function() {
                    console.log('error...');
                  });
                }
              }

              $scope.newMessages = 0;

              $scope.said = true;
              $scope.opened = false;

              $scope.isOwn = function(input) {
                return input.indexOf("tirc") !== -1
                        && input.indexOf("sanoo") !== -1;
              };

              $scope.isJoinOrPart = function(input) {
                return input.indexOf("has joined #") !== -1
                        || input.indexOf("has left #") !== -1;
              };

              $scope.isQuit = function(input) {
                return input.indexOf("has quit ") !== -1;

              };

              $scope.isMePart = function(input) {
                return input.indexOf(" * ") !== -1
                        && input.indexOf(" has ") === -1
                        && input.indexOf('<') === -1
                        && input.indexOf('>') === -1;

              };

              $scope.isDayChanged = function(input) {
                return input.indexOf("Day changed") !== -1;
              };

              $scope.isMode = function(input) {
                return input.indexOf('mode/#') !== -1
                        || input.indexOf('-!- Netsplit') !== -1;
              };

              $scope.update = function() {
                $scope.showDropdown = false;
              };

              function isTodayDate(d1) {
                var d2 = new Date();
                return d1.getFullYear() == d2.getFullYear()
                        && d1.getMonth() == d2.getMonth()
                        && d1.getDate() == d2.getDate();
              }

              $scope.initLogs = function() {
                // to date
                var date = new Date($scope.dt);
                $scope.today = isTodayDate(date);
                if ($scope.today) {
                  $scope.texts = $scope.todaytexts;
                  return;
                }
                // to timestamp
                var timestamp = new Date(date).getTime();
                if (tircLogs.getLogs($scope.dt) !== null) {
                  $scope.texts = tircLogs.getLogs($scope.dt);
                  return;
                }
                // call backend
                TircService.serveDay(timestamp).then(function(response) {
                  var logsData = response.data.logsData;
                  $scope.texts = logsData;
                  var timestamp = response.data.timestamp;
                  var datetime = new Date(timestamp);
                  var dateString = $scope.toDateString(datetime);
                  if (logsData.length > 0) {
                    tircLogs.saveLogs(dateString, logsData);
                  }

                }, function(failed) {
                  console.log("failed to get data:" + failed);
                });

              };

              $scope.swipeLeft = function() {
                var date = new Date($scope.dt);
                date.setDate(date.getDate() + 1);
                $scope.dt = $filter("date")(date, 'yyyy-MM-dd');
                $scope.initLogs();
              };

              $scope.swipeRight = function() {
                var date = new Date($scope.dt);
                date.setDate(date.getDate() - 1);
                $scope.dt = $filter("date")(date, 'yyyy-MM-dd');
                $scope.initLogs();
              };

              $scope.selectNick = function() {
                $scope.showDropdown = false;
                if (localStorage) {
                  localStorage.setItem('tircnick', $scope.nick);
                }
              };

              $scope.initGeolocation = function() {
                if ($window.navigator.geolocation) {
                  console.log('geolocation supported');
                  $scope.getPosition();

                }
              };

            }]);