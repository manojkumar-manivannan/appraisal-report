import React from "react";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    Path,
    ErrorOption,
} from "react-hook-form";
import { Input as InputH, Field, Label } from "@headlessui/react";
import { cn } from "@/utils";
interface Props<FormType extends FieldValues> {
    name: Path<FormType>;
    label?: string;
    type?: string;
    placeholder?: string;
    register: UseFormRegister<FormType>;
    errors: FieldErrors<FormType>;
    nestedErrorField?: ErrorOption | undefined;
}

const Input = <FormType extends FieldValues>({
    name,
    label = name,
    type = "text",
    placeholder = `Enter ${String(name)}`,
    register,
    errors,
    nestedErrorField,
}: Props<FormType>) => (
    <div className="w-full max-w-md px-4">
        <Field
            as="div"
            className="flex flex-row items-baseline justify-start gap-2"
        >
            <Label className="text-nowrap text-sm/6 font-medium text-gray-600">
                {label}
            </Label>
            <div>
                <InputH
                    className={cn(
                        "text-red block w-full rounded-lg border border-sky-500 bg-white/5 px-3 py-1.5 text-sm/6 text-gray-500",
                        "data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-600/25"
                    )}
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                />
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

export default Input;
