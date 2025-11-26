import { type NextRequest, NextResponse } from "next/server"
import { restClient } from "@/lib/clients/rest-client"
import { REST_SERVICES } from "@/lib/config/api-config"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const response = await restClient.get(`${REST_SERVICES.ENROLLMENT}/${id}`)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("[v0] Server: Error fetching enrollment:", error)
    return NextResponse.json({ error: "Failed to fetch enrollment" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const response = await restClient.put(`${REST_SERVICES.ENROLLMENT}/${id}`, body)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("[v0] Server: Error updating enrollment:", error)
    return NextResponse.json({ error: "Failed to update enrollment" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await restClient.delete(`${REST_SERVICES.ENROLLMENT}/${id}`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Server: Error deleting enrollment:", error)
    return NextResponse.json({ error: "Failed to delete enrollment" }, { status: 500 })
  }
}
