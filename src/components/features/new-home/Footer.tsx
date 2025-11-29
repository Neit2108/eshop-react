import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Premium Store</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Curated collections of premium products to elevate your space.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Shop", "About Us", "Contact", "Blog"].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-background/70 hover:text-background transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {["FAQs", "Shipping", "Returns", "Track Order"].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-background/70 hover:text-background transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <Link
                  key={label}
                  to="#"
                  className="bg-background/10 hover:bg-background/20 p-2 rounded-full transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/70 text-sm">© {currentYear} Premium Store. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service"].map((link) => (
                <Link
                  key={link}
                  to="#"
                  className="text-background/70 hover:text-background transition-colors text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
