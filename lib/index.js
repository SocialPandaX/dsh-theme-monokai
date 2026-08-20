import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

/** Host half of dsh-theme-monokai: persists the theme choice on the server so
 * it survives browser storage eviction, origin/port changes, and dsh restarts. */
export const inject = ["webServer"];

function preferenceFile() {
  const home = process.env.DSH_HOME || path.join(os.homedir(), ".dsh");
  return path.join(home, "dsh-theme-monokai.json");
}

async function readTheme() {
  try {
    const raw = await fs.readFile(preferenceFile(), "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.theme === "string") return parsed.theme;
  } catch {
    // missing/invalid file means no saved server preference
  }
  return null;
}

async function writeTheme(theme) {
  const file = preferenceFile();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify({ theme }), "utf8");
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(payload));
}

export function apply(ctx) {
  const server = ctx.get("webServer");
  if (!server) return;

  ctx.effect(() => server.register({
    kind: "exact",
    path: "/dsh-theme-monokai/preference",
    handler: async (req, res) => {
      try {
        if (req.method === "GET") {
          sendJson(res, 200, { theme: await readTheme() });
          return;
        }
        if (req.method === "POST") {
          let body = "";
          for await (const chunk of req) body += chunk;
          let theme = null;
          try {
            theme = JSON.parse(body).theme ?? null;
          } catch {
            theme = null;
          }
          if (typeof theme !== "string" || theme.length > 64) {
            sendJson(res, 400, { ok: false, error: "invalid theme" });
            return;
          }
          await writeTheme(theme);
          sendJson(res, 200, { ok: true, theme });
          return;
        }
        res.writeHead(405);
        res.end();
      } catch (error) {
        sendJson(res, 500, { ok: false, error: String(error) });
      }
    }
  }), "dsh-theme-monokai: preference route");
}
