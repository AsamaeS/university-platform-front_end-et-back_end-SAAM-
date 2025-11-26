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
"[project]/lib/mock/courses-mock.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_COURSES",
    ()=>MOCK_COURSES
]);
const MOCK_COURSES = [
    {
        id: "1",
        code: "CS401",
        name: "Advanced Algorithms",
        description: "Deep dive into algorithm design and analysis",
        credits: 3,
        department: "Computer Science",
        teacherId: "1",
        teacherName: "Prof. Mohammed BENNANI",
        schedule: "Mon/Wed 10:00-11:30",
        capacity: 40,
        enrolled: 35,
        semester: "Fall 2024",
        status: "active"
    },
    {
        id: "2",
        code: "SE402",
        name: "Software Architecture",
        description: "Design patterns and architectural principles",
        credits: 3,
        department: "Software Engineering",
        teacherId: "2",
        teacherName: "Prof. Fatima ZAHRAE",
        schedule: "Tue/Thu 14:00-15:30",
        capacity: 35,
        enrolled: 30,
        semester: "Fall 2024",
        status: "active"
    },
    {
        id: "3",
        code: "DS403",
        name: "Machine Learning",
        description: "Introduction to ML algorithms and applications",
        credits: 4,
        department: "Data Science",
        teacherId: "3",
        teacherName: "Prof. Ahmed KADIRI",
        schedule: "Mon/Wed/Fri 13:00-14:00",
        capacity: 30,
        enrolled: 30,
        semester: "Fall 2024",
        status: "active"
    },
    {
        id: "4",
        code: "IS404",
        name: "Database Design",
        description: "Advanced database concepts and design",
        credits: 3,
        department: "Information Systems",
        teacherId: "4",
        teacherName: "Prof. Samira TAZI",
        schedule: "Tue/Thu 10:00-11:30",
        capacity: 35,
        enrolled: 28,
        semester: "Fall 2024",
        status: "active"
    }
];
}),
"[project]/app/api/courses/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$courses$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock/courses-mock.ts [app-route] (ecmascript)");
;
;
;
;
async function GET() {
    console.log("[v0] GET /api/courses - Using mock:", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$courses$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_COURSES"]);
    }
    try {
        // CourseService doesn't have getAllCourses method, return mock
        console.log("[v0] CourseService doesn't expose getAllCourses, using mock data");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$courses$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_COURSES"]);
    } catch (error) {
        console.error("[v0] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$courses$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_COURSES"]);
    }
}
async function POST(request) {
    console.log("[v0] POST /api/courses - Using mock:", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA);
    const body = await request.json();
    if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].USE_MOCK_DATA) {
        const newCourse = {
            id: Date.now().toString(),
            enrolled: 0,
            ...body
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2f$courses$2d$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_COURSES"].push(newCourse);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newCourse, {
            status: 201
        });
    }
    try {
        // CourseService.createCourse(coursId, titre, description, enseignant, credits, horaire)
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clients$2f$soap$2d$client$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["courseSoapClient"].call("createCourse", {
            coursId: body.id,
            titre: body.title,
            description: body.description,
            enseignant: body.instructor,
            credits: body.credits,
            horaire: body.schedule
        });
        console.log("[v0] Course created:", result);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: body.id,
            enrolled: 0,
            ...body
        }, {
            status: 201
        });
    } catch (error) {
        console.error("[v0] SOAP Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create course"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__be1dea19._.js.map