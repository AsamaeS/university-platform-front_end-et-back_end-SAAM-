"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { EnrollmentTable } from "@/components/enrollments/enrollment-table"
import { EnrollmentDialog } from "@/components/enrollments/enrollment-dialog"
import { Plus } from "lucide-react"
import {
  type Enrollment,
  getEnrollments,
  createEnrollment,
  cancelEnrollment,
  deleteEnrollment,
} from "@/lib/api/enrollments"
import { type Student, getStudents } from "@/lib/api/students"
import { type Course, getCourses } from "@/lib/api/courses"
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

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [enrollmentToDelete, setEnrollmentToDelete] = useState<Enrollment | null>(null)
  const [enrollmentToCancel, setEnrollmentToCancel] = useState<Enrollment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [enrollmentsData, studentsData, coursesData] = await Promise.all([
        getEnrollments(),
        getStudents(),
        getCourses(),
      ])
      setEnrollments(enrollmentsData)
      setStudents(studentsData.filter((s) => s.status === "active"))
      setCourses(coursesData.filter((c) => c.status === "active"))
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (enrollment: Omit<Enrollment, "id">) => {
    try {
      await createEnrollment(enrollment)
      toast({
        title: "Succès",
        description: "L'inscription a été créée avec succès",
      })
      loadData()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const handleCancel = async () => {
    if (!enrollmentToCancel) return
    try {
      await cancelEnrollment(enrollmentToCancel.id)
      toast({
        title: "Succès",
        description: "L'inscription a été annulée avec succès",
      })
      loadData()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'annuler l'inscription",
        variant: "destructive",
      })
    } finally {
      setIsCancelDialogOpen(false)
      setEnrollmentToCancel(null)
    }
  }

  const handleDelete = async () => {
    if (!enrollmentToDelete) return
    try {
      await deleteEnrollment(enrollmentToDelete.id)
      toast({
        title: "Succès",
        description: "L'inscription a été supprimée avec succès",
      })
      loadData()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'inscription",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setEnrollmentToDelete(null)
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          <PageHeader
            title="Gestion des inscriptions"
            description="Inscrivez les étudiants aux cours disponibles"
            action={
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 size-4" />
                Nouvelle inscription
              </Button>
            }
          />

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Chargement...</div>
            </div>
          ) : (
            <EnrollmentTable
              enrollments={enrollments}
              onCancel={(enrollment) => {
                setEnrollmentToCancel(enrollment)
                setIsCancelDialogOpen(true)
              }}
              onDelete={(enrollment) => {
                setEnrollmentToDelete(enrollment)
                setIsDeleteDialogOpen(true)
              }}
            />
          )}

          <EnrollmentDialog
            students={students}
            courses={courses}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSave={handleSave}
          />

          <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Annuler l'inscription</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir annuler l'inscription de{" "}
                  <span className="font-semibold">{enrollmentToCancel?.studentName}</span> au cours{" "}
                  <span className="font-semibold">{enrollmentToCancel?.courseName}</span> ?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancel}>Confirmer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer définitivement cette inscription ? Cette action est irréversible.
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
