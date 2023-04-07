// Your code here
function hoursWorkedOnDate (employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate (employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wagesEarned = hoursWorked * employee.payPerHour;
    return wagesEarned;
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName);
}


//Creating a new employee record
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

//Create employee records for multiple employees
function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
}

//Add time in and time out events for an employee
function createTimeInEvent(employee, dateTime) {
    const[date, hour] = dateTime.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

function createTimeOutEvent(employee, dateTime) {
    const[date,hour] = dateTime.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

//Define the errorneous code and fix it
const allWagesFor = (employee) => {
    const dates = employee.timeInEvents.map(event => event.date);

    const wagesEarned = dates.reduce((total, date) => {
        const wagesOnDate = wagesEarnedOnDate(employee, date);
        return total + wagesOnDate
    }, 0);
    return wagesEarned;
}

const calculatePayroll = (employees) => {
    const totalPayroll = employees.reduce((total, employee) => {
        const employeeWages = allWagesFor(employee);
        return total + employeeWages;
    }, 0);
    return totalPayroll;
}

const employee = createEmployeeRecord(["John", "Doe", "Manager", 25]);
createTimeInEvent(employee, "2023-04-07 08:00");
createTimeOutEvent(employee, "2023-04-07 17:00");
