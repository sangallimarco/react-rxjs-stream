"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StreamManager = function () {
	function StreamManager() {
		_classCallCheck(this, StreamManager);

		this.subs = [];
	}

	_createClass(StreamManager, [{
		key: "add",
		value: function add(x) {
			this.subs.push(x);
		}
	}, {
		key: "dispatch",
		value: function dispatch(channel, actions) {
			var actionKeys = Object.keys(actions);
			var dispatcher = channel.filter(function (x) {
				return actionKeys.includes(x.id);
			}).subscribe(function (x) {
				actions[x.id](x);
			});

			this.subs.push(dispatcher);
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.subs.map(function (x) {
				return x.unsubscribe();
			});
			this.subs = [];
		}
	}]);

	return StreamManager;
}();

exports.default = StreamManager;