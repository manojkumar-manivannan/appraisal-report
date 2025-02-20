import { Document, Packer, Paragraph, TextRun } from "docx";

/**
 * Converts plain text to a Word document.
 * @param text - The text to convert to a word document.
 * @returns Promise<Buffer> - The Word document as a buffer.
 */
export const generateWordDocument = async (text: string): Promise<Buffer> => {
    // Split text into lines
    const lines = text.split("\n");

    // Create paragraphs for each line
    const paragraphs = lines.map(
        (line) => new Paragraph({ children: [new TextRun(line)] })
    );

    // Create the document
    const doc = new Document({
        sections: [{ properties: {}, children: paragraphs }],
    });

    // Generate and return the Word document buffer
    return await Packer.toBuffer(doc);
};
