"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Course } from "@/lib/api/courses"
import type { Teacher } from "@/lib/api/teachers"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CourseDialogProps {
  course?: Course | null
  teachers: Teacher[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (course: Omit<Course, "id" | "enrolled"> | Course) => void
}

export function CourseDialog({ course, teachers, open, onOpenChange, onSave }: CourseDialogProps) {
  const [formData, setFormData] = useState<Omit<Course, "id" | "enrolled">>({
    code: "",
    name: "",
    description: "",
    teacherId: "",
    teacherName: "",
    credits: 3,
    schedule: "",
    capacity: 30,
    department: "",
    semester: "Fall",
    year: new Date().getFullYear(),
    status: "active",
  })

  useEffect(() => {
    if (course) {
      setFormData(course)
    } else {
      setFormData({
        code: "",
        name: "",
        description: "",
        teacherId: "",
        teacherName: "",
        credits: 3,
        schedule: "",
        capacity: 30,
        department: "",
        semester: "Fall",
        year: new Date().getFullYear(),
        status: "active",
      })
    }
  }, [course, open])

  const handleTeacherChange = (teacherId: string) => {
    const teacher = teachers.find((t) => t.id === teacherId)
    if (teacher) {
      setFormData({
        ...formData,
        teacherId,
        teacherName: `Prof. ${teacher.lastName}`,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (course) {
      onSave({ ...course, ...formData })
    } else {
      onSave(formData)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{course ? "Modifier le cours" : "Nouveau cours"}</DialogTitle>
          <DialogDescription>
            {course ? "Modifiez les informations du cours" : "Ajoutez un nouveau cours à la plateforme"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Code du cours *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="Ex: CS401"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Département *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Ex: Informatique"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nom du cours *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Intelligence Artificielle"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description détaillée du cours"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacherId">Enseignant *</Label>
              <Select value={formData.teacherId} onValueChange={handleTeacherChange}>
                <SelectTrigger id="teacherId">
                  <SelectValue placeholder="Sélectionner un enseignant" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.firstName} {teacher.lastName} - {teacher.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">Horaires *</Label>
              <Input
                id="schedule"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                placeholder="Ex: Lundi 10:00-12:00, Jeudi 14:00-16:00"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="credits">Crédits *</Label>
                <Input
                  id="credits"
                  type="number"
                  min="1"
                  max="12"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacité *</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Année *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="semester">Semestre *</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value: Course["semester"]) => setFormData({ ...formData, semester: value })}
                >
                  <SelectTrigger id="semester">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall">Automne</SelectItem>
                    <SelectItem value="Spring">Printemps</SelectItem>
                    <SelectItem value="Summer">Été</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Course["status"]) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="archived">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">{course ? "Enregistrer" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
