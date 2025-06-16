export class Guard {
  canActivate(): boolean {
    // Implement your guard logic here
    // For example, check if the user is logged in
    this.canActivate = () => {
      return true; // Allow access
    };
    return false; // Deny access
  }
}
