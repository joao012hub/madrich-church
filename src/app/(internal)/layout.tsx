import Sidebar from "@/components/Sidebar";

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{background: "radial-gradient(ellipse at top, #1e1b4b 0%, #0f0f0f 70%)"}}>
      <Sidebar />
      <main className="flex-1" style={{marginLeft: "220px", minHeight: "100vh"}}>
        {children}
      </main>
    </div>
  )
}
