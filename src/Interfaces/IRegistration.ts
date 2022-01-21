export interface IRegistration {
  firstName: string;
  lastName: string;
  MotherDoB: any;
  phone: string;
  docName: string;
  roles: Role[];
}

export type Role = "Admin" | "Staff" | "Patient"
