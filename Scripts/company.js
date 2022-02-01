class Company {
    constructor(employees) {
        this.employees = employees;
    }

    hire = function (employee) {
        return this.employees.add(employee);
    }

    fire = function (id) {
        return this.employees.remove(id);
    }

    computeBudget = function () {
        let budget = 0;
        company.processEmployees(function (employee) {
            budget += employee.salary;
        })
        return budget;
    }

    processEmployees = function (employeeProcessor) {
        this.employees.getAll()
            .then(function (employees) {
            employees.forEach(employeeProcessor);
        })
            .catch(function (error) {
            alert(error.responseText);
        })

    }
}