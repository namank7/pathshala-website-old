import Link from "next/link"
import Image from "next/image"
import { Calendar, Target, LineChart, Users, Briefcase, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CalButton from "@/components/cal-button"

export default function CareerCounselingPage() {
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
              <span className="text-[#CE8C2C]">Career Counseling</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-400">
              Professional guidance for your career decisions
            </p>
            <p className="text-gray-400 max-w-[800px] mx-auto">
              Our expert career counselors help you identify your strengths, explore career options, and develop a
              roadmap to achieve your professional goals.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle>Career Assessment</CardTitle>
                <CardDescription className="text-gray-400">
                  Discover your strengths and potential career paths
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  Our comprehensive assessments help you understand your interests, skills, values, and personality
                  traits. These insights guide you towards career paths that align with your unique profile.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Take Assessment
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle>One-on-One Counseling</CardTitle>
                <CardDescription className="text-gray-400">
                  Personalized guidance from expert counselors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  Our experienced counselors provide personalized guidance based on your assessment results, academic
                  background, and career aspirations. These sessions help you gain clarity and make informed decisions
                  about your career path.
                </p>
              </CardContent>
              <CardFooter>
                <CalButton variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Book a Session
                </CalButton>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle>Career Path Planning</CardTitle>
                <CardDescription className="text-gray-400">
                  Develop a roadmap for your professional journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  We help you create a detailed career plan with short-term and long-term goals, required skills and
                  qualifications, and actionable steps to achieve your objectives. This roadmap serves as your guide to
                  career success.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Create Career Plan
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle>Resume & Interview Prep</CardTitle>
                <CardDescription className="text-gray-400">Stand out to potential employers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  Our experts help you craft compelling resumes and cover letters that highlight your strengths. We also
                  provide interview coaching to help you present yourself confidently and effectively to potential
                  employers.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Improve Your Resume
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle>Networking Strategies</CardTitle>
                <CardDescription className="text-gray-400">Build professional connections that matter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  We provide guidance on building and leveraging professional networks, both online and offline. Learn
                  how to connect with industry professionals, alumni, and mentors who can support your career growth.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Learn Networking
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle>Industry Insights</CardTitle>
                <CardDescription className="text-gray-400">
                  Stay informed about trends and opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  We provide up-to-date information on industry trends, job market demands, and emerging career
                  opportunities. These insights help you make informed decisions and stay ahead in your professional
                  journey.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Explore Insights
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Book Your Career Counseling Session</h2>
              <p className="text-gray-400">
                Our expert counselors are ready to help you navigate your career journey. Schedule a one-on-one session
                to discuss your goals, challenges, and aspirations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-[#CE8C2C]/10 p-1 mt-1">
                    <ArrowRight className="h-4 w-4 text-[#CE8C2C]" />
                  </div>
                  <p className="text-gray-400">Personalized guidance tailored to your needs</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-[#CE8C2C]/10 p-1 mt-1">
                    <ArrowRight className="h-4 w-4 text-[#CE8C2C]" />
                  </div>
                  <p className="text-gray-400">Flexible scheduling options - in-person or virtual</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-[#CE8C2C]/10 p-1 mt-1">
                    <ArrowRight className="h-4 w-4 text-[#CE8C2C]" />
                  </div>
                  <p className="text-gray-400">Comprehensive follow-up resources and action plans</p>
                </li>
              </ul>
              <CalButton className="bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Book an Appointment</CalButton>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Career counseling session"
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
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Advance Your Career?</h2>
            <p className="text-gray-400">
              Take the first step towards a fulfilling professional journey. Our career counselors are here to guide
              you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button className="bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Start Career Assessment</Button>
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

