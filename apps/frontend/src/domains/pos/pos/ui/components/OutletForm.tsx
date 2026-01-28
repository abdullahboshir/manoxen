"use client";

import { useEffect } from "react";
import {
  useRouter,
  useSearchParams,
  useParams,
  usePathname,
} from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Store, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

import {
  useCreateOutletMutation,
  useUpdateOutletMutation,
} from "@/redux/api/organization/outletApi";
import {
  useGetBusinessUnitsQuery,
  useGetBusinessUnitByIdQuery,
} from "@/redux/api/organization/businessUnitApi";
import { useCurrentBusinessUnit } from "@/hooks/useCurrentBusinessUnit";
import { MODULES } from "@/constant/modules";

// Shared Components
import InputField from "@/components/forms/InputField";
import { BrandingFields } from "@/domains/core/organizations/ui/components/forms/BrandingFields";
import { ContactFields } from "@/domains/core/organizations/ui/components/forms/ContactFields";
import { LocationFields } from "@/domains/core/organizations/ui/components/forms/LocationFields";
import { ModuleFields } from "@/domains/core/organizations/ui/components/forms/ModuleFields";
import { ManagerFields } from "@/domains/core/organizations/ui/components/forms/ManagerFields";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  code: z.string().min(2, "Code is required"),
  buId: z.string().min(1, "Business Unit is required"),
  isActive: z.boolean().default(true),

  // Branding
  branding: z.object({
    name: z.string().min(1, "Branding name is required"),
    description: z.string().optional(),
    tagline: z.string().optional(),
    logoUrl: z.string().optional(),
    bannerUrl: z.string().optional(),
    faviconUrl: z.string().optional(),
    theme: z.object({
      primaryColor: z.string().default("#3B82F6"),
      secondaryColor: z.string().default("#1E40AF"),
      accentColor: z.string().default("#F59E0B"),
      fontFamily: z.string().default("Inter"),
    }),
  }),

  // Contact
  contact: z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    website: z.string().optional().or(z.literal("")),
    supportPhone: z.string().optional(),
    socialMedia: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      youtube: z.string().optional(),
      linkedin: z.string().optional(),
    }),
  }),

  // Location
  location: z.object({
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(1, "City is required"),
    state: z.string().optional(),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().default("Bangladesh"),
    timezone: z.string().default("Asia/Dhaka"),
    coordinates: z
      .object({
        lat: z.string().optional(),
        lng: z.string().optional(),
      })
      .optional(),
  }),

  // Manager
  manager: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
  }),

  // Modules
  activeModules: z.record(z.string(), z.boolean().optional()).default({}),
});

type FormValues = z.infer<typeof formSchema>;

interface OutletFormProps {
  preSelectedSlug?: string;
  initialData?: any;
  isEditMode?: boolean;
}

export function OutletForm({
  preSelectedSlug,
  initialData,
  isEditMode = false,
}: OutletFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const organizationId = searchParams.get("organization");
  const [createOutlet, { isLoading: isCreating }] = useCreateOutletMutation();
  const [updateOutlet, { isLoading: isUpdating }] = useUpdateOutletMutation();
  const { data: businessUnitsData, isLoading: loadingBU } =
    useGetBusinessUnitsQuery(
      organizationId ? { organization: organizationId } : undefined,
    );
  const { currentBusinessUnit, activeBUId } = useCurrentBusinessUnit();

  console.log(
    "currentBusinessUnittttttttttttttt",
    currentBusinessUnit,
    preSelectedSlug,
    activeBUId,
  );

  // Fetch Business Unit by slug/id when preSelectedSlug is provided
  const { data: fetchedBusinessUnit, isLoading: loadingPreSelectedBU } =
    useGetBusinessUnitByIdQuery(preSelectedSlug, {
      skip: !preSelectedSlug,
    });

  // Fallback: If we have activeBUId but no currentBusinessUnit object, fetch it
  const { data: activeBUData, isLoading: loadingActiveBU } =
    useGetBusinessUnitByIdQuery(activeBUId, {
      skip: !activeBUId || !!currentBusinessUnit,
    });

  // Derive the Business Unit ID from multiple sources:
  // 1. Fetched BU from API (if slug lookup works)
  // 2. activeBUId from auth context (most reliable when inside BU context)
  // 3. preSelectedSlug if it's already an ObjectId
  const preSelectedBusinessUnitId =
    fetchedBusinessUnit?._id?.toString() ||
    fetchedBusinessUnit?.data?._id?.toString() ||
    fetchedBusinessUnit?.id ||
    activeBUId ||
    (preSelectedSlug && /^[0-9a-fA-F]{24}$/.test(preSelectedSlug)
      ? preSelectedSlug
      : null);

  const businessUnits = Array.isArray(businessUnitsData)
    ? businessUnitsData
    : (businessUnitsData as any)?.data || businessUnitsData || [];

  const isObjectId = (val: string) => /^[0-9a-fA-F]{24}$/.test(val || "");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: initialData?.branding?.name || initialData?.name || "",
      code: initialData?.code || "",
      buId:
        initialData?.businessUnit?._id?.toString() ||
        initialData?.businessUnit?.toString() ||
        (preSelectedSlug && isObjectId(preSelectedSlug) ? preSelectedSlug : ""),
      isActive: initialData?.isActive ?? true,
      branding: {
        name: initialData?.branding?.name || initialData?.name || "",
        description: initialData?.branding?.description || "",
        tagline: initialData?.branding?.tagline || "",
        logoUrl: initialData?.branding?.logoUrl || "",
        bannerUrl: initialData?.branding?.bannerUrl || "",
        faviconUrl: initialData?.branding?.faviconUrl || "",
        theme: initialData?.branding?.theme || {
          primaryColor: "#3B82F6",
          secondaryColor: "#1E40AF",
          accentColor: "#F59E0B",
          fontFamily: "Inter",
        },
      },
      contact: {
        email: initialData?.contact?.email || initialData?.email || "",
        phone: initialData?.contact?.phone || initialData?.phone || "",
        website: initialData?.contact?.website || "",
        supportPhone: initialData?.contact?.supportPhone || "",
        socialMedia: initialData?.contact?.socialMedia || {},
      },
      location: {
        address: initialData?.location?.address || initialData?.address || "",
        city: initialData?.location?.city || initialData?.city || "Dhaka",
        state: initialData?.location?.state || "Dhaka",
        postalCode: initialData?.location?.postalCode || "",
        country: initialData?.location?.country || "Bangladesh",
        timezone: initialData?.location?.timezone || "Asia/Dhaka",
        coordinates: {
          lat: initialData?.location?.coordinates?.lat?.toString() || "",
          lng: initialData?.location?.coordinates?.lng?.toString() || "",
        },
      },
      manager: initialData?.manager || { name: "", phone: "", email: "" },
      activeModules: initialData?.activeModules || {
        [MODULES.POS]: true,
        [MODULES.ERP]: true,
      },
    },
  });

  const selectedBUId = form.watch("buId");
  const parentBU =
    businessUnits.find(
      (bu: any) =>
        bu._id?.toString() === selectedBUId || bu.id === selectedBUId,
    ) ||
    fetchedBusinessUnit ||
    currentBusinessUnit ||
    activeBUData?.data ||
    activeBUData; // Fallback: Use fetched active BU data if context is missing
  const allowedModules = parentBU?.activeModules;

  const params = useParams();
  const pathOrgSlug = (params.organization || params.orgId) as string;
  const pathBUSlug = (params["business-unit"] ||
    params.buId ||
    params.businessUnit ||
    params.buId) as string;

  useEffect(() => {
    const currentVal = form.getValues("buId");

    console.log("[OutletForm] Auto-selection Triggered:", {
      currentFormVal: currentVal,
      preSelectedBusinessUnitId,
      activeContextBU: currentBusinessUnit?.slug || currentBusinessUnit?._id,
      availableAPIUnits: businessUnits?.length,
    });

    // 0. HIGHEST PRIORITY: If we have preSelectedBusinessUnitId from API lookup (slug → ID)
    // Always set this if available and form doesn't already match
    if (preSelectedBusinessUnitId && currentVal !== preSelectedBusinessUnitId) {
      console.log(
        "[OutletForm] Setting BU from preSelectedSlug API lookup:",
        preSelectedBusinessUnitId,
      );
      form.setValue("buId", preSelectedBusinessUnitId, {
        shouldValidate: true,
      });
      return;
    }

    // Skip remaining logic if form already has a valid value
    if (currentVal) return;

    // 1. Next: If we have a robust currentBusinessUnit from context/URL
    if (currentBusinessUnit) {
      const buId =
        currentBusinessUnit._id?.toString() || currentBusinessUnit.id;
      if (buId) {
        console.log("[OutletForm] Setting BU from Context:", buId);
        form.setValue("buId", buId, { shouldValidate: true });
        return;
      }
    }

    // 1.5. Priority: If we have activeBUId directly (even if object not found)
    if (activeBUId) {
      console.log(
        "[OutletForm] Setting BU from activeBUId string:",
        activeBUId,
      );
      form.setValue("buId", activeBUId, { shouldValidate: true });
      return;
    }

    // 2. FALLBACK: Trials based on URL segments and other candidates
    const candidateSlugs = [
      preSelectedSlug,
      pathBUSlug,
      pathOrgSlug,
      organizationId,
    ].filter(Boolean) as string[];

    console.log("[OutletForm] Trying Candidates:", candidateSlugs);

    const tryMatching = (slugOrId: string) => {
      const slugLower = slugOrId.toLowerCase().trim();

      // Priority B: API List (If context didn't already resolve it)
      if (businessUnits && businessUnits.length > 0) {
        const matchedBU = businessUnits.find(
          (bu: any) =>
            (bu.slug && bu.slug.toLowerCase().trim() === slugLower) ||
            (bu.id && bu.id === slugOrId) ||
            (bu._id && bu._id.toString() === slugOrId) ||
            (bu.name && bu.name.toLowerCase().replace(/ /g, "-") === slugLower),
        );

        if (matchedBU) {
          console.log("[OutletForm] Matched Trial Slug to API Unit:", slugOrId);
          return matchedBU._id?.toString() || matchedBU.id;
        }
      }

      return null;
    };

    // Iterate through candidates until we find a match
    for (const slug of candidateSlugs) {
      // a. If it's a valid ObjectId, try immediate set (with verification)
      if (isObjectId(slug)) {
        const isBUId = businessUnits.some(
          (bu: any) => (bu._id?.toString() || bu.id) === slug,
        );
        if (isBUId) {
          console.log("[OutletForm] Setting BU from ObjectId Candidate:", slug);
          form.setValue("buId", slug, { shouldValidate: true });
          return;
        }
      }

      // b. Try matching by slug/name
      const resultId = tryMatching(slug);
      if (resultId) {
        form.setValue("buId", resultId, { shouldValidate: true });
        return;
      }
    }

    console.log("[OutletForm] No match found for any candidate.");
  }, [
    preSelectedSlug,
    preSelectedBusinessUnitId,
    pathBUSlug,
    pathOrgSlug,
    organizationId,
    businessUnits,
    currentBusinessUnit,
    form,
  ]);

  // PRE-SELECT: Auto-enable modules from parent BU on creation
  useEffect(() => {
    if (
      !isEditMode &&
      allowedModules &&
      !form.formState.dirtyFields.activeModules
    ) {
      form.setValue("activeModules", allowedModules);
    }
  }, [isEditMode, allowedModules, form]);

  const watchName = form.watch("name");
  useEffect(() => {
    if (watchName && !form.formState.dirtyFields.branding?.name) {
      form.setValue("branding.name", watchName);
    }
  }, [watchName, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      const selectedBU = businessUnits.find(
        (bu: any) =>
          bu._id?.toString() === values.buId || bu.id === values.buId,
      );
      const derivedOrganizationId =
        organizationId ||
        localStorage.getItem("active-organization-id") ||
        selectedBU?.organization?._id ||
        selectedBU?.organization ||
        selectedBU?.organizationId;

      if (!derivedOrganizationId) {
        toast.error(
          "Critical Error: Organization Identity missing. Please reload or select a valid Business Unit.",
        );
        return;
      }

      const payload = {
        ...values,
        code: values.code.toUpperCase(),
        businessUnit: values.buId,
        organization: derivedOrganizationId, // [FIX] Inject Organization ID from best available source
        location: {
          ...values.location,
          coordinates:
            values.location.coordinates?.lat && values.location.coordinates?.lng
              ? {
                  lat: Number(values.location.coordinates.lat),
                  lng: Number(values.location.coordinates.lng),
                }
              : undefined,
        },
      };

      if (isEditMode && initialData?._id) {
        await updateOutlet({ id: initialData._id, body: payload }).unwrap();
        toast.success("Outlet updated successfully!");
      } else {
        await createOutlet(payload).unwrap();
        toast.success("Outlet created successfully!");
      }

      // Redirect to Parent List Page (Robust relative navigation)
      const targetPath = pathname.endsWith("/new")
        ? pathname.replace(/\/new$/, "")
        : pathname.split("/").slice(0, -1).join("/");

      // Preserve query params if needed, but usually list doesn't need organization param if path has it
      // If we are in platform mode (no org in path), we might need organization param?
      // Actually, if we just go "up", we are safe.

      router.push(targetPath);
    } catch (error: any) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  if ((isEditMode && loadingBU) || (preSelectedSlug && loadingPreSelectedBU))
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="basic" className="w-full space-y-4">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50 p-1">
            <TabsTrigger value="basic">Identity</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" /> Core Identity
                </CardTitle>
                <CardDescription>
                  Define the operational structure and identity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="buId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Business Unit</FormLabel>
                        <Select
                          key={field.value} // Force re-render on value change to fix initial selection display issue
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!!preSelectedSlug || !!activeBUId}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Business Unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(() => {
                              const seen = new Set();
                              const unique = [];
                              const rawList = [...businessUnits];

                              if (currentBusinessUnit)
                                rawList.push(currentBusinessUnit);

                              // Add fetchedBusinessUnit from API lookup
                              if (fetchedBusinessUnit)
                                rawList.push(fetchedBusinessUnit);

                              // Add activeBUData fallback
                              const ab = activeBUData?.data || activeBUData;
                              if (ab) rawList.push(ab);

                              // Ensure the CURRENTLY SELECTED unit is always in the list
                              // (Necessary if the match was found but it's not in the primary lists yet)
                              const selectedId = form.getValues("buId");
                              if (selectedId && isObjectId(selectedId)) {
                                const exists = rawList.some(
                                  (bu) =>
                                    (bu._id?.toString() || bu.id) ===
                                    selectedId,
                                );
                                if (!exists && currentBusinessUnit) {
                                  rawList.push(currentBusinessUnit);
                                }
                              }

                              for (const bu of rawList) {
                                const id = bu._id?.toString() || bu.id;
                                if (id && !seen.has(id)) {
                                  seen.add(id);
                                  unique.push(bu);
                                }
                              }
                              return unique.map((bu: any) => {
                                const val = bu._id?.toString() || bu.id;
                                return (
                                  <SelectItem key={val} value={val}>
                                    {bu.branding?.name ||
                                      bu.name ||
                                      "Business Unit"}
                                  </SelectItem>
                                );
                              });
                            })()}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <InputField
                    name="name"
                    label="Outlet Name"
                    placeholder="e.g. Dhanmondi Branch"
                    required
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      name="code"
                      label="Outlet Code"
                      placeholder="e.g. DHM-01"
                      required
                    />
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-auto h-[40px]">
                          <FormLabel className="text-sm font-medium">
                            Active Status
                          </FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <ManagerFields prefix="manager" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding">
            <BrandingFields prefix="branding" />
          </TabsContent>

          <TabsContent value="contact">
            <ContactFields prefix="contact" />
          </TabsContent>

          <TabsContent value="location">
            <LocationFields prefix="location" />
          </TabsContent>

          <TabsContent value="modules">
            <ModuleFields
              prefix="activeModules"
              allowedModules={allowedModules}
              hiddenModules={["erp"]} // ERP is hidden as it's a parent concept
              mandatoryModules={["pos", "inventory"]} // POS and Inventory are core to an Outlet
            />
          </TabsContent>
        </Tabs>

        <div className="flex flex-col gap-4">
          {Object.keys(form.formState.errors).length > 0 && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive border border-destructive/20">
              <p className="font-semibold mb-1">
                Please fix the following errors:
              </p>
              <ul className="list-disc pl-5">
                {Object.entries(form.formState.errors).map(
                  ([key, error]: any) => (
                    <li key={key}>
                      <span className="capitalize">{key}</span>:{" "}
                      {error?.message || "Invalid value"}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="min-w-[150px]"
            >
              {isCreating || isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isEditMode ? "Save Changes" : "Create Outlet"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
