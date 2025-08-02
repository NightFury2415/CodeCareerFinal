import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Shield, User, Palette, Globe, Trash2 } from "lucide-react"

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <h1 className="text-xl font-semibold text-white">Settings</h1>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
                <TabsTrigger value="profile" className="text-gray-300 data-[state=active]:text-white">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-gray-300 data-[state=active]:text-white">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="text-gray-300 data-[state=active]:text-white">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="appearance" className="text-gray-300 data-[state=active]:text-white">
                  <Palette className="w-4 h-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="account" className="text-gray-300 data-[state=active]:text-white">
                  <Globe className="w-4 h-4 mr-2" />
                  Account
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your personal information and profile details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button className="bg-purple-600 hover:bg-purple-700">Change Photo</Button>
                        <p className="text-sm text-gray-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-300">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          defaultValue="John"
                          className="bg-slate-700 border-slate-600 text-white mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-300">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          defaultValue="Doe"
                          className="bg-slate-700 border-slate-600 text-white mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john@example.com"
                        className="bg-slate-700 border-slate-600 text-white mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-gray-300">
                        Bio
                      </Label>
                      <Input
                        id="bio"
                        placeholder="Tell us about yourself..."
                        className="bg-slate-700 border-slate-600 text-white mt-2"
                      />
                    </div>

                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Notification Preferences</CardTitle>
                    <CardDescription className="text-gray-400">
                      Choose what notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-400">Receive notifications via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Job Alerts</h3>
                        <p className="text-sm text-gray-400">Get notified about new job opportunities</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Interview Reminders</h3>
                        <p className="text-sm text-gray-400">Reminders for upcoming mock interviews</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Community Updates</h3>
                        <p className="text-sm text-gray-400">Updates from community discussions</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Marketing Emails</h3>
                        <p className="text-sm text-gray-400">Product updates and tips</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Privacy Settings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Control your privacy and data sharing preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Profile Visibility</h3>
                        <p className="text-sm text-gray-400">Make your profile visible to other users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Show Progress</h3>
                        <p className="text-sm text-gray-400">Display your coding progress publicly</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Analytics</h3>
                        <p className="text-sm text-gray-400">Help improve our platform with usage data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div>
                      <Label className="text-gray-300">Data Export</Label>
                      <p className="text-sm text-gray-400 mb-4">Download all your data</p>
                      <Button
                        variant="outline"
                        className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                      >
                        Export Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Appearance</CardTitle>
                    <CardDescription className="text-gray-400">
                      Customize how the platform looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-gray-300">Theme</Label>
                      <Select defaultValue="dark">
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-300">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-300">Timezone</Label>
                      <Select defaultValue="pst">
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="pst">Pacific Standard Time</SelectItem>
                          <SelectItem value="est">Eastern Standard Time</SelectItem>
                          <SelectItem value="cst">Central Standard Time</SelectItem>
                          <SelectItem value="mst">Mountain Standard Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Account Management</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your account settings and subscription
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium mb-2">Change Password</h3>
                      <div className="space-y-4">
                        <Input
                          type="password"
                          placeholder="Current password"
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                        <Input
                          type="password"
                          placeholder="New password"
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                        <Button className="bg-purple-600 hover:bg-purple-700">Update Password</Button>
                      </div>
                    </div>

                    <div className="border-t border-slate-700 pt-6">
                      <h3 className="text-white font-medium mb-2">Danger Zone</h3>
                      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                        <h4 className="text-red-400 font-medium mb-2">Delete Account</h4>
                        <p className="text-sm text-gray-400 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button
                          variant="outline"
                          className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
