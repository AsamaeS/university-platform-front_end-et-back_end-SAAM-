"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/courses/course-card"
import { CourseDialog } from "@/components/courses/course-dialog"
import { Plus, Search } from "lucide-react"
import { type Course, getCourses, createCourse, updateCourse, deleteCourse } from "@/lib/api/courses"
import { type Teacher, getTeachers } from "@/lib/api/teachers"
import { Input } from "@/components/ui/input"
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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [coursesData, teachersData] = await Promise.all([getCourses(), getTeachers()])
      setCourses(coursesData)
      setTeachers(teachersData)
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

  const filteredCourses = courses.filter((course) =>
    `${course.code} ${course.name} ${course.teacherName} ${course.department}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  const handleSave = async (course: Omit<Course, "id" | "enrolled"> | Course) => {
    try {
      if ("id" in course) {
        await updateCourse(course.id, course)
        toast({
          title: "Succès",
          description: "Le cours a été modifié avec succès",
        })
      } else {
        await createCourse(course)
        toast({
          title: "Succès",
          description: "Le cours a été ajouté avec succès",
        })
      }
      loadData()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!courseToDelete) return
    try {
      await deleteCourse(courseToDelete.id)
      toast({
        title: "Succès",
        description: "Le cours a été supprimé avec succès",
      })
      loadData()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le cours",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setCourseToDelete(null)
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          <PageHeader
            title="Gestion des cours"
            description="Créez et gérez les cours disponibles"
            action={
              <Button
                onClick={() => {
                  setSelectedCourse(null)
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="mr-2 size-4" />
                Nouveau cours
              </Button>
            }
          />

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un cours..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Chargement...</div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Aucun cours trouvé</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEdit={(course) => {
                    setSelectedCourse(course)
                    setIsDialogOpen(true)
                  }}
                  onDelete={(course) => {
                    setCourseToDelete(course)
                    setIsDeleteDialogOpen(true)
                  }}
                />
              ))}
            </div>
          )}

          <CourseDialog
            course={selectedCourse}
            teachers={teachers}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSave={handleSave}
          />

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer le cours{" "}
                  <span className="font-semibold">{courseToDelete?.name}</span>? Cette action est irréversible.
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
