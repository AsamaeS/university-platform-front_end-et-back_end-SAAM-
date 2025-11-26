import { type NextRequest, NextResponse } from "next/server"
import { restClient } from "@/lib/clients/rest-client"
import { REST_SERVICES, API_CONFIG } from "@/lib/config/api-config"
import { MOCK_ENROLLMENTS } from "@/lib/mock/enrollments-mock"

export async function GET() {
  console.log("[v0] GET /api/enrollments - Using mock:", API_CONFIG.USE_MOCK_DATA)

  if (API_CONFIG.USE_MOCK_DATA) {
    return NextResponse.json(MOCK_ENROLLMENTS)
  }

  try {
    const response = await restClient.get(REST_SERVICES.ENROLLMENT)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("[v0] REST Error, falling back to mock data:", error)
    return NextResponse.json(MOCK_ENROLLMENTS)
  }
}

export async function POST(request: NextRequest) {
  console.log("[v0] POST /api/enrollments - Using mock:", API_CONFIG.USE_MOCK_DATA)

  const body = await request.json()

  if (API_CONFIG.USE_MOCK_DATA) {
    const newEnrollment = {
      id: Date.now().toString(),
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: "active",
      grade: null,
      ...body,
    }
    MOCK_ENROLLMENTS.push(newEnrollment)
    return NextResponse.json(newEnrollment)
  }

  try {
    const response = await restClient.post(REST_SERVICES.ENROLLMENT, body)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("[v0] REST Error:", error)
    return NextResponse.json({ error: "Failed to create enrollment" }, { status: 500 })
  }
}
