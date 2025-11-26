import { Sidebar } from "@/components/sidebar"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function StudentDashboardPage() {
  const studentStats = [
    { label: "Cours inscrits", value: "6", icon: BookOpen },
    { label: "Cours terminés", value: "12", icon: Award },
    { label: "Moyenne GPA", value: "3.65", icon: TrendingUp },
    { label: "Prochains examens", value: "3", icon: Calendar },
  ]

  const enrolledCourses = [
    { id: 1, name: "Intelligence Artificielle", teacher: "Prof. Durand", schedule: "Lun-Mer 10:00", progress: 65 },
    { id: 2, name: "Service Oriented Architecture", teacher: "Hatim GUERMAH", schedule: "Mar-Jeu 14:00", progress: 45 },
    { id: 3, name: "Base de données avancées", teacher: "Prof. Moreau", schedule: "Mer-Ven 09:00", progress: 78 },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          <PageHeader title="Espace Étudiant" description="Bienvenue dans votre espace personnel" />

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {studentStats.map((stat) => (
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

          {/* Enrolled Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Mes Cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between border-b border-border last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.teacher}</p>
                      <p className="text-xs text-muted-foreground">{course.schedule}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{course.progress}%</div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/courses/${course.id}`}>Voir</Link>
                      </Button>
                    </div>
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
