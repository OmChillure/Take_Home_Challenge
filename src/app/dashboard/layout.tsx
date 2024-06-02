
import Sidebar from "~/components/Sidebar/Sidebar";

export const metadata = {
  title: "Dashboard",
  description: "A online art evaluator and marketplace for all art fanatics",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="flex w-screen">
        <Sidebar />
        {children}
      </main>
  );
}
