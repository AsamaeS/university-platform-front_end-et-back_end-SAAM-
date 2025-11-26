import { type NextRequest, NextResponse } from "next/server"
import { teacherSoapClient } from "@/lib/clients/soap-client"
import { API_CONFIG } from "@/lib/config/api-config"
import { MOCK_TEACHERS } from "@/lib/mock/teachers-mock"

export async function GET() {
  console.log("[v0] GET /api/teachers - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    return NextResponse.json(MOCK_TEACHERS)
  }

  try {
    // TeacherService doesn't have getAllTeachers method, return mock
    console.log("[v0] TeacherService doesn't expose getAllTeachers, using mock data")
    return NextResponse.json(MOCK_TEACHERS)
  } catch (error) {
    console.error("[v0] Error:", error)
    return NextResponse.json(MOCK_TEACHERS)
  }
}

export async function POST(request: NextRequest) {
  console.log("[v0] POST /api/teachers - Using mock:", API_CONFIG.USE_MOCK_DATA)

  const body = await request.json()

  if (API_CONFIG.USE_MOCK_DATA) {
    const newTeacher = { id: Date.now().toString(), ...body }
    MOCK_TEACHERS.push(newTeacher)
    return NextResponse.json(newTeacher, { status: 201 })
  }

  try {
    // TeacherService.addTeacher(id, nom, specialite, disponibilite)
    const result = await teacherSoapClient.call<any>("addTeacher", {
      id: body.id,
      nom: body.firstName + " " + body.lastName,
      specialite: body.specialization,
      disponibilite: body.officeHours || "09:00-17:00",
    })

    console.log("[v0] Teacher created:", result)
    return NextResponse.json({ id: body.id, ...body }, { status: 201 })
  } catch (error) {
    console.error("[v0] SOAP Error:", error)
    return NextResponse.json({ error: "Failed to create teacher" }, { status: 500 })
  }
}
