var WEB_ANIMATIONS_TESTING = true;
var webAnimationsTesting = window;
var assert = chai.assert;
mocha.setup({ ui: 'tdd' });

function loadWebAnimationsBuildTarget(target) {
  var config = webAnimationsTargetConfig[target];
  config.src.concat(config.test).forEach(function(file) {
    document.write('<script src="../' + file + '"></script>\n');
  });
}

(function() {

  var pageError = null;

  addEventListener('error', function(event) {
    pageError = event.filename + ':' + event.lineno + ' ' + event.message;
  });

  addEventListener('load', function() {

    // Inject test suite for page errors if any encountered.
    if (pageError) {
      suite('page-script-errors', function() {
        test('no script errors on page', function() {
          assert.fail(null, null, pageError);
        });
      });
    }

    var runner = mocha.run();

    runner.on('end', function(){
      window.mochaResults = runner.stats;
      window.mochaResults.reports = failedTests;
    });

    var failedTests = [];
    function logFailure(test, err){
      var flattenTitles = function(test){
        var titles = [];
        while (test.parent.title){
          titles.push(test.parent.title);
          test = test.parent;
        }
        return titles.reverse();
      };

      failedTests.push({name: test.title, result: false, message: err.message, stack: err.stack, titles: flattenTitles(test) });
    };
    runner.on('fail', logFailure);

  });

})();
