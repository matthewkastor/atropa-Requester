var Requester = require('../src/atropa-Requester.js');

try {
    Object.keys(Requester).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = Requester[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-Requester.js');
}

Object.keys(Requester.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = Requester.data[prop];
    }
);
