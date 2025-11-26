// Marks/Grades API using REST

import { restClient } from "../clients/rest-client"
import { REST_ENDPOINTS } from "../config/api-config"

export interface Mark {
  id: string
  studentId: string
  studentName: string
  moduleId: string
  moduleName: string
  moduleCode: string
  score: number
  maxScore: number
  percentage: number
  grade: string
  examDate: string
  examType: "Midterm" | "Final" | "Quiz" | "Project" | "Assignment"
  remarks?: string
}

export async function getMarks(): Promise<Mark[]> {
  try {
    return await restClient.get<Mark[]>(REST_ENDPOINTS.MARKS)
  } catch (error) {
    console.error("[v0] Error fetching marks:", error)
    return []
  }
}

export async function getMark(id: string): Promise<Mark | null> {
  try {
    return await restClient.get<Mark>(REST_ENDPOINTS.MARK_BY_ID(id))
  } catch (error) {
    console.error("[v0] Error fetching mark:", error)
    return null
  }
}

export async function getMarksByStudent(studentId: string): Promise<Mark[]> {
  try {
    return await restClient.get<Mark[]>(REST_ENDPOINTS.MARKS_BY_STUDENT(studentId))
  } catch (error) {
    console.error("[v0] Error fetching student marks:", error)
    return []
  }
}

export async function getMarksByModule(moduleId: string): Promise<Mark[]> {
  try {
    return await restClient.get<Mark[]>(REST_ENDPOINTS.MARKS_BY_MODULE(moduleId))
  } catch (error) {
    console.error("[v0] Error fetching module marks:", error)
    return []
  }
}

export async function createMark(mark: Omit<Mark, "id" | "percentage" | "grade">): Promise<Mark> {
  try {
    return await restClient.post<Mark>(REST_ENDPOINTS.MARKS, mark)
  } catch (error) {
    console.error("[v0] Error creating mark:", error)
    throw error
  }
}

export async function updateMark(id: string, mark: Partial<Mark>): Promise<Mark> {
  try {
    return await restClient.put<Mark>(REST_ENDPOINTS.MARK_BY_ID(id), mark)
  } catch (error) {
    console.error("[v0] Error updating mark:", error)
    throw error
  }
}

export async function deleteMark(id: string): Promise<void> {
  try {
    await restClient.delete(REST_ENDPOINTS.MARK_BY_ID(id))
  } catch (error) {
    console.error("[v0] Error deleting mark:", error)
    throw error
  }
}
