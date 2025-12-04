import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col gradient-subtle">
      <Header />
      <main className="flex-1 container py-6">{children}</main>
      <footer className="border-t border-border/40 py-4">
        <div className="container text-center text-sm text-muted-foreground">
          <p>WineCalc — Professional Winemaking Calculator</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
