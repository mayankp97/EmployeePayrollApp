let isUpdate = false;
let employeePayrollObj = {};
let updateBool = false;
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('#name-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new PayrollModel()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
    const date = document.querySelector('#date');
    const dateError = document.querySelector('#date-error');
    date.addEventListener('change', () => {
        const selectedDate = new Date(date);
        try {
            (new PayrollModel()).startDate = selectedDate;
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;
        }
    })
    
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
    checkForUpdate();
});
let site_properties = {
    home_page: "../pages/Home.html",
    employee_payroll_page: "../pages/EmployeePayroll.html"
};
function save(event) {
    event.preventDefault();
    event.stopPropagation();
    try {
        let empPayrollData;
        if (!isUpdate) {
            empPayrollData = createEmployeePayroll();
            createAndUpdateStorage(empPayrollData);
        }
        else {
            empPayrollData = updateEmployeePayroll();
            createAndUpdateStorage(empPayrollData);
        }
        window.location = site_properties.home_page;

    } 
    catch (e) {
        alert(e);
        return;
    }
}

function createEmployeePayroll() {
    let employeepayrollData = new PayrollModel();
    employeepayrollData.name = getInputValueById('#name');
    employeepayrollData.profile = getSelectedValues('[name = profile]').pop();
    employeepayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeepayrollData.department = getSelectedValues('[name=department]');
    employeepayrollData.salary = getInputValueById('#salary');
    employeepayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#date');
    employeepayrollData.startDate = new Date(date);
    alert("Your entry is successfully done");
    employeepayrollData.toString()
    alert(employeepayrollData.toString());
    return employeepayrollData;
}
function updateEmployeePayroll() {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profile = getSelectedValues('[name = profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._notes = getInputValueById('#notes');
    let date = getInputValueById('#date');
   
    employeePayrollObj._startDate = new Date(date);
    employeePayrollObj._startDate = employeePayrollObj._startDate.toLocaleString(undefined,{
        timeZone:'Asia/Kolkata'
    }); 
    alert("Your entry is successfully Updated");
    return employeePayrollObj;
}

function getSelectedValues(attribute) {
    let allItems = document.querySelectorAll(attribute);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selItems.push(item.value);
    });
    return selItems;
}

let getInputValueById = id => document.querySelector(id).value;

let getElementValueById = id => document.getElementById(id).value;

function createAndUpdateStorage(employeepayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(!isUpdate){
        let empPayrollId = JSON.parse(localStorage.getItem("EmployeePayrollIdIterator"));
        if (empPayrollId == null) {
            empPayrollId = 1;
        }
        if (employeePayrollList != undefined) {
            employeePayrollList.push(employeepayrollData);
        } else {
            employeePayrollList = [employeepayrollData];
        }

        employeepayrollData['_id'] = empPayrollId;
        empPayrollId += 1;
        localStorage.setItem("EmployeePayrollIdIterator", empPayrollId);
    }
    else{
        employeePayrollList = employeePayrollList.filter(emp => emp._id != employeepayrollData._id);
        employeePayrollList.push(employeepayrollData);
        localStorage.removeItem('editEmp');
    }

    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
const stringifyDate = (date) => {
    const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    let str = newDate.split('/').reverse().join('-');
    return str;
 };
const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profile);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setCheckBox('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._notes);
    let date = employeePayrollObj._startDate;
    let str = stringifyDate(date);
    console.log(date);
    setValue('#date', str);
}
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value == value)
            item.checked = true;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const setCheckBox = (property, values) => {
    let items = document.querySelectorAll(property);
    items.forEach(item => {
        if (values.includes(item.value)) {
            item.checked = true;
        }
    });
}
const resetForm = () => {
    document.querySelector("#name").value = "";
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    document.querySelector(".salary-output").textContent = 400000;
    document.querySelector("#date").value = new Date();
    document.querySelector(".notes").value = "";
    document.querySelector(".date-error").textContent = "";
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}