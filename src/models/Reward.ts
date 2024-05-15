class RewardDTO {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public cost: number,
    public imageBase64: string
  ) {}
}

export default RewardDTO;
