export class Producer {
    constructor(
      public readonly name: string,
      public readonly interval: number,
      public readonly previousWin: number,
      public readonly lastWin: number,
    ) {}
}
  