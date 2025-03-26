import Link from "next/link"
import Image from "next/image"
import { Video, BookOpen, Clock, Award, Search, Filter, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ELearningPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/black-bricks-background.jpg"
            alt="Black brick texture background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              <span className="text-[#CE8C2C]">E-Learning</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-400">Learn at your own pace, anytime, anywhere</p>
            <p className="text-gray-400 max-w-[800px] mx-auto">
              Access high-quality online courses and tutorials on a wide range of subjects. Our e-learning platform
              offers interactive content, assessments, and certificates to enhance your learning experience.
            </p>
            <div className="pt-6">
              <div className="relative max-w-md mx-auto">
                <Input
                  placeholder="Search for courses..."
                  className="bg-zinc-800/70 border-yellow-900/20 focus:border-[#CE8C2C] pl-10 py-6"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Button className="absolute right-1 top-1 bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Courses</h2>
            <Button variant="outline" size="sm" className="border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "IELTS Preparation Masterclass", category: "Language" },
              { title: "Advanced Mathematics", category: "Science" },
              { title: "Web Development Fundamentals", category: "Technology" },
              { title: "Critical Thinking & Problem Solving", category: "Skills" },
              { title: "Business Communication", category: "Business" },
              { title: "Digital Marketing Essentials", category: "Marketing" },
            ].map((course, i) => (
              <Card key={i} className="bg-zinc-900 border-yellow-900/20 hover:border-[#CE8C2C]/50 transition-colors">
                <div className="relative h-48 rounded-t-lg overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=300&width=500&text=Course${i + 1}`}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                    <Badge className="bg-[#CE8C2C]/90 text-black hover:bg-[#CE8C2C]">{course.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Learn from industry experts and gain practical skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-400">12 hours</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-400">10 modules</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-400">Video lessons, quizzes & projects</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-400">Certificate upon completion</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Enroll Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" className="border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
              View All Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 bg-zinc-950">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Learning Paths</h2>
          <p className="text-gray-400 max-w-3xl mb-8">
            Our curated learning paths guide you through a series of courses designed to help you master a specific
            skill or prepare for a career.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: "Data Science & Analytics", courses: 5, hours: 40 },
              { title: "English Language Proficiency", courses: 4, hours: 30 },
              { title: "Full-Stack Web Development", courses: 6, hours: 50 },
              { title: "Business Management", courses: 5, hours: 35 },
            ].map((path, i) => (
              <Card key={i} className="bg-zinc-900 border-yellow-900/20">
                <CardHeader>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {path.courses} courses • {path.hours} hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm text-[#CE8C2C]">{i === 0 ? "25%" : "0%"}</span>
                      </div>
                      <Progress
                        value={i === 0 ? 25 : 0}
                        className="h-2 bg-zinc-800"
                        indicatorClassName="bg-[#CE8C2C]"
                      />
                    </div>
                    <p className="text-sm text-gray-400">
                      Master the fundamentals and advanced concepts in {path.title.toLowerCase()} through structured
                      learning.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">
                    {i === 0 ? "Continue Learning" : "Start Learning Path"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose Our E-Learning Platform?</h2>
              <p className="text-gray-400">
                Our platform offers a comprehensive learning experience with features designed to help you succeed in
                your educational journey.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-[#CE8C2C]/10 p-1 mt-1">
                    <ArrowRight className="h-4 w-4 text-[#CE8C2C]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Learn at Your Own Pace</h3>
                    <p className="text-sm text-gray-400">
                      Access courses anytime, anywhere, and progress at a speed that works for you.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-[#CE8C2C]/10 p-1 mt-1">
                    <ArrowRight className="h-4 w-4 text-[#CE8C2C]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Expert Instructors</h3>
                    <p className="text-sm text-gray-400">
                      Learn from industry professionals with real-world experience and expertise.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-[#CE8C2C]/10 p-1 mt-1">
                    <ArrowRight className="h-4 w-4 text-[#CE8C2C]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Interactive Content</h3>
                    <p className="text-sm text-gray-400">
                      Engage with videos, quizzes, assignments, and projects that reinforce learning.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-[#CE8C2C]/10 p-1 mt-1">
                    <ArrowRight className="h-4 w-4 text-[#CE8C2C]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Recognized Certificates</h3>
                    <p className="text-sm text-gray-400">
                      Earn certificates upon course completion to showcase your skills to employers.
                    </p>
                  </div>
                </li>
              </ul>
              <Button className="bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Explore All Features</Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="E-learning platform features"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/black-bricks-background.jpg"
            alt="Black brick texture background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-[800px] mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Start Your Learning Journey Today</h2>
            <p className="text-gray-400">
              Access our library of courses and begin expanding your knowledge and skills. Your educational journey is
              just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button className="bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Browse Courses</Button>
              <Link href="/">
                <Button variant="outline" className="border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

