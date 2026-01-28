import AttendanceTracker from "@/domains/erp/hrm/ui/components/AttendanceTracker"

export default async function AttendancePage({ params }: { params: Promise<{ 'business-unit': string }> }) {
    const { 'business-unit': buId } = await params;
    return <AttendanceTracker buId={buId} />
}
