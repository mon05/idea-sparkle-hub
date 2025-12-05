import { ReactNode } from "react";
import Header from "./Header";
import { useLanguage } from "@/i18n/LanguageContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col gradient-subtle">
      <Header />
      <main className="flex-1 container py-6">{children}</main>
      <footer className="border-t border-border/40 py-4">
        <div className="container text-center text-sm text-muted-foreground">
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
