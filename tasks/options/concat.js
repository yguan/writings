module.exports = {
    cssdev: {
        src: [
            '<%= folder.src %>/css/app.css'
        ],
        dest: '<%= folder.src %>/css/app-min.css'
    },
    cssdist: {
        src: [
            '<%= folder.buildTemp %>/app.css'
        ],
        dest: '<%= folder.distTemp %>/css/app-min.css'
    },
    libWithoutD3: {
        src: [
            '<%= folder.src %>/js/lib/lodash.underscore.js',
            '<%= folder.src %>/js/extension/lodash.underscore.js',
            '<%= folder.src %>/js/lib/jquery.js',
            '<%= folder.src %>/js/lib/jquery.scrollTo.js',
            '<%= folder.src %>/js/lib/jquery.fullContent.js',
            '<%= folder.src %>/js/lib/jquery.easyModal.js',
            '<%= folder.src %>/js/lib/marked.js',
            '<%= folder.src %>/js/lib/require.js'
        ],
        dest: '<%= folder.src %>/js/all-lib-no-d3.js'
    },
    libWithD3: {
        src: [
//            '<%= folder.src %>/js/lib/d3.js',
            '<%= folder.src %>/js/all-lib-no-d3.js'
        ],
        dest: '<%= folder.src %>/js/all-lib.js'
    },
    libMin: {
        src: [
//            '<%= folder.src %>/js/lib/d3.min.js',
            '<%= folder.src %>/js/all-lib-no-d3-min.js'
        ],
        dest: '<%= folder.src %>/js/all-lib-min.js'
    }
};
