ko.templateSources.stringTemplate = function (template, templates) {
    this.templateName = template;
    this.templates = templates;
}

ko.utils.extend(ko.templateSources.stringTemplate.prototype, {
    data: function (key, value) {
//        console.log("data", key, value, this.templateName);
        this.templates._data = this.templates._data || {};
        this.templates._data[this.templateName] = this.templates._data[this.templateName] || {};

        if (arguments.length === 1) {
            return this.templates._data[this.templateName][key];
        }

        this.templates._data[this.templateName][key] = value;
    },
    text: function (value) {
//        console.log("text", value, this.templateName)
        if (arguments.length === 0) {
            return this.templates[this.templateName];
        }
        this.templates[this.templateName] = value;
    }
});
function createStringTemplateEngine(templateEngine, templates) {
    templateEngine.makeTemplateSource = function (template) {
        return new ko.templateSources.stringTemplate(template, templates);
    }
    return templateEngine;
}
