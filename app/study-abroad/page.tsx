import Link from "next/link"
import Image from "next/image"
import { GraduationCap, Globe, BookOpen, FileText, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CalButton from "@/components/cal-button"

export default function StudyAbroadPage() {
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
              <span className="text-[#CE8C2C]">Study Abroad</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-400">Your gateway to international education</p>
            <p className="text-gray-400 max-w-[800px] mx-auto">
              Discover opportunities to study at prestigious universities around the world. Our comprehensive guidance
              helps you navigate the complex process of studying abroad.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle>Destination Guidance</CardTitle>
                <CardDescription className="text-gray-400">
                  Find the perfect country for your educational journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  We help you choose the right country based on your academic goals, budget, and personal preferences.
                  Our experts provide insights on education systems, living costs, and cultural aspects of various
                  countries.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Explore Destinations
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle>University Selection</CardTitle>
                <CardDescription className="text-gray-400">Choose from top universities worldwide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  We provide detailed information about universities, their rankings, available programs, admission
                  requirements, and scholarship opportunities. Our counselors help you shortlist universities that align
                  with your academic profile and career aspirations.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Find Universities
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle>Exam Preparation</CardTitle>
                <CardDescription className="text-gray-400">
                  Ace standardized tests required for admissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  We offer guidance on preparing for standardized tests like IELTS, TOEFL, GRE, GMAT, and SAT. Our
                  resources include study materials, practice tests, and expert tips to help you achieve your target
                  scores.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Prepare for Exams
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle>Application Assistance</CardTitle>
                <CardDescription className="text-gray-400">Navigate the complex application process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  Our experts guide you through the entire application process, from filling out forms to writing
                  compelling personal statements and securing strong recommendation letters. We ensure your application
                  stands out to admission committees.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Get Application Help
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <Image
                    src="/images/logo.png"
                    alt="Pathshala Logo"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
                <CardTitle>Scholarship Guidance</CardTitle>
                <CardDescription className="text-gray-400">Find financial support for your education</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  We help you identify and apply for scholarships, grants, and financial aid opportunities. Our
                  counselors provide guidance on preparing scholarship applications and meeting eligibility criteria.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Explore Scholarships
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-yellow-900/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle>Visa Counseling</CardTitle>
                <CardDescription className="text-gray-400">
                  Secure your student visa with expert guidance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">
                  We provide comprehensive guidance on student visa requirements, application procedures, documentation,
                  and interview preparation. Our experts ensure you have everything needed for a successful visa
                  application.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Visa Guidance
                </Button>
              </CardFooter>
            </Card>
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
            <h2 className="text-3xl md:text-4xl font-bold">Begin Your International Education Journey</h2>
            <p className="text-gray-400">
              Take the first step towards studying abroad. Our counselors are ready to guide you through every stage of
              the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <CalButton className="bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Book a Free Consultation</CalButton>              
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

