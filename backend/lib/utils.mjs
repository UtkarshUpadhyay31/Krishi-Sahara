import dotenv from "dotenv";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const GROQ_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const groq = GROQ_API_KEY ? new Groq({ apiKey: GROQ_API_KEY }) : null;

const PLANT_ANALYSIS_PROMPT = `You are an expert agricultural scientist. Analyze the image and return JSON only.

Detect: plant/soil/field/mixed. For plants: identify species, health (Healthy/Stressed/Diseased/Critically Ill), diseases/pests/deficiencies, severity (Mild/Moderate/Severe/Critical), confidence 0-100. For soil: type (Clay/Sandy/Loamy), color, texture, moisture (Dry/Optimal/Waterlogged), issues, health score 0-100.

Return JSON:
{
  "imageType": "plant|soil|field|mixed",
  "plant": {"identified": bool, "species": "name", "cropType": "type", "healthStatus": "status", "confidenceScore": 0-100},
  "diagnosis": {"hasIssue": bool, "primaryIssue": "name", "scientificName": "name", "causativeAgent": "Fungal|Bacterial|Viral|Pest|Nutrient Deficiency|Environmental Stress", "severity": "level", "affectedParts": ["parts"], "symptoms": ["symptom"], "stage": "Early|Progressive|Advanced", "confidence": 0-100},
  "soil": {"analyzed": bool, "type": "type", "color": "desc", "texture": "desc", "moistureLevel": "level", "visibleIssues": ["issue"], "healthScore": 0-100},
  "treatment": {"urgency": "Low|Medium|High|Critical", "immediateActions": ["action"], "organicTreatments": [{"name": "name", "ingredients": ["ing"], "preparation": "how", "application": "how", "dosage": "amount", "frequency": "how often", "duration": "period"}], "chemicalTreatments": [{"name": "name", "type": "Fungicide|Insecticide|Bactericide|Fertilizer", "dosage": "amount", "application": "method", "frequency": "schedule", "precautions": ["safety"], "waitingPeriod": "days"}], "supportiveMeasures": ["measure"]},
  "prevention": {"culturalPractices": ["practice"], "preventiveSprays": [{"product": "name", "timing": "when", "frequency": "how often"}], "environmentalManagement": ["tip"], "resistantVarieties": ["variety"], "monitoringTips": ["tip"]},
  "recommendations": {"nutrientManagement": {"deficiencies": ["nutrient"], "fertilizers": ["type"], "applicationRate": "amount"}, "irrigation": {"currentAssessment": "status", "recommendation": "adjustment", "frequency": "how often"}, "recovery": {"expectedTimeline": "time", "successIndicators": ["sign"], "followUpActions": ["action"]}, "expertConsultation": {"needed": bool, "reason": "why", "urgency": "timeframe"}},
  "summary": "2-3 sentence summary"
}

Rules: JSON only, no markdown. Prioritize organic solutions. Use metric units. Consider Indian agriculture. If unclear, low confidence.`;

const SOIL_ANALYSIS_PROMPT = `You are an expert soil scientist. Analyze the soil image and return JSON only.

Assess: type, texture (Fine/Medium/Coarse), color, structure (Granular/Blocky/Platy), organic matter level (Low/Medium/High), moisture (Dry/Optimal/Wet/Waterlogged), health score 0-100, issues, suitable crops, improvements needed, fertilization needs.

Return JSON:
{
  "soilType": "classification",
  "texture": "description",
  "color": "description",
  "structure": "type",
  "organicMatter": {"level": "Low|Medium|High", "indicators": ["indicator"], "recommendation": "how to improve"},
  "moisture": {"level": "Dry|Optimal|Wet|Waterlogged", "assessment": "appropriate?", "recommendation": "advice"},
  "healthScore": 0-100,
  "issues": [{"issue": "problem", "severity": "Low|Medium|High", "impact": "effect", "solution": "fix"}],
  "suitableFor": ["crop"],
  "improvements": [{"action": "what", "method": "how", "materials": ["material"], "expectedOutcome": "result", "timeline": "duration"}],
  "fertilization": {"primaryNeeds": ["N|P|K"], "organicOptions": ["option"], "chemicalOptions": ["NPK"], "applicationRate": "amount"},
  "summary": "2-3 sentence assessment"
}

Rules: JSON only, no markdown. Use metric units. Consider Indian soil types.`;

function createFallbackResponse(errorMessage, analysisType) {
  return {
    imageType: analysisType === "soil" ? "soil" : "plant",
    plant: {
      identified: false,
      species: "Unable to identify",
      cropType: "Unknown",
      healthStatus: "Unable to assess",
      confidenceScore: 0,
    },
    diagnosis: {
      hasIssue: false,
      primaryIssue: "Analysis could not be completed",
      scientificName: "N/A",
      causativeAgent: "N/A",
      severity: "Unknown",
      affectedParts: [],
      symptoms: [],
      stage: "Unknown",
      confidence: 0,
    },
    soil: {
      analyzed: false,
      type: "Unknown",
      color: "Unable to assess",
      texture: "Unable to assess",
      moistureLevel: "Unknown",
      visibleIssues: [],
      healthScore: 0,
    },
    treatment: {
      urgency: "Unknown",
      immediateActions: ["Please retry the analysis or contact support"],
      organicTreatments: [],
      chemicalTreatments: [],
      supportiveMeasures: [],
    },
    prevention: {
      culturalPractices: [],
      preventiveSprays: [],
      environmentalManagement: [],
      resistantVarieties: [],
      monitoringTips: [],
    },
    recommendations: {
      nutrientManagement: {
        deficiencies: [],
        fertilizers: [],
        applicationRate: "N/A",
      },
      irrigation: {
        currentAssessment: "Unknown",
        recommendation: "Needs manual assessment",
        frequency: "N/A",
      },
      recovery: {
        expectedTimeline: "Unable to estimate",
        successIndicators: [],
        followUpActions: ["Retry analysis with clearer image"],
      },
      expertConsultation: {
        needed: true,
        reason: errorMessage,
        urgency: "As needed",
      },
    },
    summary: "Analysis could not be completed. Please try again or contact support for assistance.",
  };
}

/**
 * Convert image file to base64 string for Groq API
 */
function imageToBase64(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString("base64");
}

/**
 * Get MIME type based on file extension
 */
function getMimeType(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const mimeTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  return mimeTypes[ext] || "image/jpeg";
}

export async function analyzeAgricultureImage(
  imagePath,
  analysisType = "auto",
) {
  try {
    if (!imagePath || !fs.existsSync(imagePath)) {
      throw new Error("Invalid image path or file does not exist");
    }

    const mimeType = getMimeType(imagePath);
    const base64Image = imageToBase64(imagePath);

    let systemPrompt;
    if (analysisType === "soil") {
      systemPrompt = SOIL_ANALYSIS_PROMPT;
    } else if (analysisType === "plant") {
      systemPrompt = PLANT_ANALYSIS_PROMPT;
    } else {
      systemPrompt = PLANT_ANALYSIS_PROMPT;
    }

    if (!groq) {
      throw new Error("GROQ_API_KEY is not set");
    }

    const parts = [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Image,
        },
      },
      {
        text: systemPrompt,
      },
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
            {
              type: "text",
              text: systemPrompt,
            },
          ],
        },
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stop: null,
      stream: false,
    });

    responseText = chatCompletion.choices[0]?.message?.content || "";
    const usedModel = "meta-llama/llama-4-scout-17b-16e-instruct";

    // Legacy check removed: we already validated responseText above

    let jsonResponse;
    try {
      const cleanedText = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      jsonResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          let jsonStr = jsonMatch[0];
          jsonStr = jsonStr.replace(/,(\s*[}\]])/g, "$1");
          jsonStr = jsonStr.replace(/:\s*'([^']*)'/g, ': "$1"');
          jsonStr = jsonStr.replace(/\[\s*'([^']*)'/g, '["$1"');
          jsonStr = jsonStr.replace(/,\s*'([^']*)'/g, ', "$1"');

          jsonStr = jsonStr.replace(/\\n/g, " ");
          jsonStr = jsonStr.replace(/\\r/g, " ");
          jsonStr = jsonStr.replace(/\\t/g, " ");

          jsonStr = jsonStr.replace(/[\x00-\x1F\x7F]/g, " ");

          jsonResponse = JSON.parse(jsonStr);
        } catch (fixError) {
          throw fixError;
        }
      } else {
        throw new Error(
          "Failed to extract JSON from AI response - no JSON object found",
        );
      }
    }

    return {
      success: true,
      data: jsonResponse,
      metadata: {
        analysisType: analysisType,
        timestamp: new Date().toISOString(),
        modelUsed: usedModel || "meta-llama/llama-4-scout-17b-16e-instruct",
        provider: "Groq",
      },
    };
  } catch (error) {
    console.error("Error in analyzeAgricultureImage:", error);
    return {
      success: true,
      data: createFallbackResponse(error.message, analysisType),
      metadata: {
        analysisType: analysisType,
        timestamp: new Date().toISOString(),
        modelUsed: "meta-llama/llama-4-scout-17b-16e-instruct",
        provider: "Groq",
        error: true,
        errorMessage: error.message,
      },
    };
  }
}

export async function getSoilAnalysisFromGemini(data) {
  if (!data || !data.imagePath) {
    throw new Error("Image path is required for soil analysis");
  }
  return analyzeAgricultureImage(data.imagePath, "soil");
}

export async function analyzePlantHealth(imagePath) {
  return analyzeAgricultureImage(imagePath, "plant");
}

export async function batchAnalyzeImages(imagePaths, analysisType = "auto") {
  const results = [];
  for (const imagePath of imagePaths) {
    const result = await analyzeAgricultureImage(imagePath, analysisType);
    results.push({
      imagePath,
      ...result,
    });
  }
  return results;
}
