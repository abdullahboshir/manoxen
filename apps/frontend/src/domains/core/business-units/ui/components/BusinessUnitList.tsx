"use client";

import { useMemo } from "react";
import {
  MoreHorizontal,
  Plus,
  Edit,
  Trash,
  Eye,
  Store,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBusinessUnitsQuery } from "@/redux/api/organization/businessUnitApi";
import { useAuth } from "@manoxen/auth-client";
import { USER_ROLES } from "@/config/auth-constants";
import { DataTable } from "@/components/shared/DataTable";

export default function BusinessUnitList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const organizationIdFromUrl = searchParams.get("organization");
  const { user } = useAuth();

  const { data, isLoading } = useGetBusinessUnitsQuery(
    organizationIdFromUrl ? { organization: organizationIdFromUrl } : {},
  );

  const units = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data as any).data || [];
  }, [data]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.getValue("type")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const colors: any = {
          active: "default",
          published: "default",
          draft: "secondary",
          suspended: "destructive",
          archived: "outline",
        };
        return <Badge variant={colors[status]}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const unit = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  const identifier = unit.slug || unit.id || unit._id;
                  const orgSlug =
                    typeof unit.organization === "object"
                      ? unit.organization?.slug || unit.organization?.id
                      : unit.organization || organizationIdFromUrl;

                  const url = orgSlug
                    ? `/${orgSlug}/${identifier}` // Standard Route: /[org]/[bu]
                    : `/${identifier}/overview`;

                  router.push(
                    organizationIdFromUrl
                      ? `${url}?organization=${organizationIdFromUrl}`
                      : url,
                  );
                }}
              >
                <Eye className="mr-2 h-4 w-4" /> View Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const identifier = unit.slug || unit.id || unit._id;
                  const targetOrganizationId =
                    organizationIdFromUrl ||
                    (typeof unit.organization === "object"
                      ? unit.organization?._id || unit.organization?.id
                      : unit.organization);

                  // Hierarchical URL for editing
                  router.push(
                    `/organization/${targetOrganizationId}/business-units/${identifier}/edit`,
                  );
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  const identifier = unit.slug || unit.id || unit._id;
                  const targetOrganizationId =
                    organizationIdFromUrl ||
                    (typeof unit.organization === "object"
                      ? unit.organization?._id || unit.organization?.id
                      : unit.organization);

                  router.push(
                    `/organization/${targetOrganizationId}/user-management/business-users/add?business-unit=${identifier}`,
                  );
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Staff
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const identifier = unit.slug || unit.id || unit._id;
                  const targetOrgSlug =
                    typeof unit.organization === "object"
                      ? unit.organization?.slug || unit.organization?._id
                      : organizationIdFromUrl || unit.organization;

                  router.push(`/${targetOrgSlug}/${identifier}/outlets/new`);
                }}
              >
                <Store className="mr-2 h-4 w-4" /> Add Outlet
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <Trash className="mr-2 h-4 w-4" /> Delete Unit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-0">
        <div>
          <CardTitle className="text-2xl">Business Units</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your organization's business units and divisions.
          </p>
        </div>
        <Button
          onClick={() =>
            router.push(
              organizationIdFromUrl
                ? `/organization/${organizationIdFromUrl}/business-units/new`
                : "/platform/organizations",
            )
          }
        >
          <Plus className="mr-2 h-4 w-4" /> New Business Unit
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <DataTable columns={columns} data={units} searchKey="name" />
      </CardContent>
    </Card>
  );
}
