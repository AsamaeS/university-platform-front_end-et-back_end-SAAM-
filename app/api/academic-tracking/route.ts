import { NextResponse } from "next/server"
import { restClient } from "@/lib/clients/rest-client"
import { REST_ENDPOINTS } from "@/lib/config/api-config"

export async function GET() {
  try {
    const data = await restClient.get(REST_ENDPOINTS.ACADEMIC_TRACKING)
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Server: Error fetching academic records:", error)
    return NextResponse.json({ error: "Failed to fetch academic records" }, { status: 500 })
  }
}
