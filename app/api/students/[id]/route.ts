import { type NextRequest, NextResponse } from "next/server"
import { studentSoapClient } from "@/lib/clients/soap-client"
import { API_CONFIG } from "@/lib/config/api-config"
import { MOCK_STUDENTS } from "@/lib/mock/students-mock"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log("[v0] GET /api/students/:id - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    const student = MOCK_STUDENTS.find((s) => s.id === id)
    return NextResponse.json(student || null)
  }

  try {
    // StudentService.getStudent(etudiantId)
    const result = await studentSoapClient.call<any>("getStudent", { etudiantId: id })
    console.log("[v0] Student retrieved:", result)
    return NextResponse.json(MOCK_STUDENTS.find((s) => s.id === id) || null)
  } catch (error) {
    console.error("[v0] SOAP Error, falling back to mock data:", error)
    const student = MOCK_STUDENTS.find((s) => s.id === id)
    return NextResponse.json(student || null)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  console.log("[v0] PUT /api/students/:id - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    const index = MOCK_STUDENTS.findIndex((s) => s.id === id)
    if (index !== -1) {
      MOCK_STUDENTS[index] = { ...MOCK_STUDENTS[index], ...body }
      return NextResponse.json(MOCK_STUDENTS[index])
    }
    return NextResponse.json({ error: "Student not found" }, { status: 404 })
  }

  try {
    // StudentService.updateStudent(etudiantId, nom, filiere, annee)
    const result = await studentSoapClient.call<any>("updateStudent", {
      etudiantId: id,
      nom: body.firstName + " " + body.lastName,
      filiere: body.programme,
      annee: body.year,
    })

    console.log("[v0] Student updated:", result)
    return NextResponse.json({ id, ...body })
  } catch (error) {
    console.error("[v0] SOAP Error:", error)
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log("[v0] DELETE /api/students/:id - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    const index = MOCK_STUDENTS.findIndex((s) => s.id === id)
    if (index !== -1) {
      MOCK_STUDENTS.splice(index, 1)
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: "Student not found" }, { status: 404 })
  }

  try {
    // StudentService.deleteStudent(etudiantId)
    const result = await studentSoapClient.call<any>("deleteStudent", { etudiantId: id })
    console.log("[v0] Student deleted:", result)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] SOAP Error:", error)
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 })
  }
}
