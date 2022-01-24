class EmployeeGenerator {
    constructor(random) {
        this.random = random;
    }

    createEmployee = function (idDigits, min_salary, max_salary) {

        const emailDomain = ["mail.ru", "gmail.com", "co.il", "icloud.com", "rambler.ru"]
        const titleArray = ['Wage Employee', 'Manager', 'Sales Person', 'Sales Manager']
        const genderArray = ['female', 'male'];

        let minId = 10 ** (idDigits - 1);
        let maxId = minId * 10 - 1;
        let id = this.random.getRandomNumber(minId, maxId);
        let name = 'name' + id;
        let emailAddress = name + '@' + this.random.getRandomElement(emailDomain);
        let salary = this.random.getRandomNumber(min_salary, max_salary);
        let title = this.random.getRandomElement(titleArray);
        let gender = this.random.getRandomElement(genderArray);

        return {
            id: id,
            emailAddress: emailAddress,
            gender: gender,
            name: name,
            salary: salary,
            title: title
        }
    }
}