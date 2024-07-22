// Global css
import '../styles/globals.css'
// Components - Navigation
import Header from "@/components/Homepage/Header"

export const metadata = {
  title: 'Dublanc Fc',
  description: 'Dublanc Football Club Official Website',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
