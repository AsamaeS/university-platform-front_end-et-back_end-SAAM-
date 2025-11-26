"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { login } from "@/lib/api/auth"
import { Users, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function StudentLoginPage() {
  const [studentId, setStudentId] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!studentId || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await login({
        username: studentId,
        password,
        role: "student",
      })

      if (response.success) {
        localStorage.setItem("user_role", "student")
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur votre espace étudiant",
        })
        router.push("/dashboard/student")
      } else {
        toast({
          title: "Erreur de connexion",
          description: response.message || "Identifiants incorrects",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-background to-blue-50 p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            Retour
          </Link>
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-blue-500">
              <Users className="size-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Connexion Étudiant</CardTitle>
            <CardDescription>Accédez à votre espace étudiant avec votre numéro d'étudiant</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Numéro d'étudiant</Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Ex: 2024001"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            <div className="mt-6 rounded-lg bg-muted p-4 text-sm">
              <p className="mb-2 font-semibold text-foreground">Identifiants de test:</p>
              <div className="space-y-1 text-muted-foreground">
                <p>
                  Numéro: <span className="font-mono text-foreground">STU001</span>
                </p>
                <p>
                  Mot de passe: <span className="font-mono text-foreground">password123</span>
                </p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Voir TEST_CREDENTIALS.md pour plus d'identifiants</p>
            </div>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Mot de passe oublié ? </span>
              <Link href="/forgot-password/student" className="text-primary hover:underline">
                Réinitialiser
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
