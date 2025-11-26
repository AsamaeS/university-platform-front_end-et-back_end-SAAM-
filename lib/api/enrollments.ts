export interface Enrollment {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  courseId: string
  courseCode: string
  courseName: string
  enrollmentDate: string
  status: "enrolled" | "pending" | "cancelled" | "completed"
  grade?: number
}

export async function getEnrollments(): Promise<Enrollment[]> {
  try {
    const response = await fetch("/api/enrollments")
    if (!response.ok) throw new Error("Failed to fetch enrollments")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching enrollments:", error)
    return []
  }
}

export async function getEnrollmentsByStudent(studentId: string): Promise<Enrollment[]> {
  try {
    const response = await fetch(`/api/enrollments/student/${studentId}`)
    if (!response.ok) throw new Error("Failed to fetch student enrollments")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching student enrollments:", error)
    return []
  }
}

export async function getEnrollmentsByCourse(courseId: string): Promise<Enrollment[]> {
  try {
    const response = await fetch(`/api/enrollments/course/${courseId}`)
    if (!response.ok) throw new Error("Failed to fetch course enrollments")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching course enrollments:", error)
    return []
  }
}

export async function createEnrollment(enrollment: Omit<Enrollment, "id">): Promise<Enrollment> {
  const response = await fetch("/api/enrollments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enrollment),
  })
  if (!response.ok) throw new Error("Failed to create enrollment")
  return await response.json()
}

export async function updateEnrollment(id: string, enrollment: Partial<Enrollment>): Promise<Enrollment> {
  const response = await fetch(`/api/enrollments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enrollment),
  })
  if (!response.ok) throw new Error("Failed to update enrollment")
  return await response.json()
}

export async function cancelEnrollment(id: string): Promise<void> {
  const response = await fetch(`/api/enrollments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "cancelled" }),
  })
  if (!response.ok) throw new Error("Failed to cancel enrollment")
}

export async function deleteEnrollment(id: string): Promise<void> {
  const response = await fetch(`/api/enrollments/${id}`, { method: "DELETE" })
  if (!response.ok) throw new Error("Failed to delete enrollment")
}
