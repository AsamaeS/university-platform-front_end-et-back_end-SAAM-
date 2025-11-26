module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/clients/soap-client.tsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SoapClient",
    ()=>SoapClient,
    "courseSoapClient",
    ()=>courseSoapClient,
    "soapClient",
    ()=>soapClient,
    "studentSoapClient",
    ()=>studentSoapClient,
    "teacherSoapClient",
    ()=>teacherSoapClient
]);
class SoapClient {
    baseUrl;
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    buildSOAPEnvelope(methodName, params) {
        const paramXml = Object.entries(params).map(([key, value])=>`<${key}>${this.escapeXml(String(value))}</${key}>`).join("");
        return `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://saam_projetsoa/">
  <soap:Body>
    <tns:${methodName}>
      ${paramXml}
    </tns:${methodName}>
  </soap:Body>
</soap:Envelope>`;
    }
    escapeXml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }
    parseSOAPResponse(xml) {
        try {
            // Extract text content from response
            const textMatch = xml.match(/<return>([\s\S]*?)<\/return>/);
            if (textMatch) {
                const content = textMatch[1];
                // Try to parse as JSON if it looks like it
                try {
                    return JSON.parse(content);
                } catch  {
                    // Return as is if not JSON
                    return content;
                }
            }
            return null;
        } catch (error) {
            console.error("[v0] SOAP Parse Error:", error);
            return null;
        }
    }
    async call(methodName, params) {
        try {
            console.log(`[v0] SOAP Call: ${methodName}`, params);
            const soapBody = this.buildSOAPEnvelope(methodName, params);
            const response = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "text/xml; charset=UTF-8",
                    SOAPAction: `http://saam_projetsoa/${methodName}`
                },
                body: soapBody
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const responseText = await response.text();
            console.log("[v0] SOAP Response:", responseText.substring(0, 200));
            const result = this.parseSOAPResponse(responseText);
            return result;
        } catch (error) {
            console.error("[v0] SOAP Error:", error);
            throw new Error(`SOAP Error: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
}
const studentSoapClient = new SoapClient(process.env.NEXT_PUBLIC_SOAP_STUDENT_URL || "http://localhost:8089/ws/student");
const teacherSoapClient = new SoapClient(process.env.NEXT_PUBLIC_SOAP_TEACHER_URL || "http://localhost:8087/ws/teacher");
const courseSoapClient = new SoapClient(process.env.NEXT_PUBLIC_SOAP_COURSE_URL || "http://localhost:8086/ws/course");
const soapClient = new SoapClient(process.env.NEXT_PUBLIC_SOAP_AUTH_URL || "http://localhost:8088/ws/auth");
}),
"[project]/lib/config/api-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API Configuration for REST and SOAP endpoints
__turbopack_context__.s([
    "API_CONFIG",
    ()=>API_CONFIG,
    "REST_ENDPOINTS",
    ()=>REST_ENDPOINTS,
    "REST_SERVICES",
    ()=>REST_SERVICES,
    "SOAP_SERVICES",
    ()=>SOAP_SERVICES,
    "USE_MOCK_DATA",
    ()=>USE_MOCK_DATA
]);
const API_CONFIG = {
    // REST API Base URL for Enrollments, Departments, Modules, Marks
    REST_BASE_URL: process.env.NEXT_PUBLIC_REST_API_URL || "http://localhost:8080/api",
    // SOAP Web Service URLs - Separate ports for each service
    SOAP_SERVICES: {
        STUDENT: process.env.NEXT_PUBLIC_SOAP_STUDENT_URL || "http://localhost:8089/ws/student",
        TEACHER: process.env.NEXT_PUBLIC_SOAP_TEACHER_URL || "http://localhost:8087/ws/teacher",
        COURSE: process.env.NEXT_PUBLIC_SOAP_COURSE_URL || "http://localhost:8086/ws/course"
    },
    // Timeout settings
    TIMEOUT: 10000,
    USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === "false" ? false : true
};
const USE_MOCK_DATA = API_CONFIG.USE_MOCK_DATA;
const REST_ENDPOINTS = {
    // Enrollments/Registration
    ENROLLMENTS: "/enrollments",
    ENROLLMENT_BY_ID: (id)=>`/enrollments/${id}`,
    ENROLLMENT_BY_STUDENT: (studentId)=>`/enrollments/student/${studentId}`,
    ENROLLMENT_BY_COURSE: (courseId)=>`/enrollments/course/${courseId}`,
    // Departments
    DEPARTMENTS: "/departments",
    DEPARTMENT_BY_ID: (id)=>`/departments/${id}`,
    // Modules
    MODULES: "/modules",
    MODULE_BY_ID: (id)=>`/modules/${id}`,
    MODULE_BY_DEPARTMENT: (deptId)=>`/modules/department/${deptId}`,
    // Marks/Grades
    MARKS: "/marks",
    MARK_BY_ID: (id)=>`/marks/${id}`,
    MARKS_BY_STUDENT: (studentId)=>`/marks/student/${studentId}`,
    MARKS_BY_MODULE: (moduleId)=>`/marks/module/${moduleId}`,
    // Academic Tracking
    ACADEMIC_TRACKING: "/academic-tracking",
    STUDENT_TRANSCRIPT: (studentId)=>`/academic-tracking/transcript/${studentId}`,
    STUDENT_GPA: (studentId)=>`/academic-tracking/gpa/${studentId}`
};
const REST_SERVICES = {
    ENROLLMENT: "/enrollments",
    DEPARTMENT: "/departments",
    MODULE: "/modules",
    MARK: "/marks",
    ACADEMIC_TRACKING: "/academic-tracking"
};
const SOAP_SERVICES = {
    AUTHENTICATION: "AuthenticationService",
    STUDENT: "StudentService",
    TEACHER: "TeacherService",
    COURSE: "CourseService"
};
}),
"[project]/lib/mock/teachers-mock.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_TEACHERS",
    ()=>MOCK_TEACHERS
]);
const MOCK_TEACHERS = [
    {
        id: "1",
        firstName: "Mohammed",
        lastName: "BENNANI",
        email: "mohammed.bennani@university.ma",
        phone: "+212 5 22 12 34 56",
        department: "Computer Science",
        specialization: "Artificial Intelligence",
        officeHours: "Mon-Wed 14:00-16:00",
        status: "active"
    },
    {
        id: "2",
        firstName: "Fatima",
        lastName: "ZAHRAE",
        email: "fatima.zahrae@university.ma",
        phone: "+212 5 22 23 45 67",
        department: "Software Engineering",
        specialization: "Web Development",
        officeHours: "Tue-Thu 10:00-12:00",
        status: "active"
    },
    {
        id: "3",
        firstName: "Ahmed",
        lastName: "KADIRI",
        email: "ahmed.kadiri@university.ma",
        phone: "+212 5 22 34 56 78",
        department: "Data Science",
        specialization: "Machine Learning",
        officeHours: "Mon-Fri 09:00-11:00",
        status: "active"
    },
    {
        id: "4",
        firstName: "Samira",
        lastName: "TAZI",
        email: "samira.tazi@university.ma",
        phone: "+212 5 22 45 67 89",
        department: "Information Systems",
        specialization: "Database Systems",
        officeHours: "Wed-Fri 13:00-15:00",
        status: "active"
    },
    {
        id: "5",
        firstName: "Hatim",
        lastName: "GUERMAH",
        email: "hatim.guermah@university.ma",
        phone: "+212 5 22 56 78 90",
        department: "Software Architecture",
        specialization: "Service Oriented Architecture (SOA)",
        officeHours: "Mon-Wed-Fri 10:00-12:00",
        status: "active"
    }
];
}),
"[project]/app/api/teachers/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clients$2f$soap$2d$client$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clients/soap-client.tsx [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/api-config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$teachers$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock/teachers-mock.ts [app-route] (ecmascript)");
;
;
;
;
async function GET() {
    console.log("[v0] GET /api/teachers - Using mock:", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$teachers$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"]);
    }
    try {
        // TeacherService doesn't have getAllTeachers method, return mock
        console.log("[v0] TeacherService doesn't expose getAllTeachers, using mock data");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$teachers$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"]);
    } catch (error) {
        console.error("[v0] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$teachers$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"]);
    }
}
async function POST(request) {
    console.log("[v0] POST /api/teachers - Using mock:", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA);
    const body = await request.json();
    if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA) {
        const newTeacher = {
            id: Date.now().toString(),
            ...body
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$teachers$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"].push(newTeacher);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newTeacher, {
            status: 201
        });
    }
    try {
        // TeacherService.addTeacher(id, nom, specialite, disponibilite)
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clients$2f$soap$2d$client$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teacherSoapClient"].call("addTeacher", {
            id: body.id,
            nom: body.firstName + " " + body.lastName,
            specialite: body.specialization,
            disponibilite: body.officeHours || "09:00-17:00"
        });
        console.log("[v0] Teacher created:", result);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: body.id,
            ...body
        }, {
            status: 201
        });
    } catch (error) {
        console.error("[v0] SOAP Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create teacher"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__09370768._.js.map