export interface Employee {
  _id?: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number | string;
  hire_date?: string;
}
