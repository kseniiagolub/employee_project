class Spinner {
    constructor(selector) {
        this.$spinner = $(selector)
    }

    start = function () {
        this.$spinner.attr('hidden', false)
    }

    stop = function () {
        this.$spinner.attr('hidden', true)
    }
}