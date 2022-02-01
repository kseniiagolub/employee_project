const employees = new Employees(4000);
const company = new Company(employees);
const formEmployee = new FormHandler('#form_employee');
const formGeneration = new FormHandler('#form_generation');
const table = new Table('#employees', ['id', 'emailAddress', 'name', 'gender', 'salary', 'title'], removeFn);
const random = new Random();
const generator = new EmployeeGenerator(random);
new Navigator(['#li_new_employee', '#li_generation', '#li_list_employees'], 0);
const spinner = new Spinner('#spinner')
let $total = $('#total_salary');
let MIN_SALARY = 6000;
let MAX_SALARY = 60000;
let minEnteredSalary = -1;


formEmployee.addHandler(function (employee) {
    spinner.start()
    return company.hire(employee)
        .then(function (res) {
            if (res)
                addEmployeeToTable(employee);
            spinner.stop()
            return res ? '' : `Employee with id ${employee.id} already exists`;
        })
        .catch(errorHandler);
})

formGeneration.addHandler(function (genData) {
    let employees = []
    for (let i = 0; i < genData.n_employees; i++) {
        let employee = generator.createEmployee(genData.n_digits,
            parseInt(genData.min_salary), parseInt(genData.max_salary))
        employees.push(employee)
    }
    spinner.start()
    employees.forEach(function (employee, index) {
        company.hire(employee)
            .then(function (res) {
                if (res)
                    addEmployeeToTable(employee)
                if (index == employees.length - 1)
                    spinner.stop()
            })
            .catch(errorHandler)
    })
    return new Promise(function (resolve) {
        resolve('')
    })
})

function errorHandler(error) {
    spinner.stop()
    alert(error.responseText);
    throw new Error(error)
}

function addEmployeeToTable(employee) {
    $total.text(parseInt($total.text()) + parseInt(employee.salary));
    table.addRow(employee);
}

function removeFn(employee) {
    if (!confirm('You are going to fire\nemployee id:' + employee.id))
        return new Promise(function (resolve) {
            resolve(false)
        })
    spinner.start()
    return company.fire(employee.id)
        .then(function (res) {
            if (res)
                $total.text(parseInt($total.text()) - parseInt(employee.salary))
            spinner.stop()
            return res
        })
}

formEmployee.addAsyncValidator('#employeeId', function (id) {
    return employees.get(id)
        .then(function (res) {
            return res ? false : true;
        })
        .catch(errorHandler)
}, "employee with this id already exist");

formGeneration.addValidator('#n_employees', function (number) {
    return parseInt(number) > 0
}, "number of employees should be positive")

formGeneration.addValidator('#n_digits', function (number) {
    return parseInt(number) > 0
}, "number of digits in id should be positive")

formGeneration.addValidator('#min_salary', function (salary) {
    let salaryInt = parseInt(salary)
    if (salaryInt < MIN_SALARY || salaryInt > MAX_SALARY) {
        return false
    }
    minEnteredSalary = salaryInt
    return true
}, `minimal salary should be more ${MIN_SALARY} and less ${MAX_SALARY}`)

formGeneration.addValidator('#max_salary', function (salary) {
    if (minEnteredSalary !== -1 && parseInt(salary) > minEnteredSalary &&
        parseInt(salary) <= MAX_SALARY)
    {
        minEnteredSalary = -1
        return true
    }
    return false
}, `maximal salary should be more ${MIN_SALARY} and less ${MAX_SALARY}`)