/*jslint nomen: true*/
/*global $,define,require,_ */

define(['exports', 'view/all-pages'], function (exports, allPages) {
        'use strict';

        var pageIdPrefix = 'page_';

        function getMapPosition(numberOfStages) {
            var positions = [],
                counter = 1;
            while (counter <= numberOfStages) {
                positions.push({v: counter, h: 1});
                counter = counter + 1;
            }
            return positions;
        }

        function getMenuLis() {
            return $('#menu li');
        }

        function setInitialActiveMenuItem() {
            var $activeMenuAnchor = $('#menu a[href=' + window.location.hash + ']'),
                $activeMenuLi = $activeMenuAnchor.length > 0 ? $activeMenuAnchor.parent('li') : getMenuLis().first();
            if ($activeMenuLi) {
                $activeMenuLi.addClass('active');
            }
        }

        function getPageSelector(hash) {
            return hash.replace('#', '#' + pageIdPrefix);
        }

        function setMenuClickHandler() {
            var $menuLis = getMenuLis(),
                $anchor,
                $divToScroll;

            $menuLis.on('click', function (evt) {
                $menuLis.removeClass('active');
                $anchor = $(evt.target);
                $anchor.parent('li').addClass('active');
                $divToScroll = $(getPageSelector($anchor.attr('href')));
                $divToScroll.scrollTop(0);
                $divToScroll.scrollLeft(0);
            });
        }

        exports.render = function () {
            allPages.render('#viewport');
            setMenuClickHandler();
            setInitialActiveMenuItem();

            $('#stages').fullContent({
                children: '.stage',
                mapPosition: getMapPosition(7),
                stageStart: 1,
                idComplement: pageIdPrefix,
                speedTransition: 750
            });
        };
    }
);