import { PropertyDetails, ComparableSale } from "@/types/types";

export const generateComparableSalesString = (
    comparableSales: ComparableSale[] | undefined
): string => {
    if (!Array.isArray(comparableSales) || comparableSales.length === 0) {
        return "No comparable sales data available.";
    }

    return comparableSales
        .map(
            (sale, index) =>
                `Comparable Sale ${index + 1}:\n\tAddress: ${sale.address}\n\tSale Price: ${sale.sale_price}\n\tSquare Footage: ${sale.square_footage}\n\tProperty Condition: ${sale.property_condition}`
        )
        .join("\n");
};

export const generateAppraisalPrompt = (
    propertyDetails: PropertyDetails
): string => {
    const {
        address,
        city,
        state,
        zip,
        country,
        square_footage,
        property_condition,
        comparable_sales,
    } = propertyDetails;
    return `I need you to act as a real estate appraiser. I will provide you with details about a property and comparable sales, and you will determine the value of the property.
    
Here is the information about the property:
Address: ${address}
City: ${city}
State: ${state}
Zip: ${zip}
Country: ${country}
Square Footage: ${square_footage}
Property Condition: ${property_condition}

Here are the comparable sales:
${generateComparableSalesString(comparable_sales)}

Please provide a detailed appraisal report on the property, including the final value. Be sure to account for any differences between the property and the comparable sales. Please be more elaborate and include indentations and new lines in your response. The appraisal report should be at least 1000 words long.`;
};
