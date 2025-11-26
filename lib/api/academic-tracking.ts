export interface AcademicRecord {
  studentId: string
  studentName: string
  major: string
  year: number
  gpa: number
  totalCredits: number
  courses: CourseRecord[]
  certificates: Certificate[]
}

export interface CourseRecord {
  courseId: string
  courseCode: string
  courseName: string
  credits: number
  grade: number
  letterGrade: string
  semester: string
  year: number
  status: "in-progress" | "completed" | "failed"
}

export interface Certificate {
  id: string
  name: string
  issuedDate: string
  type: "completion" | "excellence" | "participation"
}

export async function getAcademicRecord(studentId: string): Promise<AcademicRecord | null> {
  try {
    const response = await fetch(`/api/academic-tracking/${studentId}`)
    if (!response.ok) throw new Error("Failed to fetch academic record")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching academic record:", error)
    return null
  }
}

export async function getAllAcademicRecords(): Promise<AcademicRecord[]> {
  try {
    const response = await fetch("/api/academic-tracking")
    if (!response.ok) throw new Error("Failed to fetch academic records")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching academic records:", error)
    return []
  }
}

export async function updateGrade(studentId: string, courseId: string, grade: number): Promise<void> {
  const response = await fetch("/api/academic-tracking/grade", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, courseId, grade }),
  })
  if (!response.ok) throw new Error("Failed to update grade")
}

export async function getStudentGPA(studentId: string): Promise<number> {
  try {
    const response = await fetch(`/api/academic-tracking/gpa/${studentId}`)
    if (!response.ok) throw new Error("Failed to fetch student GPA")
    const data = await response.json()
    return data.gpa
  } catch (error) {
    console.error("[v0] Error fetching student GPA:", error)
    return 0
  }
}

function calculateLetterGrade(grade: number): string {
  if (grade >= 18) return "A+"
  if (grade >= 16) return "A"
  if (grade >= 14) return "B+"
  if (grade >= 12) return "B"
  if (grade >= 10) return "C"
  return "F"
}
