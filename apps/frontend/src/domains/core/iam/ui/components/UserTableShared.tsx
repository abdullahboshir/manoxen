"use client";

import { Search, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/DataTable";
import { DataPageLayout } from "@/components/shared/DataPageLayout";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface UserTableSharedProps {
  title?: string;
  description?: string;
  data: any[];
  isLoading: boolean;
  columns: ColumnDef<any>[];
  stats?: React.ReactNode;
  tabs?: { value: string; label: string }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  extraFilters?: React.ReactNode;
  onCreateClick?: () => void;
  canCreate?: boolean;
  onRefresh: () => void;
  renderSubComponent?: (row: any) => React.ReactNode;
}

export function UserTableShared({
  title = "All Users",
  description = "View and manage all user accounts across the system.",
  data,
  isLoading,
  columns,
  stats,
  tabs = [
    { value: "all", label: "All Users" },
    { value: "staff", label: "Staff" },
    { value: "customer", label: "Customers" },
    { value: "supplier", label: "Suppliers" },
  ],
  activeTab,
  onTabChange,
  searchTerm,
  onSearchChange,
  extraFilters,
  onCreateClick,
  canCreate = false,
  onRefresh,
  renderSubComponent,
}: UserTableSharedProps) {
  return (
    <DataPageLayout
      title={title}
      description={description}
      createAction={
        canCreate && onCreateClick
          ? {
              label: "Add User",
              onClick: onCreateClick,
            }
          : undefined
      }
      stats={stats}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      extraFilters={
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          {extraFilters}
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Export")}
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      }
    >
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        renderSubComponent={renderSubComponent}
      />
    </DataPageLayout>
  );
}
