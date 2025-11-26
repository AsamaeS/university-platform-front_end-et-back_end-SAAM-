"use client"

import { useState } from "react"
import type { Student } from "@/lib/api/students"
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
import { MoreHorizontal, Search, Pencil, Trash2, Eye } from "lucide-react"

interface StudentTableProps {
  students: Student[]
  onEdit: (student: Student) => void
  onDelete: (student: Student) => void
  onView: (student: Student) => void
}

export function StudentTable({ students, onEdit, onDelete, onView }: StudentTableProps) {
  const [search, setSearch] = useState("")

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName} ${student.email} ${student.major}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  const getStatusBadge = (status: Student["status"]) => {
    const variants = {
      active: "bg-green-500/10 text-green-700 dark:text-green-400",
      inactive: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      graduated: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    }
    const labels = {
      active: "Actif",
      inactive: "Inactif",
      graduated: "Diplômé",
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
            placeholder="Rechercher un étudiant..."
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
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Filière</TableHead>
              <TableHead>Année</TableHead>
              <TableHead>GPA</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  Aucun étudiant trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.major}</TableCell>
                  <TableCell>Année {student.year}</TableCell>
                  <TableCell>{student.gpa.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
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
                        <DropdownMenuItem onClick={() => onView(student)}>
                          <Eye className="mr-2 size-4" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(student)}>
                          <Pencil className="mr-2 size-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(student)} className="text-destructive">
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
