"use client";
import { propertyFormType, propertySchema } from "@/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/app/components/form/Input";
import Select from "@/app/components/form/Select";
import { Button } from "@headlessui/react";
import { toast } from "react-toastify";
import { Suspense } from "react";
import { cities, propertyConditions, states, countries } from "./utils";
import ComparableSales from "./ComparableSales";
import { faker } from "@faker-js/faker";

const AppraisalPage = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<propertyFormType>({
        resolver: zodResolver(propertySchema),
        mode: "onBlur",
        defaultValues: {
            address: faker.location.streetAddress(),
            city: faker.helpers.arrayElement(cities),
            state: faker.helpers.arrayElement(states),
            zip: faker.location.zipCode(),
            country: faker.helpers.arrayElement(countries),
            property_condition: faker.helpers.arrayElement(
                propertyConditions
            ) as "Excellent" | "Good" | "Average" | "Fair" | "Poor",
            square_footage: faker.number.int({ min: 750, max: 7000 }),
            comparable_sales: [],
        },
    });
    const onSubmit: SubmitHandler<propertyFormType> = async (data) => {
        try {
            const response = await fetch("/api/appraisal-report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to download the report.");

            // Convert the response to Blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));

            // Create a temporary link to trigger download
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "AppraisalReport.docx");
            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Appraisal Report downloaded successfully.");
        } catch (error) {
            console.error("Error downloading report:", error);
            toast.error("Failed to generate the report.");
        }
    };
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll bg-gray-200 px-6 py-4">
                <div className="flex w-full max-w-4xl flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
                    <h1 className="text-2xl text-center font-semibold text-gray-700">
                        Property Appraisal Report
                    </h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex w-full flex-col gap-4"
                    >
                        <div className="flex w-full flex-col gap-3">
                            <h2 className="text-xl font-semibold text-gray-600">
                                1) Property Location
                            </h2>
                            <div className="grid w-full grid-cols-3 gap-4">
                                <Input
                                    name="address"
                                    type="text"
                                    label="Address"
                                    errors={errors}
                                    register={register}
                                />
                                <Select
                                    name="city"
                                    label="City"
                                    errors={errors}
                                    register={register}
                                    options={cities}
                                    placeholder={""}
                                />
                                <Select
                                    name="state"
                                    label="State"
                                    errors={errors}
                                    register={register}
                                    options={states}
                                    placeholder={""}
                                />
                                <Input
                                    name="zip"
                                    type="text"
                                    label="Zip Code"
                                    errors={errors}
                                    register={register}
                                />
                                <Select
                                    name="country"
                                    label="Country"
                                    errors={errors}
                                    register={register}
                                    options={countries}
                                    placeholder={""}
                                />
                            </div>
                        </div>
                        <hr className="border-t border-gray-300" />
                        <div className="flex w-full flex-col gap-3">
                            <h2 className="text-xl font-semibold text-gray-600">
                                2) Property Details
                            </h2>
                            <div className="grid w-full grid-cols-3 gap-4">
                                <Input
                                    name="square_footage"
                                    type="number"
                                    label="Square Footage"
                                    errors={errors}
                                    register={register}
                                />
                                <Select
                                    name="property_condition"
                                    label="Condition"
                                    errors={errors}
                                    register={register}
                                    options={propertyConditions}
                                    placeholder={""}
                                />
                            </div>
                        </div>
                        <hr className="border-t border-gray-300" />
                        <ComparableSales
                            control={control}
                            register={register}
                            errors={errors}
                        />

                        <Button
                            type="submit"
                            className="btn btn-primary text-lg text-white self-end"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </Suspense>
    );
};
export default AppraisalPage;
