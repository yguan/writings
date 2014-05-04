/*jslint nomen: true*/
/*global $,define,require,_ */

define(
    [
        'exports',
        'lib/text!template/home.tpl',
        'lib/text!template/testAutomationTpl.tpl'
    ],
    function (exports, homeTpl, testAutomationTpl) {
        'use strict';

        exports.render = function (container) {
            var $container = $(homeTpl);

            $container.find('#test-automation').append(testAutomationTpl);
            $(container).append($container);
        };
    }
);