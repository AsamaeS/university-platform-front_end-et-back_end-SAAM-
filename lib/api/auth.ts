// Authentication API using SOAP

import { soapClient } from "../clients/soap-client"
import { SOAP_SERVICES, USE_MOCK_DATA } from "../config/api-config"

export interface LoginRequest {
  username: string
  password: string
  role?: "student" | "teacher" | "admin" // Added role parameter
}

export interface LoginResponse {
  success: boolean
  token?: string
  userId?: string
  message?: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: "student" | "teacher" | "admin"
}

export interface RegisterResponse {
  success: boolean
  userId?: string
  message?: string
}

const MOCK_CREDENTIALS = {
  students: [
    { username: "STU001", password: "password123", userId: "1" },
    { username: "STU002", password: "password123", userId: "2" },
    { username: "STU003", password: "password123", userId: "3" },
    { username: "STU004", password: "password123", userId: "4" },
    { username: "STU005", password: "password123", userId: "5" },
  ],
  teachers: [
    { username: "mohammed.bennani@university.ma", password: "teacher123", userId: "1" },
    { username: "fatima.zahrae@university.ma", password: "teacher123", userId: "2" },
    { username: "ahmed.kadiri@university.ma", password: "teacher123", userId: "3" },
    { username: "samira.tazi@university.ma", password: "teacher123", userId: "4" },
    { username: "hatim.guermah@university.ma", password: "teacher123", userId: "5" },
  ],
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    if (USE_MOCK_DATA) {
      console.log("[v0] Using mock authentication")

      // Check student credentials
      if (credentials.role === "student") {
        const student = MOCK_CREDENTIALS.students.find(
          (s) => s.username === credentials.username && s.password === credentials.password,
        )
        if (student) {
          const mockToken = `mock_student_token_${student.userId}`
          localStorage.setItem("auth_token", mockToken)
          localStorage.setItem("user_id", student.userId)
          localStorage.setItem("user_role", "student")
          return {
            success: true,
            token: mockToken,
            userId: student.userId,
            message: "Connexion réussie",
          }
        }
      }

      // Check teacher credentials
      if (credentials.role === "teacher") {
        const teacher = MOCK_CREDENTIALS.teachers.find(
          (t) => t.username === credentials.username && t.password === credentials.password,
        )
        if (teacher) {
          const mockToken = `mock_teacher_token_${teacher.userId}`
          localStorage.setItem("auth_token", mockToken)
          localStorage.setItem("user_id", teacher.userId)
          localStorage.setItem("user_role", "teacher")
          return {
            success: true,
            token: mockToken,
            userId: teacher.userId,
            message: "Connexion réussie",
          }
        }
      }

      return {
        success: false,
        message: "Identifiants incorrects",
      }
    }

    // Real SOAP authentication
    const response = await soapClient.call<any>(SOAP_SERVICES.AUTHENTICATION, "login", credentials)

    if (response.success && response.token) {
      localStorage.setItem("auth_token", response.token)
      localStorage.setItem("user_id", response.userId)
      localStorage.setItem("user_role", credentials.role || "student")
    }

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return {
      success: false,
      message: "Erreur de connexion. Veuillez réessayer.",
    }
  }
}

export async function register(userData: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await soapClient.call<any>(SOAP_SERVICES.AUTHENTICATION, "register", userData)

    return response
  } catch (error) {
    console.error("[v0] Register error:", error)
    return {
      success: false,
      message: "Erreur lors de l'inscription. Veuillez réessayer.",
    }
  }
}

export async function logout(): Promise<void> {
  localStorage.removeItem("auth_token")
  localStorage.removeItem("user_id")
  localStorage.removeItem("user_role")
  window.location.href = "/login"
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("auth_token")
}

export function getCurrentUserId(): string | null {
  return localStorage.getItem("user_id")
}

export function getUserRole(): string | null {
  return localStorage.getItem("user_role")
}
