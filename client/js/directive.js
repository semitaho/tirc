angular.module("tirc-directives", []).directive("ngEnter",
        function($timeout, $location, $window) {
          return function(scope, element, attrs) {
           
          };
        }).directive('idle', function($interval) {

  return {
    link: function(scope, element, attrs) {
      $interval(function() {
        angular.forEach(scope.users, function(user, key) {
          var idletime = user.idleTime + 1;

          user.idleTime = idletime;
        });

      }, 1000);
    }
  };

}).directive("autoScroll", function($timeout) {
  return {
    link: function(scope, element, attrs) {

      var autoscroll = function() {
        $timeout(function() {
          var div = document.getElementById(attrs.id);
          div.scrollTop = div.scrollHeight;
        });
      };

      $(window).resize(autoscroll);

      scope.$watch(function() {
        return element.children().length;
      }, function() {
        autoscroll();
      });

    }
  };

}).directive('handleFocus', function($interval, $window) {

  return {
    link: function(scope, element, attrs) {
      scope.currentTitle = scope.title;
      scope.promise = false;
      $window.onfocus = function() {
        if (scope.promise) {
          $interval.cancel(scope.promise);
          scope.promise = false;
          scope.title = scope.currentTitle;
        }
        scope.newMessages = 0;
      };
      $window.onblur = function() {
        scope.newMessages = 0;
        var mainTitle = true;
        scope.promise = $interval(function() {
          mainTitle = !mainTitle;
          if (!mainTitle && scope.newMessages > 0) {
            scope.title = 'new messages: ' + scope.newMessages;
          } else {
            scope.title = scope.currentTitle;
          }
        }, 1000);
      };
    }
  };
});
