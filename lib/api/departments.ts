// Departments API using REST

import { restClient } from "../clients/rest-client"
import { REST_ENDPOINTS } from "../config/api-config"

export interface Department {
  id: string
  name: string
  code: string
  headOfDepartment?: string
  description?: string
  numberOfStudents: number
  numberOfTeachers: number
}

export async function getDepartments(): Promise<Department[]> {
  try {
    return await restClient.get<Department[]>(REST_ENDPOINTS.DEPARTMENTS)
  } catch (error) {
    console.error("[v0] Error fetching departments:", error)
    return []
  }
}

export async function getDepartment(id: string): Promise<Department | null> {
  try {
    return await restClient.get<Department>(REST_ENDPOINTS.DEPARTMENT_BY_ID(id))
  } catch (error) {
    console.error("[v0] Error fetching department:", error)
    return null
  }
}

export async function createDepartment(department: Omit<Department, "id">): Promise<Department> {
  try {
    return await restClient.post<Department>(REST_ENDPOINTS.DEPARTMENTS, department)
  } catch (error) {
    console.error("[v0] Error creating department:", error)
    throw error
  }
}

export async function updateDepartment(id: string, department: Partial<Department>): Promise<Department> {
  try {
    return await restClient.put<Department>(REST_ENDPOINTS.DEPARTMENT_BY_ID(id), department)
  } catch (error) {
    console.error("[v0] Error updating department:", error)
    throw error
  }
}

export async function deleteDepartment(id: string): Promise<void> {
  try {
    await restClient.delete(REST_ENDPOINTS.DEPARTMENT_BY_ID(id))
  } catch (error) {
    console.error("[v0] Error deleting department:", error)
    throw error
  }
}
