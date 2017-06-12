'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Subject2 = require('rxjs/Subject');

require('rxjs/add/operator/filter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Stream
 */
var Stream = function (_Subject) {
    _inherits(Stream, _Subject);

    function Stream() {
        _classCallCheck(this, Stream);

        return _possibleConstructorReturn(this, (Stream.__proto__ || Object.getPrototypeOf(Stream)).apply(this, arguments));
    }

    _createClass(Stream, [{
        key: 'on',
        value: function on(id) {
            var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return this.filter(function (data) {
                return name ? data.id === id && data.name === name : data.id === id;
            });
        }
    }, {
        key: 'emit',
        value: function emit(id) {
            var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.next({
                id: id,
                name: name,
                data: data
            });
        }
    }]);

    return Stream;
}(_Subject2.Subject);

exports.default = Stream;