"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video } from "lucide-react"

export default function AppointmentsPage() {
  // This will be replaced with actual data from your backend
  const appointments = [
    {
      id: 1,
      title: "Career Counseling Session",
      counselor: "Dr. Sarah Johnson",
      date: "2024-03-28",
      time: "10:00 AM",
      status: "upcoming",
      type: "video",
    },
    {
      id: 2,
      title: "Study Abroad Consultation",
      counselor: "Mr. David Lee",
      date: "2024-03-25",
      time: "2:30 PM",
      status: "completed",
      type: "video",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Appointments</h1>
        <p className="text-gray-400">Track your upcoming and past appointments</p>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">
          Book New Appointment
        </Button>
      </div>

      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="bg-zinc-900 border-yellow-900/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{appointment.title}</CardTitle>
                    <Badge
                      variant={appointment.status === "upcoming" ? "default" : "secondary"}
                      className={appointment.status === "upcoming" ? "bg-[#CE8C2C]" : ""}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">
                    with {appointment.counselor}
                  </CardDescription>
                </div>
                {appointment.status === "upcoming" && (
                  <Button
                    variant="outline"
                    className="border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10"
                  >
                    Join Meeting
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#CE8C2C]" />
                  <div className="text-sm">
                    <p className="text-gray-400">Date</p>
                    <p>{new Date(appointment.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#CE8C2C]" />
                  <div className="text-sm">
                    <p className="text-gray-400">Time</p>
                    <p>{appointment.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-[#CE8C2C]" />
                  <div className="text-sm">
                    <p className="text-gray-400">Type</p>
                    <p className="capitalize">{appointment.type}</p>
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