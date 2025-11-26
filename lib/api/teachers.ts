export interface Teacher {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  specialization: string
  hireDate: string
  officeHours: string
  status: "active" | "on-leave" | "retired"
}

export async function getTeachers(): Promise<Teacher[]> {
  try {
    const response = await fetch("/api/teachers")
    if (!response.ok) throw new Error("Failed to fetch teachers")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching teachers:", error)
    return []
  }
}

export async function getTeacher(id: string): Promise<Teacher | null> {
  try {
    const response = await fetch(`/api/teachers/${id}`)
    if (!response.ok) throw new Error("Failed to fetch teacher")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching teacher:", error)
    return null
  }
}

export async function createTeacher(teacher: Omit<Teacher, "id">): Promise<Teacher> {
  const response = await fetch("/api/teachers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacher),
  })
  if (!response.ok) throw new Error("Failed to create teacher")
  return await response.json()
}

export async function updateTeacher(id: string, teacher: Partial<Teacher>): Promise<Teacher> {
  const response = await fetch(`/api/teachers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacher),
  })
  if (!response.ok) throw new Error("Failed to update teacher")
  return await response.json()
}

export async function deleteTeacher(id: string): Promise<void> {
  const response = await fetch(`/api/teachers/${id}`, { method: "DELETE" })
  if (!response.ok) throw new Error("Failed to delete teacher")
}
