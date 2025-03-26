"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      <Card className="bg-zinc-900 border-yellow-900/20">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription className="text-gray-400">
            Choose what updates you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-400">
                Receive updates about your courses and appointments
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <p className="text-sm text-gray-400">
                Get text messages for important reminders
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Communications</Label>
              <p className="text-sm text-gray-400">
                Receive updates about new courses and offers
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-yellow-900/20">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription className="text-gray-400">
            Customize your learning experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="bg-zinc-800/50">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Time Zone</Label>
            <Select defaultValue="utc">
              <SelectTrigger className="bg-zinc-800/50">
                <SelectValue placeholder="Select Time Zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern Time</SelectItem>
                <SelectItem value="pst">Pacific Time</SelectItem>
                <SelectItem value="ist">India Standard Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-yellow-900/20">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription className="text-gray-400">
            Irreversible account actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  )
} 