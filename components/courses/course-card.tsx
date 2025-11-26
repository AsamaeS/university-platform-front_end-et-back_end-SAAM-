"use client"

import type { Course } from "@/lib/api/courses"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Clock, Users, BookOpen, Pencil, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface CourseCardProps {
  course: Course
  onEdit: (course: Course) => void
  onDelete: (course: Course) => void
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  const enrollmentPercentage = (course.enrolled / course.capacity) * 100

  const getStatusBadge = (status: Course["status"]) => {
    const variants = {
      active: "bg-green-500/10 text-green-700 dark:text-green-400",
      archived: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
      draft: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    }
    const labels = {
      active: "Actif",
      archived: "Archivé",
      draft: "Brouillon",
    }
    return (
      <Badge variant="secondary" className={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="font-mono text-xs">
                {course.code}
              </Badge>
              {getStatusBadge(course.status)}
            </div>
            <CardTitle className="text-lg truncate">{course.name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">{course.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 ml-2">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(course)}>
                <Pencil className="mr-2 size-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(course)} className="text-destructive">
                <Trash2 className="mr-2 size-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="size-4" />
            <span>{course.credits} crédits</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>
              {course.semester} {course.year}
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="size-4" />
              <span>Inscriptions</span>
            </div>
            <span className="font-medium">
              {course.enrolled} / {course.capacity}
            </span>
          </div>
          <Progress value={enrollmentPercentage} className="h-2" />
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            Enseignant: <span className="font-medium text-foreground">{course.teacherName}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">{course.schedule}</p>
        </div>
      </CardContent>
    </Card>
  )
}
