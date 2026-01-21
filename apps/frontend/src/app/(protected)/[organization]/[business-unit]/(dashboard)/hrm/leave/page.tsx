import LeaveList from "@/features/hrm/LeaveList"

export default async function LeavePage({ params }: { params: Promise<{ 'business-unit': string }> }) {
    const { 'business-unit': businessUnitId } = await params;
    return <LeaveList businessUnitId={businessUnitId} />
}
