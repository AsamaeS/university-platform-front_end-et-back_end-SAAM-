"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

interface TeacherDialogProps {
  teacher?: Teacher | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (teacher: Omit<Teacher, "id"> | Teacher) => void
}

export function TeacherDialog({ teacher, open, onOpenChange, onSave }: TeacherDialogProps) {
  const [formData, setFormData] = useState<Omit<Teacher, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    specialization: "",
    hireDate: "",
    officeHours: "",
    status: "active",
  })

  useEffect(() => {
    if (teacher) {
      setFormData(teacher)
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        specialization: "",
        hireDate: new Date().toISOString().split("T")[0],
        officeHours: "",
        status: "active",
      })
    }
  }, [teacher, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (teacher) {
      onSave({ ...teacher, ...formData })
    } else {
      onSave(formData)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{teacher ? "Modifier l'enseignant" : "Nouvel enseignant"}</DialogTitle>
          <DialogDescription>
            {teacher ? "Modifiez les informations de l'enseignant" : "Ajoutez un nouvel enseignant à la plateforme"}
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
                <Label htmlFor="department">Département *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Ex: Informatique"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Spécialisation *</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="Ex: Intelligence Artificielle"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hireDate">Date d'embauche *</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Teacher["status"]) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="on-leave">En congé</SelectItem>
                    <SelectItem value="retired">Retraité</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="officeHours">Horaires de bureau *</Label>
              <Textarea
                id="officeHours"
                value={formData.officeHours}
                onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                placeholder="Ex: Lundi 14h-16h, Mercredi 10h-12h"
                rows={3}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">{teacher ? "Enregistrer" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
