import Link from "next/link"
import Image from "next/image"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Column 1: Logo & About */}
        <div>
          <div className="flex items-center mb-4">
            <Image src="/logo.png" alt="ofertemutare.ro" width={50} height={50} />
            <span className="ml-2 text-xl font-bold text-white">ofertemutare.ro</span>
          </div>
          <p className="text-gray-400">
            Platforma care conectează clienți și firme de mutări verificate din România.
          </p>
        </div>

        {/* Column 2: Linkuri utile */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Linkuri utile</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white">Despre noi</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/auth" className="hover:text-white">Autentificare client</Link></li>
            <li><Link href="/firms" className="hover:text-white">Devino partener</Link></li>
          </ul>
        </div>

        {/* Column 3: Resurse */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resurse</h3>
          <ul className="space-y-2">
            <li><Link href="/articles/tips" className="hover:text-white">Tips & Tricks mutare</Link></li>
            <li><Link href="/faq" className="hover:text-white">Întrebări frecvente</Link></li>
            <li><Link href="/guides/mutare" className="hover:text-white">Ghid complet de mutare</Link></li>
          </ul>
        </div>

        {/* Column 4: Legal & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-2 mb-6">
            <li><Link href="/terms" className="hover:text-white">Termeni și condiții</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Politica de confidențialitate</Link></li>
          </ul>
          <div className="flex gap-4">
            <Link href="#"><Image src="/icons/facebook.svg" alt="Facebook" width={28} height={28} /></Link>
            <Link href="#"><Image src="/icons/instagram.png" alt="Instagram" width={28} height={28} /></Link>
            <Link href="#"><Image src="/icons/linkedin.png" alt="LinkedIn" width={28} height={28} /></Link>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ofertemutare.ro · Toate drepturile rezervate
      </div>
    </footer>
  )
}

export default Footer
