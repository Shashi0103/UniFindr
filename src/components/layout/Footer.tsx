import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-color bg-bg-secondary">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-xs shadow-glow">
                U
              </div>
              <span className="text-lg font-bold tracking-tight">
                Uni<span className="text-gradient">Findr</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary mb-6">
              Empowering students to make data-driven decisions about their future. Discover, compare, and predict your dream college.
            </p>
            <div className="flex items-center gap-4 text-text-secondary">
              <a href="#" className="hover:text-brand-500 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-brand-500 transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-brand-500 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="/colleges" className="hover:text-brand-500 transition-colors">Explore Colleges</Link></li>
              <li><Link href="/compare" className="hover:text-brand-500 transition-colors">Compare Colleges</Link></li>
              <li><Link href="/predict" className="hover:text-brand-500 transition-colors">College Predictor</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-brand-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Exam Guides</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Placement Reports</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border-color mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-text-secondary">
          <p>© {new Date().getFullYear()} UniFindr. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with Next.js & Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
