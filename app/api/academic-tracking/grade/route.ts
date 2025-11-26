import { type NextRequest, NextResponse } from "next/server"
import { restClient } from "@/lib/clients/rest-client"
import { REST_ENDPOINTS } from "@/lib/config/api-config"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const data = await restClient.put(`${REST_ENDPOINTS.ACADEMIC_TRACKING}/grade`, body)
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Server: Error updating grade:", error)
    return NextResponse.json({ error: "Failed to update grade" }, { status: 500 })
  }
}
