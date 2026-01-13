const API_BASE_URL = "http://localhost:5000/api";

import { Employee } from "@/types";

export async function getEmployees(): Promise<Employee[]> {
  const res = await fetch(`${API_BASE_URL}/employees`);
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
}

export async function getEmployee(id: string): Promise<Employee> {
  const res = await fetch(`${API_BASE_URL}/employees/${id}`);
  if (!res.ok) throw new Error("Failed to fetch employee");
  return res.json();
}

export async function createEmployee(employee: Omit<Employee, "_id">): Promise<Employee> {
  const res = await fetch(`${API_BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!res.ok) throw new Error("Failed to create employee");
  return res.json();
}

export async function updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee> {
  const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  return res.json();
}

export async function deleteEmployee(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employee");
}
