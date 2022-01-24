const employees = new Employees();
const company = new Company(employees);
const formEmployee = new FormHandler('#form_employee');
const formGeneration = new FormHandler('#form_generation');
const table = new Table('#employees', ['id', 'email', 'name', 'gender', 'salary', 'title'], removeFn);
const random = new Random();
const generator = new EmployeeGenerator(random);
new Navigator(['#li_new_employee', '#li_generation', '#li_list_employees'], 0);
let $total = $('#total_salary');

formEmployee.addHandler(function (employee) {
    let res = company.hire(employee)
    if (res)
        addEmployeeToTable(employee);
    return res ? '' : `Employee with id ${employee.id} already exists`;
})

formGeneration.addHandler(function (genData) {
    for (let i = 0; i<genData.n_employees; i++) {
        let employee = generator.createEmployee(genData.n_digits, parseInt(genData.min_salary), parseInt(genData.max_salary));
        if (company.hire(employee)) {
            addEmployeeToTable(employee);
        } else  {
            i--;
        }
    }
})

function addEmployeeToTable(employee) {
    $total.text(parseInt($total.text()) + parseInt(employee.salary));
    table.addRow(employee);
}

function removeFn(employee) {
    if (!confirm('You are going to fire\nemployee id:' + employee.id)) {
        return false;
    }
    if (company.fire(employee.id)) {
        reduceTotalSalary(parseInt(employee.salary));
        return true;
    }

    function reduceTotalSalary(salary) {
        $total.text(parseInt($total.text()) - salary);
    }
}

