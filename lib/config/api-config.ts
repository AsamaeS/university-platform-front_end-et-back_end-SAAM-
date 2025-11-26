// API Configuration for REST and SOAP endpoints

export const API_CONFIG = {
  // REST API Base URL for Enrollments, Departments, Modules, Marks
  REST_BASE_URL: process.env.NEXT_PUBLIC_REST_API_URL || "http://localhost:8080/api",

  // SOAP Web Service URLs - Separate ports for each service
  SOAP_SERVICES: {
    STUDENT: process.env.NEXT_PUBLIC_SOAP_STUDENT_URL || "http://localhost:8089/ws/student",
    TEACHER: process.env.NEXT_PUBLIC_SOAP_TEACHER_URL || "http://localhost:8087/ws/teacher",
    COURSE: process.env.NEXT_PUBLIC_SOAP_COURSE_URL || "http://localhost:8086/ws/course",
  },

  // Timeout settings
  TIMEOUT: 10000,

  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === "false" ? false : true, // Default to true for development
}

export const USE_MOCK_DATA = API_CONFIG.USE_MOCK_DATA

// REST API Endpoints
export const REST_ENDPOINTS = {
  // Enrollments/Registration
  ENROLLMENTS: "/enrollments",
  ENROLLMENT_BY_ID: (id: string) => `/enrollments/${id}`,
  ENROLLMENT_BY_STUDENT: (studentId: string) => `/enrollments/student/${studentId}`,
  ENROLLMENT_BY_COURSE: (courseId: string) => `/enrollments/course/${courseId}`,

  // Departments
  DEPARTMENTS: "/departments",
  DEPARTMENT_BY_ID: (id: string) => `/departments/${id}`,

  // Modules
  MODULES: "/modules",
  MODULE_BY_ID: (id: string) => `/modules/${id}`,
  MODULE_BY_DEPARTMENT: (deptId: string) => `/modules/department/${deptId}`,

  // Marks/Grades
  MARKS: "/marks",
  MARK_BY_ID: (id: string) => `/marks/${id}`,
  MARKS_BY_STUDENT: (studentId: string) => `/marks/student/${studentId}`,
  MARKS_BY_MODULE: (moduleId: string) => `/marks/module/${moduleId}`,

  // Academic Tracking
  ACADEMIC_TRACKING: "/academic-tracking",
  STUDENT_TRANSCRIPT: (studentId: string) => `/academic-tracking/transcript/${studentId}`,
  STUDENT_GPA: (studentId: string) => `/academic-tracking/gpa/${studentId}`,
}

// REST Services
export const REST_SERVICES = {
  ENROLLMENT: "/enrollments",
  DEPARTMENT: "/departments",
  MODULE: "/modules",
  MARK: "/marks",
  ACADEMIC_TRACKING: "/academic-tracking",
}

export const SOAP_SERVICES = {
  AUTHENTICATION: "AuthenticationService",
  STUDENT: "StudentService",
  TEACHER: "TeacherService",
  COURSE: "CourseService",
}
