'use client'

import Link from "next/link"
import Image from "next/image"
import { MapPin, GraduationCap, Video, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CalButton from "@/components/cal-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/black-bricks-background.jpg"
            alt="Black brick texture background"
            width={1920}
            height={1080}
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                <span className="text-[#CE8C2C]">Pathshala</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-400">Follow your calling!</p>
              <p className="text-gray-400 max-w-[600px]">Learning made simple !</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Explore Services</Button>
                <CalButton variant="outline" className="border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                  Book a Consultation
                </CalButton>
              </div>
            </div>
            <div className="relative aspect-square w-[300px] md:w-[400px] lg:w-[500px] mx-auto rounded-lg overflow-hidden">
              <Image
                src="/images/collage.png"
                alt="Services"
                width={800}
                height={800}
                className="object-cover w-full h-full"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-400 max-w-[800px] mx-auto">
              Comprehensive education counseling services to help you navigate your academic journey and career path.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Study Abroad */}
            <Card
              className="bg-zinc-900 border-yellow-900/20 hover:border-[#CE8C2C]/50 transition-colors"
              id="study-abroad"
            >
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
                <CardTitle className="text-xl">Study Abroad</CardTitle>
                <CardDescription className="text-gray-400">
                  Everything you need to know about international education
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">• College & university selection</p>
                <p className="text-sm text-gray-400">• Exam preparation guidance</p>
                <p className="text-sm text-gray-400">• Application assistance</p>
                <p className="text-sm text-gray-400">• Visa counseling</p>
              </CardContent>
              <CardFooter>
                <Link href="/study-abroad" className="text-[#CE8C2C] text-sm flex items-center hover:underline">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Career Counseling */}
            <Card
              className="bg-zinc-900 border-yellow-900/20 hover:border-[#CE8C2C]/50 transition-colors"
              id="career-counseling"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle className="text-xl">Career Counseling</CardTitle>
                <CardDescription className="text-gray-400">
                  Professional guidance for your career decisions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">• Personalized career assessment</p>
                <p className="text-sm text-gray-400">• One-on-one counseling sessions</p>
                <p className="text-sm text-gray-400">• Career path planning</p>
                <p className="text-sm text-gray-400">• Industry insights</p>
              </CardContent>
              <CardFooter>
                <Link href="/career-counseling" className="text-[#CE8C2C] text-sm flex items-center hover:underline">
                  Book appointment <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Coaching Connect */}
            <Card
              className="bg-zinc-900 border-yellow-900/20 hover:border-[#CE8C2C]/50 transition-colors"
              id="coaching-connect"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle className="text-xl">Coaching Connect</CardTitle>
                <CardDescription className="text-gray-400">Find the best coaches near your location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">• Location-based coach search</p>
                <p className="text-sm text-gray-400">• Verified coaching centers</p>
                <p className="text-sm text-gray-400">• Reviews and ratings</p>
                <p className="text-sm text-gray-400">• Direct contact options</p>
              </CardContent>
              <CardFooter>
                <Link href="/coaching-connect" className="text-[#CE8C2C] text-sm flex items-center hover:underline">
                  Find coaches <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* E-Learning */}
            <Card
              className="bg-zinc-900 border-yellow-900/20 hover:border-[#CE8C2C]/50 transition-colors"
              id="e-learning"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-[#CE8C2C]" />
                </div>
                <CardTitle className="text-xl">E-Learning</CardTitle>
                <CardDescription className="text-gray-400">Online tutorials on various topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-400">• Self-paced learning modules</p>
                <p className="text-sm text-gray-400">• Expert-created content</p>
                <p className="text-sm text-gray-400">• Interactive assessments</p>
                <p className="text-sm text-gray-400">• Certificate programs</p>
              </CardContent>
              <CardFooter>
                <Link href="/e-learning" className="text-[#CE8C2C] text-sm flex items-center hover:underline">
                  Start learning <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="relative aspect-square w-[300px] md:w-[400px] lg:w-[500px] mx-auto rounded-lg overflow-hidden">
              <Image
                src="/images/collage.png"
                alt="Why Choose Pathshala?"
                width={800}
                height={800}
                className="object-cover w-full h-full"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose Pathshala?</h2>
              <p className="text-gray-400">
                With years of experience in education counseling, we've helped thousands of students achieve their
                academic and career goals.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#CE8C2C] font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Expert Counselors</h3>
                    <p className="text-sm text-gray-400">
                      Our team consists of experienced education and career counselors.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#CE8C2C] font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Personalized Approach</h3>
                    <p className="text-sm text-gray-400">
                      We tailor our guidance to your unique needs and aspirations.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#CE8C2C]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#CE8C2C] font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Comprehensive Resources</h3>
                    <p className="text-sm text-gray-400">Access to a wide range of educational resources and tools.</p>
                  </div>
                </div>
              </div>
              <Button className="bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Learn More About Us</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-zinc-950">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-gray-400 max-w-[800px] mx-auto">
              Hear from students who have successfully navigated their educational journey with our guidance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-zinc-900 border-yellow-900/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden">
                      <Image
                        src={`/images/student-${i}.png`}
                        alt={`Student ${i}`}
                        width={48}
                        height={48}
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">Student Name</h4>
                      <p className="text-sm text-gray-400">University of Example</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    "Pathshala helped me navigate the complex process of applying to universities abroad. Their
                    counselors were knowledgeable and supportive throughout my journey."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/black-bricks-background.jpg"
            alt="Black brick texture background"
            width={1920}
            height={1080}
            className="object-cover"
            priority
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-[800px] mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Follow Your Calling?</h2>
            <p className="text-gray-400">
              Take the first step towards your educational and career goals. Our counselors are ready to guide you on
              your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <CalButton className="bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Book a Free Consultation</CalButton>
              <Button variant="outline" className="border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
                Explore Resources
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

