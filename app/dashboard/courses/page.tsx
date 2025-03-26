"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Trophy } from "lucide-react"

export default function CoursesPage() {
  // This will be replaced with actual data from your backend
  const courses = [
    {
      id: 1,
      title: "IELTS Preparation",
      description: "Comprehensive IELTS test preparation course",
      progress: 65,
      totalHours: 40,
      completedHours: 26,
      achievements: 8,
    },
    {
      id: 2,
      title: "Study in Canada",
      description: "Complete guide to studying in Canada",
      progress: 30,
      totalHours: 25,
      completedHours: 7.5,
      achievements: 3,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="text-gray-400">Track your progress and continue learning</p>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="bg-zinc-900 border-yellow-900/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {course.description}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10"
                >
                  Continue Learning
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-[#CE8C2C]">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="bg-zinc-800 [&>[role=progressbar]]:bg-[#CE8C2C]" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#CE8C2C]" />
                    <div className="text-sm">
                      <p className="text-gray-400">Total Hours</p>
                      <p>{course.totalHours}h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#CE8C2C]" />
                    <div className="text-sm">
                      <p className="text-gray-400">Completed</p>
                      <p>{course.completedHours}h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-[#CE8C2C]" />
                    <div className="text-sm">
                      <p className="text-gray-400">Achievements</p>
                      <p>{course.achievements}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 