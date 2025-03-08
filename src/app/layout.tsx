import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "./globals.css";
import { AppSidebar } from "@/components/Sidebar";
import { ChatProvider } from "@/context/ChatProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SidebarProvider>
          <ChatProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>

          {children}
          </ChatProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
