export default {
  async fetch(request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return new Response("Hello World!");
  },
} satisfies ExportedHandler<Env>;
