class Employees {
    constructor(timeout) {
        this.data = {};
        this.timeout = timeout;
        this.rejectFlag = false;
    }

    getPromise(value) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (this.rejectFlag) {
                    reject({responseText: 'Server is not available'})
                } else {
                    resolve(value)
                }
            }.bind(this), this.timeout);
        }.bind(this));
    }

    add = function (employee) {
        if (!employee.id) {
            throw new Error('property id must be in form');
        }
        if (this.data[employee.id] || this.rejectFlag) {
            return this.getPromise.call(this,false);
        }
        this.data[employee.id] = employee;
        return this.getPromise.call(this,true);
    }

    get = function (id) {
        return this.getPromise.call(this, this.data[id]);
    }

    getAll = function () {
        return this.getPromise.call(this, Object.values(this.data));
    }

    remove = function (id) {
        if (!this.data[id] || this.rejectFlag)
            return this.getPromise.call(this, false);
        delete this.data[id];
        return this.getPromise.call(this,true);
    }

}