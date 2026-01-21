import AttendanceTracker from "@/features/hrm/AttendanceTracker"

export default async function AttendancePage({ params }: { params: Promise<{ 'business-unit': string }> }) {
    const { 'business-unit': businessUnitId } = await params;
    return <AttendanceTracker businessUnitId={businessUnitId} />
}
