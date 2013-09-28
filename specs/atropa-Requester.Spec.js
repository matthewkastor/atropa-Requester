var atropa = require('../src/atropa-Requester.js');
var fs = require('fs');
var path = require('path');
var specPath = path.resolve(__dirname, '../browser/tests/atropa-Requester.test.js');
var specCode = fs.readFileSync(specPath, "utf8");
eval(specCode);
