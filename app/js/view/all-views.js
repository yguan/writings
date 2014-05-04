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
            var $activeMenuAnchor = $('#menu a[href=' + getPageSelector(window.location.hash) + ']'),
                $activeMenuLi = $activeMenuAnchor.length > 0 ? $activeMenuAnchor.parent('li') : getMenuLis().first();
            if ($activeMenuLi) {
                $activeMenuLi.addClass('active');
            }
        }

        function getPageSelector(hash) {
            var questionMarkIndex = hash.indexOf('?'),
                hashWithoutQueryString = questionMarkIndex > 0 ? hash.substr(0, questionMarkIndex) : hash;
            return hashWithoutQueryString.replace('#', '#' + pageIdPrefix);
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

        function loadArticle(articleFileName, $body) {
            require(['lib/text!article/' + articleFileName], function (content) {
                var articleContainerClass = 'article-container';

                $('<div></div>')
                    .addClass(articleContainerClass)
                    .append(content)
                    .hide()
                    .appendTo($body);

                $('.' + articleContainerClass)
                    .easyModal({
                        autoOpen: true,
                        overlayOpacity: 0.3
                    });
            });
        }

        function setArticleLinkClickHandler($body) {
            $('.article-link').on('click', function (evt) {
                var $target = $(evt.target),
                    articleFileName = $target.data('article');

                loadArticle(articleFileName, $body);
            });
        }

        exports.render = function () {
            var $body = $('body');
            allPages.render('#viewport');
            setMenuClickHandler();
            setInitialActiveMenuItem();
            setArticleLinkClickHandler($body);

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