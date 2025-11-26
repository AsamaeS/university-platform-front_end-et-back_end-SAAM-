"use client"

import { useState } from "react"
import type { Teacher } from "@/lib/api/teachers"
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

interface TeacherTableProps {
  teachers: Teacher[]
  onEdit: (teacher: Teacher) => void
  onDelete: (teacher: Teacher) => void
  onView: (teacher: Teacher) => void
}

export function TeacherTable({ teachers, onEdit, onDelete, onView }: TeacherTableProps) {
  const [search, setSearch] = useState("")

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.firstName} ${teacher.lastName} ${teacher.email} ${teacher.department} ${teacher.specialization}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  const getStatusBadge = (status: Teacher["status"]) => {
    const variants = {
      active: "bg-green-500/10 text-green-700 dark:text-green-400",
      "on-leave": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      retired: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
    }
    const labels = {
      active: "Actif",
      "on-leave": "En congé",
      retired: "Retraité",
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
            placeholder="Rechercher un enseignant..."
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
              <TableHead>Département</TableHead>
              <TableHead>Spécialisation</TableHead>
              <TableHead>Horaires bureau</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  Aucun enseignant trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">
                    {teacher.firstName} {teacher.lastName}
                  </TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.department}</TableCell>
                  <TableCell>{teacher.specialization}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{teacher.officeHours}</TableCell>
                  <TableCell>{getStatusBadge(teacher.status)}</TableCell>
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
                        <DropdownMenuItem onClick={() => onView(teacher)}>
                          <Eye className="mr-2 size-4" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(teacher)}>
                          <Pencil className="mr-2 size-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(teacher)} className="text-destructive">
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
