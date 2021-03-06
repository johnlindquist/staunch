"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx = require("rx");
var index_1 = require("./index");
function handleResponses(actionsWithState$, storeResponses) {
    /**
     * Setup responses for declarative cross-domain communication
     */
    return actionsWithState$
        .withLatestFrom(storeResponses)
        .filter(function (_a) {
        var _ = _a[0], storeResponses = _a[1];
        return storeResponses.length > 0;
    })
        .flatMap(function (incoming) {
        var _a = incoming[0], action = _a.action, state = _a.state;
        var storeResponses = incoming[1];
        var actionName = action.type;
        var matchingResponses = storeResponses
            .filter(function (response) { return response.name === actionName; });
        var newActions = matchingResponses.map(function (x) {
            return {
                type: x.targetName,
                payload: state.getIn(x.path, index_1.getMap({})).toJS(),
                via: "[response to (" + actionName + ")]"
            };
        });
        return Rx.Observable.from(newActions);
    });
}
exports.handleResponses = handleResponses;
//# sourceMappingURL=responses.js.map