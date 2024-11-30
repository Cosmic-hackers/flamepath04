import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Cosmoss Innovations</h3>
            <p className="text-gray-400">Your gateway to AI, ML, robotics, and cybersecurity resources</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/free-resources" className="hover:text-blue-400">Free Resources</Link></li>
              <li><Link href="/paid-resources" className="hover:text-blue-400">Paid Resources</Link></li>
              <li><Link href="/download-center" className="hover:text-blue-400">Download Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: info@cosmossinnovations.com</p>
            <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          © 2023 Cosmoss Innovations. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

