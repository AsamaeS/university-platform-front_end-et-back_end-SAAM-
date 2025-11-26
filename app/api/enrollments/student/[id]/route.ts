import { type NextRequest, NextResponse } from "next/server"
import { restClient } from "@/lib/clients/rest-client"
import { REST_ENDPOINTS } from "@/lib/config/api-config"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await restClient.get(REST_ENDPOINTS.ENROLLMENT_BY_STUDENT(id))
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Server: Error fetching student enrollments:", error)
    return NextResponse.json({ error: "Failed to fetch student enrollments" }, { status: 500 })
  }
}
