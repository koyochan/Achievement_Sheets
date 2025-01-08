export async function GET() {
  return new Response(JSON.stringify({ message: "Hello, Astro!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}