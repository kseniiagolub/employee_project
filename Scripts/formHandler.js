class FormHandler {
    constructor(selector) {
        this.$formElement = $(selector);
        this.validators = [];
        this.$submitButton = this.$formElement.find('[type="submit"]');
    }

    addHandler = function (fn) {
        this.$formElement.on('submit', function (event) {
            event.preventDefault();
            let objData = {};
            this.$formElement.serializeArray().forEach(function (obj) {
                objData[obj.name] = obj.value;
            });
            fn(objData).then(function (res) {
                if (res) {
                    alert(res);
                    return;
                }
            });
                event.target.reset();
                if (this.validators && this.validators.length > 0) {
                    this.$submitButton.attr('disabled', true);
                    this.validators.forEach(function (validator) {
                        validator.flag = false;
                    })
                }

        }.bind(this));
    }

    addAsyncValidator = function (selector, validatorFn, errorMessage) {
        this.$submitButton.attr('disabled', true);
        this.validators.push({selector, flag: false});
        let $element = $(selector);
        $element.on('blur', function (event) {
            event.preventDefault();
            validatorFn(event.target.value)
                .then(function (res) {
                    if (res) {
                        this.#enablingSubmit.call(this, selector);
                    } else {
                        alert(errorMessage);
                    }
                }.bind(this));
        }.bind(this));
    }

    #enablingSubmit(selector) {
        let validator = this.validators.find(function (val) {
            return val.selector === selector;
        })
        validator.flag = true;

        if (!this.validators.find(function (val) {
            return val.flag === false;
        })){
            this.$submitButton.attr('disabled', false);
        }
    }

    addValidator = function (selector, validatorFn, errorMessage) {
        this.$submitButton.attr('disabled', true);
        this.validators.push({selector, flag: false});
        let $element = $(selector);
        $element.on('blur', function (event) {
            event.preventDefault();
            if (validatorFn(event.target.value)) {
                this.#enablingSubmit.call(this, selector);
            } else {
                alert(errorMessage);
            }

        }.bind(this));
    }
}