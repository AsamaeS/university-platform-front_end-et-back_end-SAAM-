export interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  enrollmentDate: string
  major: string
  year: number
  gpa: number
  status: "active" | "inactive" | "graduated"
}

export async function getStudents(): Promise<Student[]> {
  try {
    const response = await fetch("/api/students")
    if (!response.ok) throw new Error("Failed to fetch students")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching students:", error)
    return []
  }
}

export async function getStudent(id: string): Promise<Student | null> {
  try {
    const response = await fetch(`/api/students/${id}`)
    if (!response.ok) throw new Error("Failed to fetch student")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching student:", error)
    return null
  }
}

export async function createStudent(student: Omit<Student, "id">): Promise<Student> {
  const response = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  })
  if (!response.ok) throw new Error("Failed to create student")
  return await response.json()
}

export async function updateStudent(id: string, student: Partial<Student>): Promise<Student> {
  const response = await fetch(`/api/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  })
  if (!response.ok) throw new Error("Failed to update student")
  return await response.json()
}

export async function deleteStudent(id: string): Promise<void> {
  const response = await fetch(`/api/students/${id}`, { method: "DELETE" })
  if (!response.ok) throw new Error("Failed to delete student")
}
