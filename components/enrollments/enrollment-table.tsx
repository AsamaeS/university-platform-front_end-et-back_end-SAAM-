"use client"

import { useState } from "react"
import type { Enrollment } from "@/lib/api/enrollments"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, XCircle, Trash2 } from "lucide-react"

interface EnrollmentTableProps {
  enrollments: Enrollment[]
  onCancel: (enrollment: Enrollment) => void
  onDelete: (enrollment: Enrollment) => void
}

export function EnrollmentTable({ enrollments, onCancel, onDelete }: EnrollmentTableProps) {
  const [search, setSearch] = useState("")

  const filteredEnrollments = enrollments.filter((enrollment) =>
    `${enrollment.studentName} ${enrollment.courseName} ${enrollment.courseCode}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  const getStatusBadge = (status: Enrollment["status"]) => {
    const variants = {
      enrolled: "bg-green-500/10 text-green-700 dark:text-green-400",
      pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      cancelled: "bg-red-500/10 text-red-700 dark:text-red-400",
      completed: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    }
    const labels = {
      enrolled: "Inscrit",
      pending: "En attente",
      cancelled: "Annulé",
      completed: "Terminé",
    }
    return (
      <Badge variant="secondary" className={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher une inscription..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Étudiant</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cours</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  Aucune inscription trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                  <TableCell>{enrollment.studentEmail}</TableCell>
                  <TableCell>{enrollment.courseName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {enrollment.courseCode}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(enrollment.enrollmentDate).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Ouvrir le menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {enrollment.status === "enrolled" && (
                          <DropdownMenuItem onClick={() => onCancel(enrollment)}>
                            <XCircle className="mr-2 size-4" />
                            Annuler l'inscription
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => onDelete(enrollment)} className="text-destructive">
                          <Trash2 className="mr-2 size-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
