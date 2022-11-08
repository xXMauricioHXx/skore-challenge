export enum UserLevelPermission {
  ADMIN = 'admin',
  NORMAL = 'normal',
}

export class User {
  public readonly id: number;
  public readonly name: string;
  public readonly email: string;
  public readonly levelPermission: UserLevelPermission;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }

  checkUserIsAdmin(): Boolean {
    return this.levelPermission === UserLevelPermission.ADMIN;
  }
}
