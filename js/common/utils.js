'use strict';

import marked from 'marked';

exports.renderMarkdown = function (text) {
    return marked(text);
}