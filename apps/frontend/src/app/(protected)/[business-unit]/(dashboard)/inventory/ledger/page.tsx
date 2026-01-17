"use client";

import { DataPageLayout } from "@/components/shared/DataPageLayout";
import LedgerList from "@/features/inventory/components/ledger/LedgerList";


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
