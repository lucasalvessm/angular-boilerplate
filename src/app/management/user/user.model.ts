export interface User {
  id: number;
  password: string;
  lastLogin: string;
  isSuperuser: boolean;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isStaff: boolean;
  isActive: boolean;
  dateJoined: string;
}
