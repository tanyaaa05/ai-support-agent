import { GoogleGenerativeAI } from "@google/generative-ai";

// IMPORTANT: Replace with your actual API key.
// For production, consider using environment variables to keep your API key secure.
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY";

async function chatWithGemini() {
  const genAI = new GoogleGenerativeAI(API_KEY);

  let modelToUse = "";

  try {
    console.log("Listing available Gemini models...");
    const { models } = await genAI.listModels();

    let foundPro = false;
    let foundFlash = false;

    for (const model of models) {
      if (model.supportedMethods.includes("generateContent")) {
        console.log(`Found supported model: ${model.name} (Display Name: ${model.displayName || 'N/A'})`);
        if (model.name.includes("gemini-1.5-pro") && !foundPro) {
          modelToUse = model.name; // Prioritize Gemini 1.5 Pro
          foundPro = true;
        } else if (model.name.includes("gemini-1.5-flash") && !foundFlash && !foundPro) {
          // Use Flash if Pro isn't the first found, or if Pro wasn't found at all yet
          modelToUse = model.name;
          foundFlash = true;
        } else if (!modelToUse && model.name.includes("gemini")) {
          // As a last resort, pick any gemini model if no 1.5-pro or 1.5-flash found yet
          modelToUse = model.name;
        }
      }
    }

    if (!modelToUse) {
      console.error("\nError: No suitable Gemini model found that supports 'generateContent'.");
      console.error("Please ensure your API key is valid, billing is enabled, and there are models available for your region.");
      return;
    }

    console.log(`\nAttempting to use model: ${modelToUse}`);
    const model = genAI.getGenerativeModel({ model: modelToUse });

    // Make the content generation request
    const prompt = "What are the benefits of using AI in education?";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("\n--- Successful AI Response ---");
    console.log(text);

  } catch (error) {
    console.error("\n--- An Error Occurred ---");
    console.error(`Error details: ${error.message}`);

    if (error.message.includes("404 Not Found")) {
      console.error("Reason: The model you tried to use was not found or is deprecated.");
      console.error("Action: The script attempted to find a working model. Please review the 'Found supported model' list above and ensure your code is using one of them.");
    } else if (error.message.includes("quota exceeded")) {
      console.error("Reason: You have exceeded your API usage limits.");
      console.error("Action: Check your Google Cloud project's quotas and billing status. You might need to enable billing or request a quota increase.");
    } else if (error.message.includes("403")) {
        console.error("Reason: Permission denied. Your API key might be incorrect or lacks necessary permissions.");
        console.error("Action: Double-check your API key and ensure it's properly configured in your Google Cloud project.");
    } else {
      console.error("Reason: An unexpected API error occurred.");
      console.error("Action: Check your network connection, API key, and refer to Google's official Gemini API documentation for troubleshooting specific error codes.");
    }
  }
}

// Call the function to start the process
chatWithGemini();
