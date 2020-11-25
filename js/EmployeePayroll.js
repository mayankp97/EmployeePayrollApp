const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});
const name = document.querySelector('#name');
const nameError = document.querySelector('#name-error');
name.addEventListener('input', function () {
    let namRegex = new RegExp('^[A-Z][a-z]{2,}$');
    if (namRegex.test(name.value))
        nameError.textContent = "";
    else
        nameError.textContent = "Name is Incorrect";
});
function save(){
    try{    

        updateLocalStorage(createEmployeePayroll());
    }
    catch(e)
    {
        alert(e);
        return;
    }
}

function updateLocalStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("employeePayrollList"));

    if(employeePayrollList != undefined)
        employeePayrollList.push(employeePayrollData);
    else
        employeePayrollList = [employeePayrollData];
    alert(employeePayrollList.toString());
    localStorage.setItem("employeePayrollList",JSON.stringify(employeePayrollList));
}
let empPayroll = [];
function createEmployeePayroll()
{
    let employeepayrollData = new PayrollModel();
    employeepayrollData.name = getInputValueById('#name');
    employeepayrollData.profile = getSelectedValues('[name = profile]').pop();
    employeepayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeepayrollData.department = getSelectedValues('[name=department]');
    employeepayrollData.salary = getInputValueById('#salary');
    employeepayrollData.note = document.getElementById('notes').value;
    let date = getInputValueById('#year') + "-"+ getInputValueById('#month') + "/" + getInputValueById('#day');
    employeepayrollData.startDate = new Date(date);
    empPayroll.push(employeepayrollData)
    alert("Your entry is successfully done");
    //alert(empPayroll);
    return employeepayrollData;
}
function getSelectedValues(attribute)
{
    let allItems = document.querySelectorAll(attribute);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked)
        selItems.push(item.value);
    });
    return selItems;
}
function getInputValueById(id){
    let value = document.querySelector(id).value;
    return value;
}
function getElementValueById(id){
    let value = document.getElementById(id).value
    return value;
}

function resetForm(){
    setValue('#name','');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
    unselectValues('[name=profle');
    unselectValues('[name=gender');
    unselectValues('[name=department');
}

function setValue(id,value){
    document.querySelector(id).value = value;
}
function unselectValues(prop){
    document.querySelectorAll(prop).forEach(item => item.checked=false);
}