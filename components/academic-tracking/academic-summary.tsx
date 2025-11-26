import type { AcademicRecord } from "@/lib/api/academic-tracking"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award, BookOpen, TrendingUp } from "lucide-react"

interface AcademicSummaryProps {
  record: AcademicRecord
}

export function AcademicSummary({ record }: AcademicSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">GPA Moyen</CardTitle>
          <TrendingUp className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{record.gpa.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">Sur 4.0</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Crédits totaux</CardTitle>
          <BookOpen className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{record.totalCredits}</div>
          <p className="text-xs text-muted-foreground mt-1">Crédits accumulés</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Cours suivis</CardTitle>
          <GraduationCap className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{record.courses.length}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {record.courses.filter((c) => c.status === "completed").length} terminés
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Attestations</CardTitle>
          <Award className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{record.certificates.length}</div>
          <p className="text-xs text-muted-foreground mt-1">Certificats obtenus</p>
        </CardContent>
      </Card>
    </div>
  )
}
