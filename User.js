class User {
    constructor (name, email, password, birthDate) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
    }

    get age(){
        var currentDate = new Date();
        var age = currentDate.getFullYear() - this.birthDate.getFullYear();
        return age;
    }

    get encodePassword(){
        var encodedPassword = window.btoa(this.password);
        return encodedPassword;
    }

}