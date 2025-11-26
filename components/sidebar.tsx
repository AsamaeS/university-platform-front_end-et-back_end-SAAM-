"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList, BarChart3, Menu, X, Bell } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Tableau de bord", href: "/", icon: LayoutDashboard },
  { name: "Étudiants", href: "/students", icon: Users },
  { name: "Enseignants", href: "/teachers", icon: GraduationCap },
  { name: "Cours", href: "/courses", icon: BookOpen },
  { name: "Inscriptions", href: "/enrollments", icon: ClipboardList },
  { name: "Suivi académique", href: "/academic-tracking", icon: BarChart3 },
  { name: "Notifications", href: "/notifications", icon: Bell },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-sidebar-border px-6">
            <GraduationCap className="size-6 text-sidebar-primary" />
            <span className="ml-2 text-lg font-semibold text-sidebar-foreground">UniPlatform</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="size-5 shrink-0" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-sm font-semibold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Admin</p>
                <p className="text-xs text-muted-foreground truncate">admin@university.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}
