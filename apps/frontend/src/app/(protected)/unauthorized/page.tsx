"use client";

import { Unauthorized } from "@/components/shared/Unauthorized";

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Unauthorized />
    </div>
  );
}
