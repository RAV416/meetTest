export class Guard {
  canActivate(): boolean {
    this.canActivate = () => {
      return true;
    };
    return false;
  }
}
