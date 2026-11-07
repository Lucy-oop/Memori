import { AppShell } from "@/components/AppShell";
import { LibraryProvider } from "@/components/LibraryProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LibraryProvider>
      <AppShell>{children}</AppShell>
    </LibraryProvider>
  );
}
