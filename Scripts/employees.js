class Employees {
    constructor() {
        this.data = {};
    }

    add = function (employee) {
        if (!employee.id) {
            throw new Error('property id must be in form');
        }
        if (this.data[employee.id]) {
            return false;
        }
        this.data[employee.id] = employee;
        return true;
    }

    get = function (id) {
        return this.data[id];
    }

    getAll = function () {
        return Object.values(this.data)
    }

    remove = function (id) {
        if (!this.data[id])
            return false;
        delete this.data[id];
        return true;
    }

}