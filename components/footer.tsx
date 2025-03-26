import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-yellow-900/20 py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Pathshala Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">Pathshala</span>
            </div>
            <p className="text-sm text-gray-400">Follow your calling!</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-[#CE8C2C]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#CE8C2C]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#CE8C2C]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/study-abroad" className="text-sm text-gray-400 hover:text-[#CE8C2C]">
                  Study Abroad
                </Link>
              </li>
              <li>
                <Link href="/career-counseling" className="text-sm text-gray-400 hover:text-[#CE8C2C]">
                  Career Counseling
                </Link>
              </li>
              <li>
                <Link href="/coaching-connect" className="text-sm text-gray-400 hover:text-[#CE8C2C]">
                  Coaching Connect
                </Link>
              </li>
              <li>
                <Link href="/e-learning" className="text-sm text-gray-400 hover:text-[#CE8C2C]">
                  E-Learning
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-[#CE8C2C]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-[#CE8C2C]">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-[#CE8C2C]">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-[#CE8C2C]">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">123 Education Street</li>
              <li className="text-sm text-gray-400">Knowledge City, KN 12345</li>
              <li className="text-sm text-gray-400">info@pathshala.com</li>
              <li className="text-sm text-gray-400">+1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-yellow-900/20 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Pathshala Inc and Heer Eduverse Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

