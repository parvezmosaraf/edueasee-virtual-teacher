
import { toast } from "sonner";

const GEMINI_API_KEY = "AIzaSyCTsDo18vf2eq-_AVtDCN2KUcAzOKuNfNY";
const API_URL = "https://generativelanguage.googleapis.com/v1";

type GeminiModel = "models/gemini-1.5-pro" | "models/gemini-1.5-pro-vision";

export interface GeminiPrompt {
  text: string;
}

export interface GeminiContent {
  parts: {
    text?: string;
    inlineData?: {
      mimeType: string;
      data: string;
    };
  }[];
}

export interface GeminiRequestParams {
  contents: GeminiContent[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
    stopSequences?: string[];
  };
}

export const generateText = async (prompt: string, model: GeminiModel = "models/gemini-1.5-pro") => {
  try {
    const endpoint = `${API_URL}/${model}:generateContent?key=${GEMINI_API_KEY}`;
    
    const requestData: GeminiRequestParams = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate text");
    }
    
    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || "";
  } catch (error) {
    console.error("Error generating text:", error);
    toast.error(error instanceof Error ? error.message : "Failed to generate text");
    return "";
  }
};

export const generateTextWithImage = async (prompt: string, imageFile: File) => {
  try {
    const endpoint = `${API_URL}/models/gemini-1.5-pro-vision:generateContent?key=${GEMINI_API_KEY}`;
    
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile);
    
    const requestData: GeminiRequestParams = {
      contents: [
        {
          parts: [
            { 
              text: prompt 
            },
            {
              inlineData: {
                mimeType: imageFile.type,
                data: base64Image.split(',')[1] // Remove data URL prefix
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to analyze image");
    }
    
    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || "";
  } catch (error) {
    console.error("Error generating text with image:", error);
    toast.error(error instanceof Error ? error.message : "Failed to analyze image");
    return "";
  }
};

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const rewriteText = async (text: string) => {
  const response = await generateText(`Rewrite the following text in a more academic and professional tone, maintaining clarity and coherence: \n\n${text}`);
  return {
    rewrittenText: response,
    improvements: [
      "Enhanced academic tone",
      "Improved clarity and coherence",
      "Professional language usage",
      "Better sentence structure"
    ],
    readabilityScore: "Professional",
    wordCount: response.split(/\s+/).length
  };
};

export const paraphraseText = async (text: string) => {
  const response = await generateText(`Paraphrase the following text with different wording while maintaining the original meaning: \n\n${text}`);
  return {
    paraphrasedText: response,
    changes: [
      "Alternative word choices",
      "Restructured sentences",
      "Preserved meaning",
      "Natural flow"
    ],
    originalLength: text.split(/\s+/).length,
    newLength: response.split(/\s+/).length
  };
};

export const correctGrammar = async (text: string) => {
  const response = await generateText(`Correct any grammatical errors, spelling mistakes, or awkward phrasing in the following text. Provide a list of corrections made: \n\n${text}`);
  
  // Split the response into corrections and corrected text
  const parts = response.split('\n\nCorrected Text:\n');
  const corrections = parts[0].split('\n').filter(line => line.trim());
  const correctedText = parts[1] || response;

  return {
    correctedText,
    corrections,
    errorCount: corrections.length,
    suggestionCount: corrections.length,
    readabilityImprovement: "Enhanced"
  };
};

export const solveEquation = async (equation: string) => {
  const response = await generateText(`Solve the following equation step by step, showing all work and explaining each step: \n\n${equation}`);
  
  return response;
};

export const solveEquationFromImage = async (imageFile: File) => {
  const prompt = "Identify and solve the mathematical equation in this image. Please show step-by-step work and explain each step clearly. If there are multiple equations, solve each one separately.";
  
  const response = await generateTextWithImage(prompt, imageFile);
  
  return response;
};

export const analyzeDocument = async (text: string) => {
  const response = await generateText(`
    Analyze the following document and provide:
    1. A comprehensive summary
    2. Key points
    3. Main topics
    4. Suggestions for improvement
    
    Document:
    ${text}
  `);

  // Parse the response into structured sections
  const sections = response.split('\n\n');
  
  return {
    summary: sections[0] || "No summary available",
    keyPoints: (sections[1] || "").split('\n').filter(point => point.trim()),
    topics: (sections[2] || "").split(',').map(topic => topic.trim()),
    suggestions: (sections[3] || "").split('\n').filter(suggestion => suggestion.trim())
  };
};

export const solveAssignment = async (assignment: string, subject: string) => {
  const response = await generateText(`
    This is a ${subject} assignment. Please provide:
    1. A detailed solution
    2. Step-by-step explanation (list at least 5-7 detailed steps with clear explanations for each)
    3. Key concepts used
    4. Additional resources
    
    Assignment:
    ${assignment}
  `);

  // Parse the response
  const solutionMatch = response.match(/(?:Solution|Detailed Solution|Answer):?\s*([\s\S]*?)(?=\n\s*(?:Step|Explanation|Step-by-Step|Key Concepts|Additional|$))/i);
  const solution = solutionMatch ? solutionMatch[1].trim() : response.substring(0, 500);
  
  // Extract explanation steps - look for numbered items (1., 2., etc.)
  const explanationSection = response.match(/(?:Step-by-Step|Steps|Explanation):?\s*([\s\S]*?)(?=\n\s*(?:Key Concepts|Additional|$))/i);
  let explanation: string[] = [];
  
  if (explanationSection && explanationSection[1]) {
    // Extract each step - look for numbered items (1., 2., etc.) or bullet points
    const stepsText = explanationSection[1].trim();
    // Match numbered steps like "1. Step one" or "Step 1:" or bullet points "• Step one"
    const stepMatches = stepsText.match(/(?:^|\n)\s*(?:\d+\.|\d+\)|\•|\*|\-)\s*(.*(?:\n(?!\s*(?:\d+\.|\d+\)|\•|\*|\-|\n)).*)*)/gm);
    
    if (stepMatches && stepMatches.length > 0) {
      explanation = stepMatches.map(step => step.trim());
    } else {
      // If no steps found with the pattern, split by double newlines as fallback
      explanation = stepsText.split(/\n\s*\n/).filter(s => s.trim().length > 0);
    }
  }
  
  // If we still don't have steps, create some based on paragraphs in the solution
  if (explanation.length === 0) {
    const paragraphs = solution.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    explanation = paragraphs.length > 1 
      ? paragraphs.map((p, i) => `${i+1}. ${p}`) 
      : [`1. ${solution.substring(0, 200)}...`];
  }
  
  // Extract key concepts
  const conceptsSection = response.match(/(?:Key Concepts|Concepts Used|Important Concepts):?\s*([\s\S]*?)(?=\n\s*(?:Additional|$))/i);
  let concepts: string[] = [];
  
  if (conceptsSection && conceptsSection[1]) {
    const conceptsText = conceptsSection[1].trim();
    const conceptMatches = conceptsText.match(/(?:^|\n)\s*(?:\d+\.|\d+\)|\•|\*|\-)\s*(.*(?:\n(?!\s*(?:\d+\.|\d+\)|\•|\*|\-|\n)).*)*)/gm);
    
    if (conceptMatches && conceptMatches.length > 0) {
      concepts = conceptMatches.map(concept => concept.trim());
    } else {
      concepts = conceptsText.split(/\n/).filter(s => s.trim().length > 0);
    }
  }
  
  // Extract additional resources
  const resourcesSection = response.match(/(?:Additional Resources|Resources|References):?\s*([\s\S]*?)$/i);
  let resources: string[] = [];
  
  if (resourcesSection && resourcesSection[1]) {
    const resourcesText = resourcesSection[1].trim();
    const resourceMatches = resourcesText.match(/(?:^|\n)\s*(?:\d+\.|\d+\)|\•|\*|\-)\s*(.*(?:\n(?!\s*(?:\d+\.|\d+\)|\•|\*|\-|\n)).*)*)/gm);
    
    if (resourceMatches && resourceMatches.length > 0) {
      resources = resourceMatches.map(resource => resource.trim());
    } else {
      resources = resourcesText.split(/\n/).filter(s => s.trim().length > 0);
    }
  }
  
  // Ensure we have at least one item in each section
  if (explanation.length === 0) explanation = ["The solution process is straightforward as shown above."];
  if (concepts.length === 0) concepts = [`Key ${subject} principles applied to solve this problem.`];
  if (resources.length === 0) resources = [`Standard ${subject} textbooks and course materials.`];

  return {
    solution,
    explanation,
    concepts,
    resources,
    subject,
    difficulty: "Intermediate"
  };
};
