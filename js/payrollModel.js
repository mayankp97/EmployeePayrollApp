class PayrollModel {
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else {
            throw "Name is Incorrect";
        }
    }
    get profile() {
        return this._profile;
    }
    set profile(profile) {
        this._profile = profile;
    }
    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }
    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }
    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        if (startDate <= new Date())
            this._startDate = startDate.toLocaleString(undefined, {
                timeZone: 'Asia/Kolkata'
            });
        else {
            throw "Invalid Start Date";
        }
    }
    get note() {
        return this._notes;
    }
    set note(note) {
        this._note = note;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    toString() {
        return "Id = " + this.id + "\nName = " + this.name + "\nSalary = " + this.salary + "\nGender = " + this.gender + " \nStartdate = " + this.startDate + "\nDepartments = " + this.department + "\nProfile = " + this.profile + "\nNote = " + this.note;
    }
}