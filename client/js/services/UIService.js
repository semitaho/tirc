module.exports = (function () {
  return {
    embedly: function(link, success){
      link.embedly({
        done: success
      });

    }

  };

})();
