import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Search, Code, Trophy, FileText, Brain, Target, Users, Settings, BookOpen, Briefcase } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Job Search",
    url: "/dashboard/jobs",
    icon: Search,
  },
  {
    title: "Coding Problems",
    url: "/dashboard/problems",
    icon: Code,
  },
  {
    title: "Mock Interviews",
    url: "/dashboard/mock-interviews",
    icon: Brain,
  },
  {
    title: "Resume Builder",
    url: "/dashboard/resume",
    icon: FileText,
  },
  {
    title: "Leaderboard",
    url: "/dashboard/leaderboard",
    icon: Trophy,
  },
]

const resourceItems = [
  {
    title: "Interview Guides",
    url: "/interview-guides",
    icon: BookOpen,
  },
  {
    title: "Big 6 Companies",
    url: "/dashboard/big-6",
    icon: Target,
  },
  {
    title: "Career Paths",
    url: "/dashboard/careers",
    icon: Briefcase,
  },
  {
    title: "Community",
    url: "/dashboard/community",
    icon: Users,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-slate-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">CodeCareer</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-gray-300 hover:text-white hover:bg-slate-800">
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-gray-300 hover:text-white hover:bg-slate-800">
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-gray-300 hover:text-white hover:bg-slate-800">
              <Link href="/dashboard/profile" className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-gray-400 truncate">john@example.com</p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-gray-300 hover:text-white hover:bg-slate-800">
              <Link href="/dashboard/settings">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
