/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test makes sure that all feeds have a url which is not empty
         */
        it('have a URL which is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        /* This test makes sure that all feeds have a name which is not empty
         */
        it('have a name which is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    /* This suite is all about the menus show and hide functionality.
     */
    describe('The menu', function () {

        /* This test makes sure that the menu is hidden by default.
         */
        it('is hidden by default', function () {
            var $body = $('body');

            expect($body.hasClass('menu-hidden')).toBe(true);
        });

        /* This test makes sure that a click on the menu icon toggles the menus visibility
         */
        it('changes visibility on menu icon click', function () {
            var $body = $('body'),
                menuIcon = $('.menu-icon-link');

            menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(false);

            menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* This suite is all about the initial feed entries.
     */
    describe('Initial Entries', function () {

        // use done callback of jasmine to test async functions
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });

        });

        /* This test makes sure that initial feeds are available after loading the feed
         */
        it('are available', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* This suite is all about selecting a new feed.
     */
    describe('New Feed Selection', function () {

        // saving initial content state
        var oldContent;

        // use done callback of jasmine to test async functions
        beforeEach(function (done) {
            loadFeed(0, function () {
                oldContent = $('.feed').html();
                loadFeed(1, done);
            });
        });

        /* This test makes sure that the content has changed after loading a new feed
         */
        it('has changed content', function () {
            expect($('.feed').html()).not.toBe(oldContent);
        });
    });

}());
