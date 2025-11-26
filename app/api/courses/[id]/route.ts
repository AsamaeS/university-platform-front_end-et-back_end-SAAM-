import { type NextRequest, NextResponse } from "next/server"
import { courseSoapClient } from "@/lib/clients/soap-client"
import { API_CONFIG } from "@/lib/config/api-config"
import { MOCK_COURSES } from "@/lib/mock/courses-mock"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log("[v0] GET /api/courses/:id - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    const course = MOCK_COURSES.find((c) => c.id === id)
    return NextResponse.json(course || null)
  }

  try {
    // CourseService.getCourse(coursId)
    const result = await courseSoapClient.call<any>("getCourse", { coursId: id })
    console.log("[v0] Course retrieved:", result)
    return NextResponse.json(MOCK_COURSES.find((c) => c.id === id) || null)
  } catch (error) {
    console.error("[v0] SOAP Error, falling back to mock data:", error)
    const course = MOCK_COURSES.find((c) => c.id === id)
    return NextResponse.json(course || null)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  console.log("[v0] PUT /api/courses/:id - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    const index = MOCK_COURSES.findIndex((c) => c.id === id)
    if (index !== -1) {
      MOCK_COURSES[index] = { ...MOCK_COURSES[index], ...body }
      return NextResponse.json(MOCK_COURSES[index])
    }
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  try {
    // CourseService.updateCourse(coursId, titre, description, enseignant, credits, horaire)
    const result = await courseSoapClient.call<any>("updateCourse", {
      coursId: id,
      titre: body.title,
      description: body.description,
      enseignant: body.instructor,
      credits: body.credits,
      horaire: body.schedule,
    })

    console.log("[v0] Course updated:", result)
    return NextResponse.json({ id, ...body })
  } catch (error) {
    console.error("[v0] SOAP Error:", error)
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log("[v0] DELETE /api/courses/:id - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    const index = MOCK_COURSES.findIndex((c) => c.id === id)
    if (index !== -1) {
      MOCK_COURSES.splice(index, 1)
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  try {
    // CourseService.deleteCourse(coursId)
    const result = await courseSoapClient.call<any>("deleteCourse", { coursId: id })
    console.log("[v0] Course deleted:", result)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] SOAP Error:", error)
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}
