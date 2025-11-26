"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Student } from "@/lib/api/students"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StudentDialogProps {
  student?: Student | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (student: Omit<Student, "id"> | Student) => void
}

export function StudentDialog({ student, open, onOpenChange, onSave }: StudentDialogProps) {
  const [formData, setFormData] = useState<Omit<Student, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    enrollmentDate: "",
    major: "",
    year: 1,
    gpa: 0,
    status: "active",
  })

  useEffect(() => {
    if (student) {
      setFormData(student)
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        enrollmentDate: new Date().toISOString().split("T")[0],
        major: "",
        year: 1,
        gpa: 0,
        status: "active",
      })
    }
  }, [student, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (student) {
      onSave({ ...student, ...formData })
    } else {
      onSave(formData)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{student ? "Modifier l'étudiant" : "Nouvel étudiant"}</DialogTitle>
          <DialogDescription>
            {student ? "Modifiez les informations de l'étudiant" : "Ajoutez un nouvel étudiant à la plateforme"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date de naissance *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enrollmentDate">Date d'inscription *</Label>
                <Input
                  id="enrollmentDate"
                  type="date"
                  value={formData.enrollmentDate}
                  onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="major">Filière *</Label>
                <Input
                  id="major"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  placeholder="Ex: Informatique"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Année *</Label>
                <Select
                  value={String(formData.year)}
                  onValueChange={(value) => setFormData({ ...formData, year: Number(value) })}
                >
                  <SelectTrigger id="year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Année 1</SelectItem>
                    <SelectItem value="2">Année 2</SelectItem>
                    <SelectItem value="3">Année 3</SelectItem>
                    <SelectItem value="4">Année 4</SelectItem>
                    <SelectItem value="5">Année 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA *</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.1"
                  min="0"
                  max="4"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Student["status"]) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="graduated">Diplômé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">{student ? "Enregistrer" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
