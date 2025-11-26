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
import { BookOpen, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TeacherLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
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
        username: email,
        password,
        role: "teacher",
      })

      if (response.success) {
        localStorage.setItem("user_role", "teacher")
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur votre espace enseignant",
        })
        router.push("/dashboard/teacher")
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            Retour
          </Link>
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary">
              <BookOpen className="size-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Connexion Enseignant</CardTitle>
            <CardDescription>Accédez à votre espace enseignant avec votre email professionnel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email professionnel</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom.prenom@universite.ma"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  Email: <span className="font-mono text-foreground">hatim.guermah@university.ma</span>
                </p>
                <p>
                  Mot de passe: <span className="font-mono text-foreground">teacher123</span>
                </p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Voir TEST_CREDENTIALS.md pour plus d'identifiants</p>
            </div>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Mot de passe oublié ? </span>
              <Link href="/forgot-password/teacher" className="text-primary hover:underline">
                Réinitialiser
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
