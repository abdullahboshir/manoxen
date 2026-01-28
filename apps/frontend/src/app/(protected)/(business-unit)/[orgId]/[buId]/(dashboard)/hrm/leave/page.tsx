import LeaveList from "@/domains/erp/hrm/ui/components/LeaveList"

export default async function LeavePage({ params }: { params: Promise<{ 'business-unit': string }> }) {
    const { 'business-unit': buId } = await params;
    return <LeaveList buId={buId} />
}
