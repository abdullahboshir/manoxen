"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Settings2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { MODULE_OPTIONS } from "@/constant/modules";
import {
  resolveModules,
  validateModuleToggle,
} from "@/config/package-features";
import { toast } from "sonner";

interface ModuleFieldsProps {
  prefix?: string; // e.g. "activeModules"
  allowedModules?: Record<string, boolean>; // Modules enabled in parent level
  hiddenModules?: string[]; // Modules to hide from UI
  mandatoryModules?: string[]; // Modules that must be enabled and cannot be toggled off
}

export function ModuleFields({
  prefix = "activeModules",
  allowedModules,
  hiddenModules = [],
  mandatoryModules = [],
}: ModuleFieldsProps) {
  const { control, setValue, watch, getValues } = useFormContext();
  const getName = (name: string) => (prefix ? `${prefix}.${name}` : name);

  // Filter options
  const visibleOptions = MODULE_OPTIONS.filter(
    (opt) => !hiddenModules.includes(opt.value),
  );

  // Effect to force-disable modules that are not allowed by parent
  const currentValues = watch(prefix);

  // Handler for module toggle with validation
  const handleModuleToggle = (moduleValue: string, checked: boolean) => {
    // Prevent disabling mandatory modules
    if (mandatoryModules.includes(moduleValue) && !checked) {
      toast.error(`${moduleValue.toUpperCase()} is mandatory for this entity.`);
      return;
    }

    const validation = validateModuleToggle(
      currentValues || {},
      moduleValue,
      checked,
    );
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }
    setValue(getName(moduleValue), checked);
  };

  // Effect to enforce mandatory modules are always true
  useEffect(() => {
    if (mandatoryModules.length > 0) {
      mandatoryModules.forEach((mod) => {
        const currentVal = getValues(getName(mod));
        if (currentVal !== true) {
          setValue(getName(mod), true);
        }
      });
    }
  }, [mandatoryModules, setValue, prefix, getValues]);

  useEffect(() => {
    if (!allowedModules) return;

    Object.keys(currentValues || {}).forEach((key) => {
      // If mandatory, do not force disable even if parent doesn't have it
      if (mandatoryModules.includes(key)) return;

      // If it's enabled here but NOT explicitly enabled in parent, force off
      if (allowedModules[key] !== true && currentValues?.[key] === true) {
        setValue(getName(key), false);
      }
    });
  }, [allowedModules, currentValues, setValue, prefix, mandatoryModules]);

  // Effect to auto-enable dependent modules (e.g., ERP Core)
  useEffect(() => {
    if (!currentValues) return;

    const resolved = resolveModules(currentValues);
    // Only update if there are changes to avoid infinite loops
    Object.keys(resolved).forEach((key) => {
      if (resolved[key] !== currentValues[key]) {
        setValue(getName(key), resolved[key]);
      }
    });
  }, [currentValues, setValue, prefix]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" /> Module Configuration
        </CardTitle>
        <CardDescription>
          Enable or disable major business systems for this entity.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleOptions.map((module) => {
          const isParentAllowed = allowedModules
            ? allowedModules[module.value] === true
            : true;
          const isMandatory = mandatoryModules.includes(module.value);
          // Mandatory modules effectively override parent lock for the purpose of being enabled
          const isAllowed = isMandatory || isParentAllowed;

          return (
            <FormField
              key={module.value}
              control={control}
              name={getName(module.value)}
              render={({ field }) => (
                <FormItem
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border bg-card transition-all group",
                    !isAllowed
                      ? "opacity-60 bg-muted/50 cursor-not-allowed"
                      : "hover:border-primary/50",
                    isMandatory ? "bg-primary/5 border-primary/20" : "",
                  )}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Label
                        className={cn(
                          "capitalize font-semibold transition-colors",
                          isAllowed
                            ? "group-hover:text-primary cursor-pointer"
                            : "text-muted-foreground",
                        )}
                        htmlFor={getName(module.value)}
                      >
                        {module.label}
                      </Label>
                      {!isAllowed && (
                        <span className="text-[8px] bg-amber-100 text-amber-700 px-1 rounded font-bold uppercase tracking-wider">
                          Locked by Parent
                        </span>
                      )}
                      {isMandatory && (
                        <span className="text-[8px] bg-blue-100 text-blue-700 px-1 rounded font-bold uppercase tracking-wider">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {!isAllowed
                        ? "Enforce by organization license"
                        : isMandatory
                          ? "Required for this entity type"
                          : `Toggle ${module.value} capabilities`}
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      id={getName(module.value)}
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        handleModuleToggle(module.value, checked)
                      }
                      disabled={!isAllowed || isMandatory}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
