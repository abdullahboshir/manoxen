import AuditLogList from "@/domains/core/system/ui/components/AuditLogList";
import PermissionHealthWidget from "@/domains/core/system/ui/components/PermissionHealthWidget";

export default function AuditLogsPage() {
    return (
        <div className="p-4 space-y-6">
            <PermissionHealthWidget />
            <AuditLogList />
        </div>
    );
}

