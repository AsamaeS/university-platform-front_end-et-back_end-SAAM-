import { type NextRequest, NextResponse } from "next/server"
import { studentSoapClient } from "@/lib/clients/soap-client"
import { API_CONFIG } from "@/lib/config/api-config"
import { MOCK_STUDENTS } from "@/lib/mock/students-mock"

export async function GET() {
  console.log("[v0] GET /api/students - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    return NextResponse.json(MOCK_STUDENTS)
  }

  try {
    // Note: StudentService doesn't have getAllStudents, return mock for now
    console.log("[v0] StudentService doesn't expose getAllStudents, using mock data")
    return NextResponse.json(MOCK_STUDENTS)
  } catch (error) {
    console.error("[v0] Error:", error)
    return NextResponse.json(MOCK_STUDENTS)
  }
}

export async function POST(request: NextRequest) {
  console.log("[v0] POST /api/students - Using mock:", API_CONFIG.USE_MOCK_DATA)

  const body = await request.json()

  if (API_CONFIG.USE_MOCK_DATA) {
    const newStudent = { id: Date.now().toString(), ...body }
    MOCK_STUDENTS.push(newStudent)
    return NextResponse.json(newStudent, { status: 201 })
  }

  try {
    // StudentService.createStudent(nom, etudiantId, filiere, annee)
    const result = await studentSoapClient.call<any>("createStudent", {
      nom: body.firstName + " " + body.lastName,
      etudiantId: body.id,
      filiere: body.programme,
      annee: body.year,
    })

    console.log("[v0] Student created:", result)
    return NextResponse.json({ id: body.id, ...body }, { status: 201 })
  } catch (error) {
    console.error("[v0] SOAP Error:", error)
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 })
  }
}
