import { type NextRequest, NextResponse } from "next/server"
import { courseSoapClient } from "@/lib/clients/soap-client"
import { API_CONFIG } from "@/lib/config/api-config"
import { MOCK_COURSES } from "@/lib/mock/courses-mock"

export async function GET() {
  console.log("[v0] GET /api/courses - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    return NextResponse.json(MOCK_COURSES)
  }

  try {
    // CourseService doesn't have getAllCourses method, return mock
    console.log("[v0] CourseService doesn't expose getAllCourses, using mock data")
    return NextResponse.json(MOCK_COURSES)
  } catch (error) {
    console.error("[v0] Error:", error)
    return NextResponse.json(MOCK_COURSES)
  }
}

export async function POST(request: NextRequest) {
  console.log("[v0] POST /api/courses - Using mock:", API_CONFIG.USE_MOCK_DATA)

  const body = await request.json()

  if (API_CONFIG.USE_MOCK_DATA) {
    const newCourse = { id: Date.now().toString(), enrolled: 0, ...body }
    MOCK_COURSES.push(newCourse)
    return NextResponse.json(newCourse, { status: 201 })
  }

  try {
    // CourseService.createCourse(coursId, titre, description, enseignant, credits, horaire)
    const result = await courseSoapClient.call<any>("createCourse", {
      coursId: body.id,
      titre: body.title,
      description: body.description,
      enseignant: body.instructor,
      credits: body.credits,
      horaire: body.schedule,
    })

    console.log("[v0] Course created:", result)
    return NextResponse.json({ id: body.id, enrolled: 0, ...body }, { status: 201 })
  } catch (error) {
    console.error("[v0] SOAP Error:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
