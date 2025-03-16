export class Author {
    constructor(id, lastName, firstName, birthDate, nationality) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.birthDate = birthDate;
        this.nationality = nationality;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
//# sourceMappingURL=Author.js.map