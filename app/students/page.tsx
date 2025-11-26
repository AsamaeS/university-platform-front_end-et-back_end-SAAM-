"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { StudentTable } from "@/components/students/student-table"
import { StudentDialog } from "@/components/students/student-dialog"
import { Plus } from "lucide-react"
import { type Student, getStudents, createStudent, updateStudent, deleteStudent } from "@/lib/api/students"
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

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    setIsLoading(true)
    try {
      const data = await getStudents()
      setStudents(data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les étudiants",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (student: Omit<Student, "id"> | Student) => {
    try {
      if ("id" in student) {
        await updateStudent(student.id, student)
        toast({
          title: "Succès",
          description: "L'étudiant a été modifié avec succès",
        })
      } else {
        await createStudent(student)
        toast({
          title: "Succès",
          description: "L'étudiant a été ajouté avec succès",
        })
      }
      loadStudents()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!studentToDelete) return
    try {
      await deleteStudent(studentToDelete.id)
      toast({
        title: "Succès",
        description: "L'étudiant a été supprimé avec succès",
      })
      loadStudents()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'étudiant",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setStudentToDelete(null)
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          <PageHeader
            title="Gestion des étudiants"
            description="Gérez les étudiants inscrits à l'université"
            action={
              <Button
                onClick={() => {
                  setSelectedStudent(null)
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="mr-2 size-4" />
                Nouvel étudiant
              </Button>
            }
          />

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Chargement...</div>
            </div>
          ) : (
            <StudentTable
              students={students}
              onEdit={(student) => {
                setSelectedStudent(student)
                setIsDialogOpen(true)
              }}
              onDelete={(student) => {
                setStudentToDelete(student)
                setIsDeleteDialogOpen(true)
              }}
              onView={(student) => {
                setSelectedStudent(student)
                setIsDialogOpen(true)
              }}
            />
          )}

          <StudentDialog
            student={selectedStudent}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSave={handleSave}
          />

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer l'étudiant{" "}
                  <span className="font-semibold">
                    {studentToDelete?.firstName} {studentToDelete?.lastName}
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
