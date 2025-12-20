"use client"

/* --------------------------------- Imports -------------------------------- */
import {
  Dispatch,
  SetStateAction,
} from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  ChevronsUpDownIcon,
  CheckIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                           Main Component Function                          */
/* -------------------------------------------------------------------------- */

/**
 * 
 * @param label this is what you want to call the dropdown. E.g., if you're filtering
 * based on "price", you'd call this "price". First letter uppercase pls.
 * @param value this is where the current value of the filter is stored. useState
 * @param setValue this is how you set the value. useState
 * @param open this decides if the dropdown is visible or not. useState
 * @param setOpen this changes the open value. useState
 * @param valOptions this is a list of all the values that the "value" variable can have. 
 * E.g., if you're filtering price, and have three options ["low", "moderate", "high"], you'd
 * pass these values as a string array to this parameter.
 * @returns a dropdown!
 */
export function SearchFilterDropdown({
  label,
  value,
  setValue,
  open,
  setOpen,
  valOptions,
} : {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  valOptions: string[];
}) {

  return (
    <div className="flex flex-col gap-1 min-w-[200px]">
      <Label htmlFor={label} className="px-1">
        Search {label} Options:
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] justify-between"
          >
            {value
              ? valOptions.find((curr) => curr === value)
              : `Select ${label} Option...`}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`Search ${label} Options...`} />
            <CommandList>
              <CommandEmpty>No {label} Option Found.</CommandEmpty>
              <CommandGroup>
                {valOptions.map((curr) => (
                  <CommandItem
                    key={curr}
                    value={curr}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === curr ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {curr}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}