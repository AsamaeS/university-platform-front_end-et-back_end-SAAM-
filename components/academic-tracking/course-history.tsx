import type { CourseRecord } from "@/lib/api/academic-tracking"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface CourseHistoryProps {
  courses: CourseRecord[]
}

export function CourseHistory({ courses }: CourseHistoryProps) {
  const getStatusBadge = (status: CourseRecord["status"]) => {
    const variants = {
      "in-progress": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      completed: "bg-green-500/10 text-green-700 dark:text-green-400",
      failed: "bg-red-500/10 text-red-700 dark:text-red-400",
    }
    const labels = {
      "in-progress": "En cours",
      completed: "Terminé",
      failed: "Échoué",
    }
    return (
      <Badge variant="secondary" className={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return "text-green-600 dark:text-green-400"
    if (grade >= 12) return "text-blue-600 dark:text-blue-400"
    if (grade >= 10) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des cours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Cours</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Crédits</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Lettre</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Aucun cours enregistré
                  </TableCell>
                </TableRow>
              ) : (
                courses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">
                        {course.courseCode}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{course.courseName}</TableCell>
                    <TableCell className="text-sm">
                      {course.semester} {course.year}
                    </TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${getGradeColor(course.grade)}`}>{course.grade.toFixed(1)}/20</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.letterGrade}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(course.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
