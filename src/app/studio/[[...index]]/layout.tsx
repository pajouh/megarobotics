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
    <div className="fixed inset-0 z-50">
      {children}
    </div>
  )
}
