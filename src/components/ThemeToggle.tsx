import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-gray-200 dark:border-[#2a3142] hover:bg-gray-100 dark:hover:bg-[#2a3142]">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-gray-600 dark:text-gray-400 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all text-gray-600 dark:text-gray-400 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-[#1e2536] border-gray-200 dark:border-[#2a3142]">
        <DropdownMenuItem 
          onClick={() => setTheme("light")} 
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a3142] cursor-pointer"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")} 
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a3142] cursor-pointer"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a3142] cursor-pointer"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
