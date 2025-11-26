"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Enrollment } from "@/lib/api/enrollments"
import type { Student } from "@/lib/api/students"
import type { Course } from "@/lib/api/courses"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface EnrollmentDialogProps {
  students: Student[]
  courses: Course[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (enrollment: Omit<Enrollment, "id">) => void
}

export function EnrollmentDialog({ students, courses, open, onOpenChange, onSave }: EnrollmentDialogProps) {
  const [selectedStudentId, setSelectedStudentId] = useState("")
  const [selectedCourseId, setSelectedCourseId] = useState("")

  const selectedStudent = students.find((s) => s.id === selectedStudentId)
  const selectedCourse = courses.find((c) => c.id === selectedCourseId)

  useEffect(() => {
    if (!open) {
      setSelectedStudentId("")
      setSelectedCourseId("")
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedStudent || !selectedCourse) return

    const enrollment: Omit<Enrollment, "id"> = {
      studentId: selectedStudent.id,
      studentName: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
      studentEmail: selectedStudent.email,
      courseId: selectedCourse.id,
      courseCode: selectedCourse.code,
      courseName: selectedCourse.name,
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: "enrolled",
    }

    onSave(enrollment)
    onOpenChange(false)
  }

  const isFull = selectedCourse && selectedCourse.enrolled >= selectedCourse.capacity

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouvelle inscription</DialogTitle>
          <DialogDescription>Inscrivez un étudiant à un cours disponible</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="student">Étudiant *</Label>
              <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                <SelectTrigger id="student">
                  <SelectValue placeholder="Sélectionner un étudiant" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.firstName} {student.lastName} - {student.major} (Année {student.year})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedStudent && <div className="text-sm text-muted-foreground">Email: {selectedStudent.email}</div>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Cours *</Label>
              <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Sélectionner un cours" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {course.code}
                        </Badge>
                        {course.name}
                        {course.enrolled >= course.capacity && (
                          <Badge variant="secondary" className="bg-red-500/10 text-red-700 dark:text-red-400">
                            Complet
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCourse && (
                <div className="space-y-2 rounded-lg border p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Enseignant:</span>
                    <span className="font-medium">{selectedCourse.teacherName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Horaires:</span>
                    <span className="font-medium">{selectedCourse.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Crédits:</span>
                    <span className="font-medium">{selectedCourse.credits}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Places disponibles:</span>
                    <span className="font-medium">
                      {selectedCourse.enrolled} / {selectedCourse.capacity}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {isFull && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>
                  Ce cours a atteint sa capacité maximale. L'inscription sera mise en attente.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={!selectedStudentId || !selectedCourseId}>
              Inscrire
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
