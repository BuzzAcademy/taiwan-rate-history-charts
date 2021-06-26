var CONST = {
  pages: {
      'CNY-USD' : 'https://rate.bot.com.tw/xrt/quote/l6m/CNY-USD?Lang=zh-TW',
      'EUR-USD' : 'https://rate.bot.com.tw/xrt/quote/l6m/EUR-USD?Lang=zh-TW',
      'JPY-USD' : 'https://rate.bot.com.tw/xrt/quote/l6m/JPY-USD?Lang=zh-TW',
  }
}

casper.options.viewportSize = {
    width: 1280,
    height: 600
};

casper.on('page.error', function(msg, trace) {
    this.echo('Error: ' + msg, 'ERROR');
    for (var i = 0; i < trace.length; i++) {
        var step = trace[i];
        this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
    }
});

casper.test.begin('Taiwan Rate Crawler', function(test) {
    casper.start();
    casper.userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36');
    casper.then(fetchPage);
    casper.run();
});

function fetchPage() {
  for (var k in CONST.pages) {
    (function (k, url) {
      casper.thenOpen(url, function() {
        this.waitForSelector('div.chart-2-cols', function success() {
          wait(3);
          this.then(function () {
            this.captureSelector('../../img/' + k + '.png', 'div.chart-2-cols');
          });
        });
      });
    }(k, CONST.pages[k]));
  }
}

function wait(second) {
    casper.waitForSelector("___WaitForNSeconds___", function() {}, function () {
        this.echo('Wait ' + second + ' second');
    }, second * 1000);
}
