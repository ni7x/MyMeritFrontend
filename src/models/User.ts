class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public points: number,
        public isCompany: boolean,
        public description: string
    ) {}
}

export default User;