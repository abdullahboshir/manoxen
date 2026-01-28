"use client";

import { DataPageLayout } from "@/components/shared/DataPageLayout";
import LedgerList from "@/domains/erp/inventory/ui/components/ledger/LedgerList";


export default function LedgerPage() {
    return (
        <DataPageLayout
            title="Stock Ledger"
            description="History of all stock movements"
        >
            <LedgerList />
        </DataPageLayout>
    );
}
