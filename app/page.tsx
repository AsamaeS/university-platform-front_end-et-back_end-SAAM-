"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, BookOpen } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary">
          <GraduationCap className="size-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Plateforme Universitaire</h1>
        <p className="text-muted-foreground">Système de gestion académique en ligne</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 w-full max-w-4xl">
        {/* Student Login Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-blue-500">
              <Users className="size-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Étudiants</CardTitle>
            <CardDescription>Accédez à vos cours, notes et informations académiques</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" size="lg">
              <Link href="/login/student">Connexion Étudiant</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Teacher Login Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary">
              <BookOpen className="size-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Enseignants</CardTitle>
            <CardDescription>Gérez vos cours, étudiants et évaluations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" size="lg" variant="secondary">
              <Link href="/login/teacher">Connexion Enseignant</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
