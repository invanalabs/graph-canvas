(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HelloApp = global.HelloApp || {}, global.React));
})(this, (function (exports, React) { 'use strict';

    const ArtBoard = (props) => {
        return React.createElement("h1", null,
            "Hello World! - ",
            props.label);
    };

    exports.ArtBoard = ArtBoard;

}));
//# sourceMappingURL=bundle.js.map
