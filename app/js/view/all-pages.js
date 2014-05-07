/*jslint nomen: true*/
/*global $,define,require,_ */

define(
    [
        'exports',
        'lib/text!template/home.tpl',
        'lib/text!template/testAutomationTpl.tpl',
        'lib/text!template/aboutMe.tpl'
    ],
    function (exports, homeTpl, testAutomationTpl, aboutMeTpl) {
        'use strict';

        exports.render = function (container) {
            var $container = $(homeTpl);

            $container.find('#test-automation').append(testAutomationTpl);
            $container.find('#about-me').append(aboutMeTpl);
            $(container).append($container);
        };
    }
);