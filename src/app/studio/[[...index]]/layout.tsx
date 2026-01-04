export const metadata = {
  title: 'MegaRobotics CMS',
  description: 'Content management for MegaRobotics',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
