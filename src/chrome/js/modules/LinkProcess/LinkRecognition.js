define(function() {
    return {
        run:function($context){
            $context.find("[id^='post_message_']").each(function() {
                var $this, node, nodes, replaceTextWithLink, subnodes, _i, _j, _len, _len1, _results;
                $this = $(this);
                nodes = $this.contents();
                subnodes = $this.find("*:not(a)").contents().filter(function() {
                    return this.nodeType === 3;
                });
                replaceTextWithLink = function(node) {
                    if(/(?=[^ ])(h *t *t *p *: *\/ *\/ *)?(([a-zA-Z0-9-\.]+\.)?[a-zA-Z0-9-]{3,}\.(com|net|org|us|info|vn|com\.vn|net\.vn|gov\.vn|edu|edu\.vn)(\/)?([^\s\[]+)?)(?=\s|$|\[)/.test($(node).text())){
                        var replacement = $(node).text().replace(/(?=[^ ])(h *t *t *p *: *\/ *\/ *)?(([a-zA-Z0-9-\.]+\.)?[a-zA-Z0-9-]{3,}\.(com|net|org|us|info|vn|com\.vn|net\.vn|gov\.vn|edu|edu\.vn)(\/)?([^\s\[]+)?)(?=\s|$|\[)/gi, "<a data-type='linkdetected' href='http://\$2' target='_blank'>\$2</a>");
                        $(node).before(replacement);
                        node.nodeValue = "";
                    }
                    return;
                };
                for (_i = 0, _len = nodes.length; _i < _len; _i++) {
                    node = nodes[_i];
                    if (node.nodeType === 3) {
                        replaceTextWithLink(node);
                    }
                }
                _results = [];
                for (_j = 0, _len1 = subnodes.length; _j < _len1; _j++) {
                    node = subnodes[_j];
                    if (node.parentNode.nodeName.toLowerCase() !== "a") {
                        _results.push(replaceTextWithLink(node));
                    } else {
                        _results.push(void 0);
                    }
                }
                return _results;
            });

        }
    }
});
