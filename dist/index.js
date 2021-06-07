Object.defineProperty(exports, '__esModule', { value: true });

var Updates = require('expo-updates');
var reactNative = require('react-native');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var showConfirmAlert = function (title, message, confirmText, cancelText) {
    if (confirmText === void 0) { confirmText = "Confirm"; }
    if (cancelText === void 0) { cancelText = "Cancel"; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    reactNative.Alert.alert(title, message, [
                        { text: confirmText, onPress: function () { return resolve(true); } },
                        { text: cancelText, onPress: function () { return resolve(false); }, style: "cancel" },
                    ], { onDismiss: function () { return resolve(false); } });
                })];
        });
    });
};
var OtaManager = /** @class */ (function () {
    function OtaManager(options) {
        var _this = this;
        this.lastPrompt = null;
        this.lastAppState = "background";
        this.handleNewBundle = function () { return __awaiter(_this, void 0, void 0, function () {
            var restartConfirm, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.lastPrompt &&
                            new Date().getTime() - this.lastPrompt.getTime() <
                                this.options.repromptIntervalMs) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, showConfirmAlert(this.options.titleText, this.options.textLines.join("\n"), this.options.yesButtonText, this.options.noButtonText)];
                    case 1:
                        restartConfirm = _a.sent();
                        this.lastPrompt = new Date();
                        if (restartConfirm) {
                            Updates.reloadAsync();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.warn("expo-ota-updates: Error handling new bundle", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.handleAppStateChange = function (nextAppState) {
            if (_this.lastAppState === "background" && nextAppState === "active") {
                _this.checkForNewAppVersion();
            }
            _this.lastAppState = nextAppState;
        };
        this.checkForNewAppVersion = function () { return __awaiter(_this, void 0, void 0, function () {
            var isAvailable, isNew, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, Updates.checkForUpdateAsync()];
                    case 1:
                        isAvailable = (_a.sent()).isAvailable;
                        if (!isAvailable) return [3 /*break*/, 3];
                        return [4 /*yield*/, Updates.fetchUpdateAsync()];
                    case 2:
                        isNew = (_a.sent()).isNew;
                        if (isNew) {
                            this.handleNewBundle();
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.warn("expo-ota-updates: Error checking for new app version", error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        var hourInMS = 1000 * 60 * 60;
        var defaultOptions = {
            noButtonText: "Not now",
            yesButtonText: "Restart",
            textLines: ["An update is ready", "Restart your app to start using it"],
            titleText: "New Version",
            repromptIntervalMs: hourInMS,
            foregroundCheckIntervalMs: 0,
        };
        this.options = __assign(__assign({}, defaultOptions), options);
        reactNative.AppState.addEventListener("change", this.handleAppStateChange);
        var foregroundCheckIntervalMs = this.options.foregroundCheckIntervalMs;
        if (foregroundCheckIntervalMs > 0) {
            setInterval(this.checkForNewAppVersion, foregroundCheckIntervalMs);
        }
    }
    return OtaManager;
}());
var initialiseOtaManager = function (options) {
    new OtaManager(options);
};

exports.initialiseOtaManager = initialiseOtaManager;
//# sourceMappingURL=index.js.map
