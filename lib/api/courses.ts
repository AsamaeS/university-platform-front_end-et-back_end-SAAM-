export interface Course {
  id: string
  code: string
  name: string
  description: string
  teacherId: string
  teacherName: string
  credits: number
  schedule: string
  capacity: number
  enrolled: number
  department: string
  semester: "Fall" | "Spring" | "Summer"
  year: number
  status: "active" | "archived" | "draft"
}

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetch("/api/courses")
    if (!response.ok) throw new Error("Failed to fetch courses")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching courses:", error)
    return []
  }
}

export async function getCourse(id: string): Promise<Course | null> {
  try {
    const response = await fetch(`/api/courses/${id}`)
    if (!response.ok) throw new Error("Failed to fetch course")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching course:", error)
    return null
  }
}

export async function createCourse(course: Omit<Course, "id" | "enrolled">): Promise<Course> {
  const response = await fetch("/api/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  })
  if (!response.ok) throw new Error("Failed to create course")
  return await response.json()
}

export async function updateCourse(id: string, course: Partial<Course>): Promise<Course> {
  const response = await fetch(`/api/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  })
  if (!response.ok) throw new Error("Failed to update course")
  return await response.json()
}

export async function deleteCourse(id: string): Promise<void> {
  const response = await fetch(`/api/courses/${id}`, { method: "DELETE" })
  if (!response.ok) throw new Error("Failed to delete course")
}
