import {genAI} from "../config/genAi.js";

export const refinePromptService = async (prompt) => {
    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are a world-class AI image prompt engineer.

Your task is to transform the USER PROMPT into a professional-grade
image generation prompt suitable for high-end AI image models.

MANDATORY STRUCTURE:
- Output MUST contain **10 to 15 lines**
- Each line MUST be concise (no long sentences)
- Each line MUST focus on exactly ONE visual aspect

LINE GUIDELINES (cover most of these):
1. Main subject description
2. Subject pose / state / expression (if applicable)
3. Environment or setting
4. Foreground details
5. Background details
6. Lighting style
7. Color palette
8. Mood / emotion
9. Atmosphere (fog, rain, dust, glow, etc.)
10. Textures and materials
11. Composition / framing
12. Level of detail
13. Style consistency
14. Image clarity / quality

STRICT RULES:
- Do NOT change the original idea or subject
- Do NOT introduce new objects, characters, or actions
- Do NOT mention artists, camera brands, lenses, or AI model names
- Do NOT add explanations, headings, bullet points, or emojis
- Do NOT use markdown
- Output ONLY the refined multi-line prompt

USER PROMPT:
"${prompt}"
    `,
        config: {
            systemInstruction:
                "You refine raw ideas into structured, cinematic, multi-line prompts optimized for AI image generation.",
        },
    });

    return response.text;
};
