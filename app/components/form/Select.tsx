import React from "react";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    Path,
} from "react-hook-form";
import { Select as SelectH, Field, Label } from "@headlessui/react";
import { cn } from "@/utils";
import { OptionType } from "@/types/types";

interface Props<FormType extends FieldValues> {
    name: Path<FormType>;
    label?: string;
    options: OptionType[] | string[] | number[];
    placeholder?: string;
    register: UseFormRegister<FormType>;
    errors: FieldErrors<FormType>;
    nestedErrorField?: FieldErrors<FormType>;
}

const Select = <FormType extends FieldValues>({
    name,
    label = name,
    options,
    placeholder = label ? `Select ${label}` : name,
    register,
    errors,
    nestedErrorField,
}: Props<FormType>) => {
    const normalizedOptions: OptionType[] = options.map((option) =>
        typeof option === "string" || typeof option === "number"
            ? { label: String(option), value: String(option) }
            : option
    );
    return (
        <div className="w-full max-w-md px-4">
            <Field
                as="div"
                className="flex flex-row items-baseline justify-start gap-2"
            >
                <Label className="text-sm/6 font-medium text-gray-600">
                    {label}
                </Label>
                <div>
                    <SelectH
                        id={name}
                        {...register(name)}
                        className={cn(
                            "block w-full rounded-lg border border-sky-500 bg-white px-3 py-1.5 text-sm text-gray-500",
                            "data-[focus]:outline-2 data-[focus]:outline-blue-600/25"
                        )}
                        defaultValue={""}
                    >
                        <option value="">{placeholder}</option>
                        {normalizedOptions.map(({ value, label }, index) => (
                            <option key={index} value={value}>
                                {label}
                            </option>
                        ))}
                    </SelectH>
                    {nestedErrorField
                        ? nestedErrorField?.message && (
                              <p className="text-sm/5 text-red-500">
                                  {String(nestedErrorField?.message)}
                              </p>
                          )
                        : errors[name] && (
                              <p className="text-sm/5 text-red-500">
                                  {String(errors[name]?.message)}
                              </p>
                          )}
                </div>
            </Field>
        </div>
    );
};

export default Select;
