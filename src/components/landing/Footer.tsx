import { Facebook, Instagram, LineChart, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <LineChart className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                            <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-400 dark:to-pink-400 bg-clip-text text-transparent">
                                ExisyFi
                            </span>
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Empowering you to take control of your finances with smart, intuitive tools.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Features</Link></li>
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Pricing</Link></li>
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Integrations</Link></li>
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">About Us</Link></li>
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Careers</Link></li>
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Help Center</Link></li>
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Contact Us</Link></li>
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Status</Link></li>
                            <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Security</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} ExisyFi. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer