class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public points: number,
        public isCompany: boolean,
        public description: string,
        public imageSmall: string,
    ) {}
}

export default User;