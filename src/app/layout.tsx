import { SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";
import { AppSidebar } from "@/components/Sidebar";
import { ChatProvider } from "@/context/ChatProvider";
import { Toaster } from "@/components/ui/sonner";

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
            {children}
          </ChatProvider>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
