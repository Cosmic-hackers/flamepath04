import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background border-t border-electric-blue text-foreground-light py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="flame-text">Flamepath</span>
              <span className="glow-effect"> Academy</span>
            </h3>
            <p className="text-foreground-light">Igniting minds, empowering futures in cybersecurity and technology.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-electric-blue">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-flame-orange transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-flame-orange transition-colors">Courses</Link></li>
              <li><Link href="/about" className="hover:text-flame-orange transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-flame-orange transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-electric-blue">Contact Us</h4>
            <p className="text-foreground-light">Email: flamepath.academy@proton.me</p>
            <p className="text-foreground-light">Phone: +91 (939) 029-1870</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-electric-blue text-center text-foreground-light">
          © {new Date().getFullYear()} Flamepath Academy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
