export default function formatText(text: string): string {
  const cleaned = text.replace(/_/g, " ");
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}
export function formatRating(rating: number | null | undefined): string {
  if (typeof rating !== "number" || isNaN(rating) || rating < 0 || rating > 5) {
    return "0.0";
  } else {
    return rating.toFixed(1);
  }
}
