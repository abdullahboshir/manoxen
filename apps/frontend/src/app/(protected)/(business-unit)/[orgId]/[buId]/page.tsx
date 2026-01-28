"use client"

import { useParams } from "next/navigation"
import BusinessUnitDashboard from "@/domains/core/business-units/ui/components/BusinessUnitDashboard"

export default function BusinessUnitDashboardPage() {
    const params = useParams()
    const businessUnitParam = (params["business-unit"] || params.buId) as string

    return <BusinessUnitDashboard slug={businessUnitParam} />
}
