<script>
import showdown from 'showdown';


var noParagraphs = {
    type: 'output',
    filter: function(text, converter) {
        var re = /<\/?p[^>]*>/ig;
        text = text.replace(re, '');
        return text;
    }
};
var markHashTags = {
    type: 'output',
    filter: function(text, converter) {
        var re = /(#[^\d][^#\s,;:]*)/g;
        text = text.replace(re, (str) => `<span class="text-blue-700">${str}</span>`);
        return text;
    }
};

export default {
    props: {
        hashtags: {default: false},
        tag: {default: 'span'},
        input: {}
    },
    computed: {
        html() {
            showdown.setFlavor('github');
            const converter = new showdown.Converter({
                extensions: [noParagraphs]
            });
            if (this.hashtags) converter.addExtension(markHashTags);
            return converter.makeHtml(this.input);
        }
    },
    render(createElement) {
        return createElement(this.tag, {
            domProps: {
                innerHTML: this.html,
            },
        })
    }
}
</script>