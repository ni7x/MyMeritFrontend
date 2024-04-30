class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public password: string,
    public credits: number,
    public isCompany: boolean,
    public description: string,
    public imageSmall: string,
    public imageBig: string
  ) {}
}

export default User;
