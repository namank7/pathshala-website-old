"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Clock, Trophy, Video } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()

  // This will be replaced with actual data from your backend
  const overview = {
    coursesEnrolled: 2,
    coursesCompleted: 1,
    upcomingAppointments: 1,
    achievements: 11,
  }

  const nextAppointment = {
    title: "Career Counseling Session",
    counselor: "Dr. Sarah Johnson",
    date: "2024-03-28",
    time: "10:00 AM",
  }

  const latestCourse = {
    title: "IELTS Preparation",
    progress: 65,
    totalHours: 40,
    completedHours: 26,
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name || "Student"}!</h1>
        <p className="text-gray-400">Here's an overview of your learning journey</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-zinc-900 border-yellow-900/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Courses Enrolled</CardDescription>
            <CardTitle className="text-2xl">{overview.coursesEnrolled}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-zinc-900 border-yellow-900/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Courses Completed</CardDescription>
            <CardTitle className="text-2xl">{overview.coursesCompleted}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-zinc-900 border-yellow-900/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Upcoming Appointments</CardDescription>
            <CardTitle className="text-2xl">{overview.upcomingAppointments}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-zinc-900 border-yellow-900/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Achievements</CardDescription>
            <CardTitle className="text-2xl">{overview.achievements}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-zinc-900 border-yellow-900/20">
          <CardHeader>
            <CardTitle>Next Appointment</CardTitle>
            <CardDescription className="text-gray-400">
              Your upcoming counseling session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{nextAppointment.title}</h3>
                <p className="text-sm text-gray-400">with {nextAppointment.counselor}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#CE8C2C]" />
                  <div className="text-sm">
                    <p className="text-gray-400">Date</p>
                    <p>{new Date(nextAppointment.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#CE8C2C]" />
                  <div className="text-sm">
                    <p className="text-gray-400">Time</p>
                    <p>{nextAppointment.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-[#CE8C2C]" />
                  <div className="text-sm">
                    <p className="text-gray-400">Type</p>
                    <p>Video</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10"
              >
                Join Meeting
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-yellow-900/20">
          <CardHeader>
            <CardTitle>Current Course</CardTitle>
            <CardDescription className="text-gray-400">
              Continue where you left off
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{latestCourse.title}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-[#CE8C2C]">{latestCourse.progress}%</span>
                  </div>
                  <Progress value={latestCourse.progress} className="bg-zinc-800 [&>[role=progressbar]]:bg-[#CE8C2C]" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#CE8C2C]" />
                  <div className="text-sm">
                    <p className="text-gray-400">Total Hours</p>
                    <p>{latestCourse.totalHours}h</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#CE8C2C]" />
                  <div className="text-sm">
                    <p className="text-gray-400">Completed</p>
                    <p>{latestCourse.completedHours}h</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#CE8C2C]" />
                  <div className="text-sm">
                    <p className="text-gray-400">Progress</p>
                    <p>{latestCourse.progress}%</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10"
              >
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 