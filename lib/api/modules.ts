// Modules API using REST

import { restClient } from "../clients/rest-client"
import { REST_ENDPOINTS } from "../config/api-config"

export interface Module {
  id: string
  code: string
  name: string
  description: string
  credits: number
  departmentId: string
  departmentName: string
  semester: number
  year: number
  teacherId?: string
  teacherName?: string
}

export async function getModules(): Promise<Module[]> {
  try {
    return await restClient.get<Module[]>(REST_ENDPOINTS.MODULES)
  } catch (error) {
    console.error("[v0] Error fetching modules:", error)
    return []
  }
}

export async function getModule(id: string): Promise<Module | null> {
  try {
    return await restClient.get<Module>(REST_ENDPOINTS.MODULE_BY_ID(id))
  } catch (error) {
    console.error("[v0] Error fetching module:", error)
    return null
  }
}

export async function getModulesByDepartment(departmentId: string): Promise<Module[]> {
  try {
    return await restClient.get<Module[]>(REST_ENDPOINTS.MODULE_BY_DEPARTMENT(departmentId))
  } catch (error) {
    console.error("[v0] Error fetching department modules:", error)
    return []
  }
}

export async function createModule(module: Omit<Module, "id">): Promise<Module> {
  try {
    return await restClient.post<Module>(REST_ENDPOINTS.MODULES, module)
  } catch (error) {
    console.error("[v0] Error creating module:", error)
    throw error
  }
}

export async function updateModule(id: string, module: Partial<Module>): Promise<Module> {
  try {
    return await restClient.put<Module>(REST_ENDPOINTS.MODULE_BY_ID(id), module)
  } catch (error) {
    console.error("[v0] Error updating module:", error)
    throw error
  }
}

export async function deleteModule(id: string): Promise<void> {
  try {
    await restClient.delete(REST_ENDPOINTS.MODULE_BY_ID(id))
  } catch (error) {
    console.error("[v0] Error deleting module:", error)
    throw error
  }
}
