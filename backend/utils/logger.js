// Simple logger utility (can be replaced with winston or similar)
export const log = (msg) => {
  console.log(`[LOG] ${new Date().toISOString()} - ${msg}`);
};
export const error = (msg) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`);
};
export const warn = (msg) => {
  console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`);
};
