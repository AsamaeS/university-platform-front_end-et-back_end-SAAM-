"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading notifications
    setNotifications([
      {
        id: 1,
        type: "EMAIL",
        title: "Confirmation d'inscription",
        message: "Votre inscription au cours 'Introduction à React' a été confirmée.",
        sender: "Système Universitaire",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: "ENVOYE",
        category: "CONFIRMATION_INSCRIPTION",
      },
      {
        id: 2,
        type: "EMAIL",
        title: "Rappel d'échéance",
        message: "Deadline pour le projet final du cours 'TypeScript Avancé' - Demain à 23:59",
        sender: "Système Universitaire",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: "ENVOYE",
        category: "RAPPEL_ECHEANCE",
      },
      {
        id: 3,
        type: "SMS",
        title: "Changement d'horaire",
        message: "Le cours 'Python Avancé' a changé d'horaire: 14:00-16:00 (salle 301)",
        sender: "Système Universitaire",
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
        status: "ENVOYE",
        category: "CHANGEMENT_HORAIRE",
      },
      {
        id: 4,
        type: "EMAIL",
        title: "Publication des résultats",
        message: "Vos résultats pour le cours 'Algorithmique' sont maintenant disponibles.",
        sender: "Système Universitaire",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: "ENVOYE",
        category: "CONFIRMATION_INSCRIPTION",
      },
      {
        id: 5,
        type: "EMAIL",
        title: "Certificat d'attestation",
        message: "Votre attestation de réussite pour 'Web Development' est prête.",
        sender: "Système Universitaire",
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        status: "ECHEC",
        category: "ATTESTATION",
      },
    ])
    setLoading(false)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ENVOYE":
        return <Badge className="bg-green-500">Envoyé</Badge>
      case "EN_ATTENTE":
        return <Badge className="bg-yellow-500">En attente</Badge>
      case "ECHEC":
        return <Badge className="bg-red-500">Échec</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "EMAIL":
        return <Mail className="w-5 h-5" />
      case "SMS":
        return <MessageSquare className="w-5 h-5" />
      default:
        return <Mail className="w-5 h-5" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) {
      const mins = Math.floor(diff / (1000 * 60))
      return `Il y a ${mins} minute${mins > 1 ? "s" : ""}`
    } else if (hours < 24) {
      return `Il y a ${hours} heure${hours > 1 ? "s" : ""}`
    } else if (days < 7) {
      return `Il y a ${days} jour${days > 1 ? "s" : ""}`
    } else {
      return date.toLocaleDateString("fr-FR")
    }
  }

  return (
    <main className="md:pl-64">
      <div className="space-y-8">
        <PageHeader
          title="Notifications"
          description="Gestion et suivi de toutes les notifications du système universitaire"
        />

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Tous ({notifications.length})</TabsTrigger>
            <TabsTrigger value="envoye">
              Envoyés ({notifications.filter((n) => n.status === "ENVOYE").length})
            </TabsTrigger>
            <TabsTrigger value="email">Emails ({notifications.filter((n) => n.type === "EMAIL").length})</TabsTrigger>
            <TabsTrigger value="sms">SMS ({notifications.filter((n) => n.type === "SMS").length})</TabsTrigger>
          </TabsList>

          {/* All Notifications */}
          <TabsContent value="all" className="space-y-4">
            {notifications.map((notif) => (
              <Card key={notif.id} className="hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        {getTypeIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{notif.title}</h4>
                          {getStatusBadge(notif.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notif.sender} • {formatTime(notif.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Sent Notifications */}
          <TabsContent value="envoye" className="space-y-4">
            {notifications
              .filter((n) => n.status === "ENVOYE")
              .map((notif) => (
                <Card key={notif.id} className="hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold">{notif.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notif.sender} • {formatTime(notif.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>

          {/* Emails */}
          <TabsContent value="email" className="space-y-4">
            {notifications
              .filter((n) => n.type === "EMAIL")
              .map((notif) => (
                <Card key={notif.id} className="hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{notif.title}</h4>
                          {getStatusBadge(notif.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notif.sender} • {formatTime(notif.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>

          {/* SMS */}
          <TabsContent value="sms" className="space-y-4">
            {notifications
              .filter((n) => n.type === "SMS")
              .map((notif) => (
                <Card key={notif.id} className="hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <MessageSquare className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{notif.title}</h4>
                          {getStatusBadge(notif.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notif.sender} • {formatTime(notif.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>
        </Tabs>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total envoyé</p>
                  <p className="text-3xl font-bold">{notifications.filter((n) => n.status === "ENVOYE").length}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En attente</p>
                  <p className="text-3xl font-bold">{notifications.filter((n) => n.status === "EN_ATTENTE").length}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Échecs</p>
                  <p className="text-3xl font-bold">{notifications.filter((n) => n.status === "ECHEC").length}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
