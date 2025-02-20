import Input from "@/app/components/form/Input";
import Select from "@/app/components/form/Select";
import { propertyFormType } from "@/schemas";
import { Button } from "@headlessui/react";
import { faker } from "@faker-js/faker";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/16/solid";
import React, { useState } from "react";
import {
    Control,
    FieldErrors,
    useFieldArray,
    UseFormRegister,
} from "react-hook-form";
import { cities, countries, propertyConditions, states } from "./utils";

interface Props {
    control: Control<propertyFormType>;
    register: UseFormRegister<propertyFormType>;
    errors: FieldErrors<propertyFormType>;
}

const ComparableSales = ({ control, register, errors }: Props) => {
    const { append, remove, fields } = useFieldArray<propertyFormType>({
        control,
        name: "comparable_sales",
    });
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
        {}
    );
    const toggleItem = (index: number) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };
    const handleAppend = () => {
        append({
            address:
                faker.location.streetAddress() +
                " " +
                faker.helpers.arrayElement(cities) +
                " " +
                faker.helpers.arrayElement(states) +
                " " +
                faker.location.zipCode() +
                " " +
                faker.helpers.arrayElement(countries),
            property_condition: faker.helpers.arrayElement(
                propertyConditions
            ) as "Excellent" | "Good" | "Average" | "Fair" | "Poor",
            square_footage: faker.number.int({ min: 750, max: 7000 }),
            sale_price: faker.number.int({ min: 100000, max: 5000000 }),
        });

        setExpandedItems((prev) => ({
            ...prev,
            [fields.length]: true,
        }));
    };
    const handleRemove = (index: number) => {
        remove(index);

        setExpandedItems((prev) => {
            const updatedItem: Record<number, boolean> = {};
            fields.forEach((_, idx) => {
                if (idx < index) {
                    updatedItem[idx] = prev[idx];
                } else if (idx > index) {
                    updatedItem[idx - 1] = prev[idx];
                }
            });
            return updatedItem;
        });
    };
    return (
        <div className="flex w-full flex-col gap-3">
            <div className="flex w-full flex-row gap-3">
                <h2 className="text-xl font-semibold text-gray-600">
                    3) Comparable Sales
                </h2>

                <div className="flex flex-row justify-end">
                    <Button
                        onClick={handleAppend}
                        className="btn btn-success btn-sm text-white rounded-full"
                    >
                        <PlusIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {errors.comparable_sales && errors.comparable_sales?.message && (
                <p className="text-sm/5 text-red-500">
                    {String(errors.comparable_sales.message)}
                </p>
            )}
            {fields.map((item, index) => {
                const isExpanded = expandedItems[index] ?? false;
                return (
                    <div className="space-y-3 rounded-lg" key={index}>
                        <div className="flex items-baseline justify-start gap-2">
                            <div
                                className="mb-2 flex cursor-pointer flex-row items-center gap-2 text-md font-semibold text-gray-600"
                                onClick={() => toggleItem(index)}
                            >
                                Comparable Sale {index + 1}
                                {isExpanded ? (
                                    <ChevronUpIcon className="h-5 w-5" />
                                ) : (
                                    <ChevronDownIcon className="h-5 w-5" />
                                )}
                            </div>
                            <Button
                                className="btn btn-error btn-sm text-white"
                                onClick={() => handleRemove(index)}
                            >
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                        </div>

                        {isExpanded && (
                            <>
                                {" "}
                                <div className="grid w-full grid-cols-2 gap-3">
                                    <Input
                                        name={`comparable_sales.${index}.address`}
                                        label="Address"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        nestedErrorField={
                                            errors.comparable_sales?.[index]
                                                ?.address
                                        }
                                    />
                                    <Input
                                        name={`comparable_sales.${index}.sale_price`}
                                        label="Sale Price"
                                        type="number"
                                        register={register}
                                        errors={errors}
                                        nestedErrorField={
                                            errors.comparable_sales?.[index]
                                                ?.sale_price
                                        }
                                    />
                                    {errors.comparable_sales?.[index]
                                        ?.sale_price && (
                                        <p className="text-sm/5 text-red-500">
                                            {
                                                errors.comparable_sales?.[index]
                                                    ?.sale_price?.message
                                            }
                                        </p>
                                    )}
                                    <Input
                                        name={`comparable_sales.${index}.square_footage`}
                                        label="Square Footage"
                                        type="number"
                                        register={register}
                                        errors={errors}
                                        nestedErrorField={
                                            errors.comparable_sales?.[index]
                                                ?.square_footage
                                        }
                                    />
                                    <Select
                                        name={`comparable_sales.${index}.property_condition`}
                                        label="Condition"
                                        options={propertyConditions}
                                        register={register}
                                        errors={errors}
                                        nestedErrorField={
                                            errors.comparable_sales?.[index]
                                                ?.property_condition
                                        }
                                    />
                                </div>
                                <hr className="border-t border-gray-300" />
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ComparableSales;
