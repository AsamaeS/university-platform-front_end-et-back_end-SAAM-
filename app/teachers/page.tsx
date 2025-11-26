"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { TeacherTable } from "@/components/teachers/teacher-table"
import { TeacherDialog } from "@/components/teachers/teacher-dialog"
import { Plus } from "lucide-react"
import { type Teacher, getTeachers, createTeacher, updateTeacher, deleteTeacher } from "@/lib/api/teachers"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadTeachers()
  }, [])

  const loadTeachers = async () => {
    setIsLoading(true)
    try {
      const data = await getTeachers()
      setTeachers(data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les enseignants",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (teacher: Omit<Teacher, "id"> | Teacher) => {
    try {
      if ("id" in teacher) {
        await updateTeacher(teacher.id, teacher)
        toast({
          title: "Succès",
          description: "L'enseignant a été modifié avec succès",
        })
      } else {
        await createTeacher(teacher)
        toast({
          title: "Succès",
          description: "L'enseignant a été ajouté avec succès",
        })
      }
      loadTeachers()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!teacherToDelete) return
    try {
      await deleteTeacher(teacherToDelete.id)
      toast({
        title: "Succès",
        description: "L'enseignant a été supprimé avec succès",
      })
      loadTeachers()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'enseignant",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setTeacherToDelete(null)
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          <PageHeader
            title="Gestion des enseignants"
            description="Gérez les enseignants et leurs spécialisations"
            action={
              <Button
                onClick={() => {
                  setSelectedTeacher(null)
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="mr-2 size-4" />
                Nouvel enseignant
              </Button>
            }
          />

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Chargement...</div>
            </div>
          ) : (
            <TeacherTable
              teachers={teachers}
              onEdit={(teacher) => {
                setSelectedTeacher(teacher)
                setIsDialogOpen(true)
              }}
              onDelete={(teacher) => {
                setTeacherToDelete(teacher)
                setIsDeleteDialogOpen(true)
              }}
              onView={(teacher) => {
                setSelectedTeacher(teacher)
                setIsDialogOpen(true)
              }}
            />
          )}

          <TeacherDialog
            teacher={selectedTeacher}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSave={handleSave}
          />

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer l'enseignant{" "}
                  <span className="font-semibold">
                    {teacherToDelete?.firstName} {teacherToDelete?.lastName}
                  </span>
                  ? Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </div>
  )
}
