import * as React from "react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return <div className="flex-1 space-y-4 p-6 pt-6 md:p-8">{children}</div>;
}
