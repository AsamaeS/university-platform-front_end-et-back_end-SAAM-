interface SOAPRequestOptions {
  namespace?: string
  soapAction?: string
}

export class SoapClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private buildSOAPEnvelope(methodName: string, params: Record<string, any>): string {
    const paramXml = Object.entries(params)
      .map(([key, value]) => `<${key}>${this.escapeXml(String(value))}</${key}>`)
      .join("")

    return `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://saam_projetsoa/">
  <soap:Body>
    <tns:${methodName}>
      ${paramXml}
    </tns:${methodName}>
  </soap:Body>
</soap:Envelope>`
  }

  private escapeXml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
  }

  private parseSOAPResponse(xml: string): any {
    try {
      // Extract text content from response
      const textMatch = xml.match(/<return>([\s\S]*?)<\/return>/)
      if (textMatch) {
        const content = textMatch[1]
        // Try to parse as JSON if it looks like it
        try {
          return JSON.parse(content)
        } catch {
          // Return as is if not JSON
          return content
        }
      }
      return null
    } catch (error) {
      console.error("[v0] SOAP Parse Error:", error)
      return null
    }
  }

  async call<T>(methodName: string, params: Record<string, any>): Promise<T> {
    try {
      console.log(`[v0] SOAP Call: ${methodName}`, params)

      const soapBody = this.buildSOAPEnvelope(methodName, params)

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/xml; charset=UTF-8",
          SOAPAction: `http://saam_projetsoa/${methodName}`,
        },
        body: soapBody,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const responseText = await response.text()
      console.log("[v0] SOAP Response:", responseText.substring(0, 200))

      const result = this.parseSOAPResponse(responseText)
      return result as T
    } catch (error) {
      console.error("[v0] SOAP Error:", error)
      throw new Error(`SOAP Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }
}

// Create separate SOAP clients for each service
export const studentSoapClient = new SoapClient(
  process.env.NEXT_PUBLIC_SOAP_STUDENT_URL || "http://localhost:8089/ws/student",
)
export const teacherSoapClient = new SoapClient(
  process.env.NEXT_PUBLIC_SOAP_TEACHER_URL || "http://localhost:8087/ws/teacher",
)
export const courseSoapClient = new SoapClient(
  process.env.NEXT_PUBLIC_SOAP_COURSE_URL || "http://localhost:8086/ws/course",
)

export const soapClient = new SoapClient(process.env.NEXT_PUBLIC_SOAP_AUTH_URL || "http://localhost:8088/ws/auth")
