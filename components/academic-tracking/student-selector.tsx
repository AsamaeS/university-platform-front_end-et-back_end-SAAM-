"use client"

import type { Student } from "@/lib/api/students"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface StudentSelectorProps {
  students: Student[]
  selectedStudentId: string
  onSelect: (studentId: string) => void
}

export function StudentSelector({ students, selectedStudentId, onSelect }: StudentSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="student">Sélectionner un étudiant</Label>
      <Select value={selectedStudentId} onValueChange={onSelect}>
        <SelectTrigger id="student" className="w-full md:w-[400px]">
          <SelectValue placeholder="Choisir un étudiant" />
        </SelectTrigger>
        <SelectContent>
          {students.map((student) => (
            <SelectItem key={student.id} value={student.id}>
              {student.firstName} {student.lastName} - {student.major} (Année {student.year})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
