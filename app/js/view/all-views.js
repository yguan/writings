/*jslint nomen: true*/
/*global $,define,require,_, marked */

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
            var $activeMenuAnchor = $('#menu a[href=' + getHashWithoutQueryString(window.location.hash) + ']'),
                $activeMenuLi = $activeMenuAnchor.length > 0 ? $activeMenuAnchor.parent('li') : getMenuLis().first();
            if ($activeMenuLi) {
                $activeMenuLi.addClass('active');
            }
        }

        function getHashWithoutQueryString(hash) {
            var questionMarkIndex = hash.indexOf('?'),
                hashWithoutQueryString = questionMarkIndex > 0 ? hash.substr(0, questionMarkIndex) : hash;
            return hashWithoutQueryString;
        }

        function getPageSelector(hash) {
            return getHashWithoutQueryString(hash).replace('#', '#' + pageIdPrefix);
        }

        function getQueryParameter(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(window.location.hash);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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

        function loadArticle(articleId, $body) {
            require(['lib/text!article/' + articleId + '.md'], function (content) {
                var articleContainerClass = 'article-container',
                    articleHtml = marked(content);

                $('<div></div>')
                    .addClass(articleContainerClass)
                    .append(articleHtml)
                    .hide()
                    .appendTo($body);

                $('.' + articleContainerClass)
                    .easyModal({
                        autoOpen: true,
                        overlayOpacity: 0.3
                    });
            });
        }

        function setInitialArticle($body) {
            var articleId = getQueryParameter('article');

            if (articleId) {
                loadArticle(articleId, $body);
            }
        }

        function setArticleLinkClickHandler($body) {
            $('.article-link').on('click', function (evt) {
                var $target = $(evt.target);

                loadArticle($target.data('article'), $body);
            });
        }

        exports.render = function () {
            var $body = $('body');
            allPages.render('#viewport');

            setInitialActiveMenuItem();
            setInitialArticle($body);

            setMenuClickHandler();
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