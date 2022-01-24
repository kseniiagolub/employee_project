class FormHandler {
    constructor(selector) {
        this.$formElement = $(selector);
    }
    addHandler = function (fn) {
        this.$formElement.on('submit', function (event) {
            event.preventDefault();
            let objData = {};
            this.$formElement.serializeArray().forEach(function (obj) {
                objData[obj.name] = obj.value;
            });
            let res = fn(objData);
            if (res) {
                alert(res);
                return;
            }
            event.target.reset();
        }.bind(this));
    }
}