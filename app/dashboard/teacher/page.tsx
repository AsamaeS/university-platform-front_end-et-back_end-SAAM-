import { Sidebar } from "@/components/sidebar"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, FileText, Calendar } from "lucide-react"
import Link from "next/link"

export default function TeacherDashboardPage() {
  const teacherStats = [
    { label: "Cours enseignés", value: "4", icon: BookOpen },
    { label: "Total étudiants", value: "156", icon: Users },
    { label: "Devoirs à corriger", value: "23", icon: FileText },
    { label: "Cours cette semaine", value: "8", icon: Calendar },
  ]

  const teachingCourses = [
    { id: 1, name: "Service Oriented Architecture", students: 45, schedule: "Mar-Jeu 14:00", room: "B201" },
    { id: 2, name: "Web Services", students: 38, schedule: "Lun-Mer 10:00", room: "A105" },
    { id: 3, name: "Cloud Computing", students: 42, schedule: "Mer-Ven 16:00", room: "C301" },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          <PageHeader title="Espace Enseignant" description="Gérez vos cours et suivez vos étudiants" />

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {teacherStats.map((stat) => (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <stat.icon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Teaching Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Mes Cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teachingCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between border-b border-border last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.students} étudiants • Salle {course.room}
                      </p>
                      <p className="text-xs text-muted-foreground">{course.schedule}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/courses/${course.id}`}>Gérer</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
