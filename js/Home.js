

let employeePayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
    employeePayrollList = getEmployeePayrollDataFromStorage().sort((e1,e2) => e1._id - e2._id);
    let arr = [];
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp')
});
const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}
const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    if (employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const employeePayrollData of employeePayrollList) {
        innerHtml = `${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${employeePayrollData._profile}"></td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${getDeptHtml(employeePayrollData._department)}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${employeePayrollData._startDate}</td>
            <td>
                <img id="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img id="${employeePayrollData._id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml
}
const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [{
            _id: new Date().getTime(),
            _name: "Mathura Das",
            _salary: "$ 100000",
            _gender: "Male",
            _department: ["Engineering"],
            _notes: "Excellent Employee",
            _profile: "../assets/profile-images/Ellipse -3.png",
            _startDate: "18/09/2020, 12:00:00 AM"
        },
        {
            _id: new Date().getTime() + 1,
            _name: "Akhikesh Dangi",
            _salary: "$ 70000",
            _gender: "male",
            _department: ["Engineering", "Sales"],
            _notes: null,
            _profile: "../assets/profile-images/Ellipse -8.png",
            _startDate: "18/09/2020, 12:00:00 AM"
        }
    ];
    return employeePayrollListLocal;
}
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}
function remove(node){
    let empPayrollData = employeePayrollList.find(empData => empData._id == node.id);
    if (!empPayrollData) return;
    const index = employeePayrollList
        .map(empData => empData._id)
        .indexOf(empPayrollData._id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    alert("User deleted is : "+empPayrollData._name+" with id :"+empPayrollData._id);
    createInnerHtml();
}
let site_properties = {
    home_page: "../pages/Home.html",
    employee_payroll_page: "../pages/EmployeePayroll.html"
};
function update(node){
    let empData = employeePayrollList.find((emp) => emp._id == node.id);
    if (!empData) return;
    localStorage.setItem("editEmp", JSON.stringify(empData));
    window.location.replace(site_properties.employee_payroll_page);
};