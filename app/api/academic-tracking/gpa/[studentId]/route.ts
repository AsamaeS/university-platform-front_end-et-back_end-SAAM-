import { type NextRequest, NextResponse } from "next/server"
import { restClient } from "@/lib/clients/rest-client"
import { REST_ENDPOINTS } from "@/lib/config/api-config"

export async function GET(request: NextRequest, { params }: { params: Promise<{ studentId: string }> }) {
  try {
    const { studentId } = await params
    const data = await restClient.get(REST_ENDPOINTS.STUDENT_GPA(studentId))
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Server: Error fetching student GPA:", error)
    return NextResponse.json({ error: "Failed to fetch student GPA" }, { status: 500 })
  }
}
