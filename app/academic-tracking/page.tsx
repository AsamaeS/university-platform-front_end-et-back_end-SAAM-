"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { PageHeader } from "@/components/page-header"
import { StudentSelector } from "@/components/academic-tracking/student-selector"
import { AcademicSummary } from "@/components/academic-tracking/academic-summary"
import { CourseHistory } from "@/components/academic-tracking/course-history"
import { Certificates } from "@/components/academic-tracking/certificates"
import { type Student, getStudents } from "@/lib/api/students"
import { type AcademicRecord, getAcademicRecord } from "@/lib/api/academic-tracking"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function AcademicTrackingPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudentId, setSelectedStudentId] = useState("")
  const [academicRecord, setAcademicRecord] = useState<AcademicRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadStudents()
  }, [])

  useEffect(() => {
    if (selectedStudentId) {
      loadAcademicRecord(selectedStudentId)
    }
  }, [selectedStudentId])

  const loadStudents = async () => {
    setIsLoading(true)
    try {
      const data = await getStudents()
      setStudents(data.filter((s) => s.status === "active"))
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

  const loadAcademicRecord = async (studentId: string) => {
    setIsLoading(true)
    try {
      const record = await getAcademicRecord(studentId)
      setAcademicRecord(record)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger le dossier académique",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          <PageHeader
            title="Suivi académique"
            description="Consultez l'historique des cours, les notes et les attestations des étudiants"
          />

          <div className="space-y-6">
            <StudentSelector
              students={students}
              selectedStudentId={selectedStudentId}
              onSelect={setSelectedStudentId}
            />

            {!selectedStudentId ? (
              <Alert>
                <Info className="size-4" />
                <AlertDescription>Sélectionnez un étudiant pour voir son dossier académique complet.</AlertDescription>
              </Alert>
            ) : isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-muted-foreground">Chargement...</div>
              </div>
            ) : !academicRecord ? (
              <Alert>
                <Info className="size-4" />
                <AlertDescription>Aucun dossier académique disponible pour cet étudiant.</AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
                      {academicRecord.studentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{academicRecord.studentName}</h2>
                      <p className="text-muted-foreground">
                        {academicRecord.major} - Année {academicRecord.year}
                      </p>
                    </div>
                  </div>
                </div>

                <AcademicSummary record={academicRecord} />

                <CourseHistory courses={academicRecord.courses} />

                <Certificates certificates={academicRecord.certificates} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
