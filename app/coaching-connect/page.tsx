import Link from "next/link"
import Image from "next/image"
import { MapPin, Search, Star, Filter, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function CoachingConnectPage() {
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
              <span className="text-[#CE8C2C]">Coaching Connect</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-400">Find the best coaches near your location</p>
            <p className="text-gray-400 max-w-[800px] mx-auto">
              Connect with verified coaching centers and tutors in your area. Our platform helps you find the perfect
              educational support based on your needs and location.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-zinc-950">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900 p-6 rounded-lg border border-yellow-900/20">
              <h2 className="text-2xl font-bold mb-6">Find Coaches Near You</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject/Course
                  </label>
                  <Input
                    id="subject"
                    placeholder="e.g., Mathematics, IELTS"
                    className="bg-zinc-800 border-yellow-900/20 focus:border-[#CE8C2C]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <div className="relative">
                    <Input
                      id="location"
                      placeholder="Enter your location"
                      className="bg-zinc-800 border-yellow-900/20 focus:border-[#CE8C2C] pl-10"
                    />
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <p className="text-sm text-gray-400 mr-2">Popular:</p>
                <Badge variant="outline" className="hover:bg-[#CE8C2C]/10 cursor-pointer">
                  Mathematics
                </Badge>
                <Badge variant="outline" className="hover:bg-[#CE8C2C]/10 cursor-pointer">
                  Physics
                </Badge>
                <Badge variant="outline" className="hover:bg-[#CE8C2C]/10 cursor-pointer">
                  IELTS
                </Badge>
                <Badge variant="outline" className="hover:bg-[#CE8C2C]/10 cursor-pointer">
                  SAT
                </Badge>
                <Badge variant="outline" className="hover:bg-[#CE8C2C]/10 cursor-pointer">
                  Programming
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coaches */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Coaching Centers</h2>
            <Button variant="outline" size="sm" className="border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-zinc-900 border-yellow-900/20 hover:border-[#CE8C2C]/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=100&width=100&text=Coach${i}`}
                          alt={`Coaching Center ${i}`}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Excellence Academy {i}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-[#CE8C2C] text-[#CE8C2C]" />
                          <Star className="h-4 w-4 fill-[#CE8C2C] text-[#CE8C2C]" />
                          <Star className="h-4 w-4 fill-[#CE8C2C] text-[#CE8C2C]" />
                          <Star className="h-4 w-4 fill-[#CE8C2C] text-[#CE8C2C]" />
                          <Star className="h-4 w-4 text-gray-500" />
                          <span className="text-xs text-gray-400 ml-1">(42 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-[#CE8C2C]/10 text-[#CE8C2C] hover:bg-[#CE8C2C]/20">
                      {i % 2 === 0 ? "Mathematics" : "Science"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-400">2.{i} km away • Central District</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-400">Mon-Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-400">Small group & individual sessions</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" className="border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10">
              Load More
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Find Coaches on Map</h2>
          <div className="relative h-[500px] rounded-lg overflow-hidden border border-yellow-900/20">
            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="h-12 w-12 text-[#CE8C2C] mx-auto" />
                <p className="text-gray-400">Google Maps integration will be displayed here</p>
                <p className="text-sm text-gray-500">Find coaching centers near your location visually</p>
              </div>
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
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Find Your Perfect Coach?</h2>
            <p className="text-gray-400">
              Start your search today and connect with qualified coaches in your area who can help you achieve your
              educational goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button className="bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Search Coaches</Button>
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

