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
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
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
"[project]/lib/clients/rest-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// REST API Client using Axios
__turbopack_context__.s([
    "restClient",
    ()=>restClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/api-config.ts [app-route] (ecmascript)");
;
;
class RestClient {
    client;
    constructor(){
        this.client = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].REST_BASE_URL,
            timeout: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_CONFIG"].TIMEOUT,
            headers: {
                "Content-Type": "application/json"
            }
        });
        // Request interceptor for adding auth token
        this.client.interceptors.request.use((config)=>{
            const token = localStorage.getItem("auth_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error)=>Promise.reject(error));
        // Response interceptor for error handling
        this.client.interceptors.response.use((response)=>response, (error)=>{
            console.error("[v0] REST API Error:", error.response?.data || error.message);
            if (error.response?.status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem("auth_token");
                window.location.href = "/login";
            }
            return Promise.reject(error);
        });
    }
    async get(url, params) {
        const response = await this.client.get(url, {
            params
        });
        return response.data;
    }
    async post(url, data) {
        const response = await this.client.post(url, data);
        return response.data;
    }
    async put(url, data) {
        const response = await this.client.put(url, data);
        return response.data;
    }
    async delete(url) {
        const response = await this.client.delete(url);
        return response.data;
    }
}
const restClient = new RestClient();
}),
"[project]/app/api/academic-tracking/[studentId]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clients$2f$rest$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clients/rest-client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/api-config.ts [app-route] (ecmascript)");
;
;
;
async function GET(request, { params }) {
    try {
        const { studentId } = await params;
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clients$2f$rest$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["restClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$api$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["REST_ENDPOINTS"].STUDENT_TRANSCRIPT(studentId));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (error) {
        console.error("[v0] Server: Error fetching academic record:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch academic record"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2d4304f2._.js.map