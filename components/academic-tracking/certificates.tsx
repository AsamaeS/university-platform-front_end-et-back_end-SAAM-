import type { Certificate } from "@/lib/api/academic-tracking"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Download } from "lucide-react"

interface CertificatesProps {
  certificates: Certificate[]
}

export function Certificates({ certificates }: CertificatesProps) {
  const getTypeBadge = (type: Certificate["type"]) => {
    const variants = {
      completion: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      excellence: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      participation: "bg-green-500/10 text-green-700 dark:text-green-400",
    }
    const labels = {
      completion: "Complétion",
      excellence: "Excellence",
      participation: "Participation",
    }
    return (
      <Badge variant="secondary" className={variants[type]}>
        {labels[type]}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attestations et certificats</CardTitle>
      </CardHeader>
      <CardContent>
        {certificates.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Aucune attestation disponible</div>
        ) : (
          <div className="space-y-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getTypeBadge(cert.type)}
                      <span className="text-sm text-muted-foreground">
                        Délivré le {new Date(cert.issuedDate).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 size-4" />
                  Télécharger
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
