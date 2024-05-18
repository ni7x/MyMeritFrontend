class MyFile {
  constructor(
    public name: string,
    public type: string,
    public contentBase64: string
  ) {}

  getContent(): string {
    return atob(this.contentBase64);
  }
  setContent(content: string): void {
    this.contentBase64 = btoa(content);
  }
}

export default MyFile;
