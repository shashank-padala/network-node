"use client";

import * as React from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { COUNTRY_CODES } from "@/constants/country-codes";

interface CountryCodeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function CountryCodeSelect({
  value,
  onValueChange,
  disabled = false,
  className,
}: CountryCodeSelectProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const filteredCodes = React.useMemo(() => {
    if (!searchQuery.trim()) return COUNTRY_CODES;
    const query = searchQuery.toLowerCase();
    return COUNTRY_CODES.filter(
      (code) =>
        code.label.toLowerCase().includes(query) ||
        code.value.includes(query)
    );
  }, [searchQuery]);

  const selectedLabel = COUNTRY_CODES.find((code) => code.value === value)?.label || value;

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setSearchQuery("");
        }
      }}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        className={cn(
          "flex h-11 w-[140px] items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm focus:shadow-md",
          className
        )}
      >
        <SelectPrimitive.Value>{selectedLabel}</SelectPrimitive.Value>
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="relative z-50 max-h-[300px] min-w-[240px] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-900 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
          position="popper"
          side="bottom"
          align="start"
          sideOffset={4}
        >
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                ref={(input) => {
                  if (input && open) {
                    setTimeout(() => input.focus(), 0);
                  }
                }}
                type="text"
                placeholder="Search country code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setOpen(false);
                  }
                }}
              />
            </div>
          </div>

          {/* Scrollable List */}
          <SelectPrimitive.Viewport className="p-1 max-h-[240px] overflow-y-auto">
            {filteredCodes.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                No country codes found
              </div>
            ) : (
              filteredCodes.map((code) => (
                <SelectPrimitive.Item
                  key={code.value}
                  value={code.value}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-blue-50 focus:text-blue-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  )}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <Check className="h-4 w-4" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>{code.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))
            )}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

