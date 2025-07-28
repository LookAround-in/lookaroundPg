export default function formatText(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
