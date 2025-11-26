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
"[project]/lib/mock/students-mock.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_STUDENTS",
    ()=>MOCK_STUDENTS
]);
const MOCK_STUDENTS = [
    {
        id: "1",
        firstName: "Asmae",
        lastName: "SERJI",
        email: "asmae.serji@university.ma",
        phone: "+212 6 12 34 56 78",
        dateOfBirth: "2001-03-15",
        enrollmentDate: "2020-09-01",
        major: "Computer Science",
        year: 4,
        gpa: 3.8,
        status: "active"
    },
    {
        id: "2",
        firstName: "Ahlam",
        lastName: "ELBECHARRI",
        email: "ahlam.elbecharri@university.ma",
        phone: "+212 6 23 45 67 89",
        dateOfBirth: "2001-07-22",
        enrollmentDate: "2020-09-01",
        major: "Software Engineering",
        year: 4,
        gpa: 3.9,
        status: "active"
    },
    {
        id: "3",
        firstName: "Malak",
        lastName: "MALK",
        email: "malak.malk@university.ma",
        phone: "+212 6 34 56 78 90",
        dateOfBirth: "2001-11-08",
        enrollmentDate: "2020-09-01",
        major: "Data Science",
        year: 4,
        gpa: 3.7,
        status: "active"
    },
    {
        id: "4",
        firstName: "Safae",
        lastName: "ELHAMDAOUI",
        email: "safae.elhamdaoui@university.ma",
        phone: "+212 6 45 67 89 01",
        dateOfBirth: "2002-01-30",
        enrollmentDate: "2020-09-01",
        major: "Information Systems",
        year: 4,
        gpa: 3.85,
        status: "active"
    },
    {
        id: "5",
        firstName: "Youssef",
        lastName: "ALAMI",
        email: "youssef.alami@university.ma",
        phone: "+212 6 56 78 90 12",
        dateOfBirth: "2000-05-12",
        enrollmentDate: "2019-09-01",
        major: "Computer Science",
        year: 5,
        gpa: 3.6,
        status: "active"
    }
];
}),
"[project]/app/api/students/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$students$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock/students-mock.ts [app-route] (ecmascript)");
;
;
;
;
async function GET() {
    console.log("[v0] GET /api/students - Using mock:", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$students$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_STUDENTS"]);
    }
    try {
        // Note: StudentService doesn't have getAllStudents, return mock for now
        console.log("[v0] StudentService doesn't expose getAllStudents, using mock data");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$students$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_STUDENTS"]);
    } catch (error) {
        console.error("[v0] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$students$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_STUDENTS"]);
    }
}
async function POST(request) {
    console.log("[v0] POST /api/students - Using mock:", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA);
    const body = await request.json();
    if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA) {
        const newStudent = {
            id: Date.now().toString(),
            ...body
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$students$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_STUDENTS"].push(newStudent);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newStudent, {
            status: 201
        });
    }
    try {
        // StudentService.createStudent(nom, etudiantId, filiere, annee)
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clients$2f$soap$2d$client$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["studentSoapClient"].call("createStudent", {
            nom: body.firstName + " " + body.lastName,
            etudiantId: body.id,
            filiere: body.programme,
            annee: body.year
        });
        console.log("[v0] Student created:", result);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: body.id,
            ...body
        }, {
            status: 201
        });
    } catch (error) {
        console.error("[v0] SOAP Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create student"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7a3de408._.js.map