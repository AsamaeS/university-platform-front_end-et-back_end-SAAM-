import { type NextRequest, NextResponse } from "next/server"
import { teacherSoapClient } from "@/lib/clients/soap-client"
import { API_CONFIG } from "@/lib/config/api-config"
import { MOCK_TEACHERS } from "@/lib/mock/teachers-mock"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log("[v0] GET /api/teachers/:id - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    const teacher = MOCK_TEACHERS.find((t) => t.id === id)
    return NextResponse.json(teacher || null)
  }

  try {
    // TeacherService.getTeacher(id)
    const result = await teacherSoapClient.call<any>("getTeacher", { id })
    console.log("[v0] Teacher retrieved:", result)
    return NextResponse.json(MOCK_TEACHERS.find((t) => t.id === id) || null)
  } catch (error) {
    console.error("[v0] SOAP Error, falling back to mock data:", error)
    const teacher = MOCK_TEACHERS.find((t) => t.id === id)
    return NextResponse.json(teacher || null)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  console.log("[v0] PUT /api/teachers/:id - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    const index = MOCK_TEACHERS.findIndex((t) => t.id === id)
    if (index !== -1) {
      MOCK_TEACHERS[index] = { ...MOCK_TEACHERS[index], ...body }
      return NextResponse.json(MOCK_TEACHERS[index])
    }
    return NextResponse.json({ error: "Teacher not found" }, { status: 404 })
  }

  try {
    // TeacherService.updateTeacher(id, nom, specialite, disponibilite)
    const result = await teacherSoapClient.call<any>("updateTeacher", {
      id,
      nom: body.firstName + " " + body.lastName,
      specialite: body.specialization,
      disponibilite: body.officeHours || "09:00-17:00",
    })

    console.log("[v0] Teacher updated:", result)
    return NextResponse.json({ id, ...body })
  } catch (error) {
    console.error("[v0] SOAP Error:", error)
    return NextResponse.json({ error: "Failed to update teacher" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log("[v0] DELETE /api/teachers/:id - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    const index = MOCK_TEACHERS.findIndex((t) => t.id === id)
    if (index !== -1) {
      MOCK_TEACHERS.splice(index, 1)
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: "Teacher not found" }, { status: 404 })
  }

  try {
    // TeacherService.deleteTeacher(id)
    const result = await teacherSoapClient.call<any>("deleteTeacher", { id })
    console.log("[v0] Teacher deleted:", result)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] SOAP Error:", error)
    return NextResponse.json({ error: "Failed to delete teacher" }, { status: 500 })
  }
}
