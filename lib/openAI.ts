import OpenAIApi from "openai";

/**
 * OpenAI API wrapper
 */
export const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Get response from OpenAI API
 * @param prompt Prompt string
 * @return Response string
 */
export const getLMResponse = async (prompt: string) => {
    try {
        const res = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });
        return res.choices[0]?.message?.content || "";
    } catch (err) {
        console.log(err);
    }
};
