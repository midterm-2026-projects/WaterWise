import { execFileSync, spawn } from "node:child_process";
import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const e2eDirectory = path.dirname(fileURLToPath(import.meta.url));
const frontendDirectory = path.resolve(e2eDirectory, "../../..");
const backendDirectory = path.resolve(frontendDirectory, "../backend");

const processFile = path.join(e2eDirectory, ".server-processes.json");
const frontendUrl =
  process.env.BASE_URL ||
  `http://127.0.0.1:${process.env.E2E_FRONTEND_PORT || "5173"}`;
const frontendPort = new URL(frontendUrl).port || "5173";

const servers = [
  {
    key: "backendPid",
    cwd: backendDirectory,
    args: ["app.js"],
    env: {
      PORT: "5001",
      NODE_ENV: "e2e",
      WATERWISE_E2E: "true",
    },
    healthUrl: "http://127.0.0.1:5001/health",
  },

  {
    key: "frontendPid",
    cwd: frontendDirectory,
    args: [
      "node_modules/vite/bin/vite.js",
      "--host",
      "127.0.0.1",
      "--port",
      frontendPort,
      "--strictPort",
    ],
    env: {
      WATERWISE_API_TARGET: "http://127.0.0.1:5001",
    },
    healthUrl: frontendUrl,
  },
];

async function isReachable(url) {
  try {
    const response = await fetch(url);

    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer(url, child, timeoutMs = 120000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`E2E server exited before becoming ready: ${url}`);
    }

    if (await isReachable(url)) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for E2E server: ${url}`);
}

export async function startServers() {
  const processIds = {};

  try {
    for (const server of servers) {
      const child = spawn(process.execPath, server.args, {
        cwd: server.cwd,

        detached: process.platform !== "win32",

        env: {
          ...process.env,
          ...server.env,
          BROWSER: "none",
        },

        stdio: process.env.CI ? "inherit" : "ignore",

        windowsHide: true,
      });

      child.unref();

      processIds[server.key] = child.pid;

      await waitForServer(server.healthUrl, child);
    }

    await writeFile(processFile, JSON.stringify(processIds), "utf8");
  } catch (error) {
    stopProcess(processIds.frontendPid);

    stopProcess(processIds.backendPid);

    throw error;
  }
}

function stopProcess(pid) {
  if (!pid) {
    return;
  }

  try {
    if (process.platform === "win32") {
      execFileSync("taskkill", ["/PID", String(pid), "/T", "/F"], {
        stdio: "ignore",
        windowsHide: true,
      });
    } else {
      process.kill(-pid, "SIGTERM");
    }
  } catch {
    // already stopped
  }
}

export async function stopServers() {
  let processIds;

  try {
    processIds = JSON.parse(await readFile(processFile, "utf8"));
  } catch {
    return;
  }

  stopProcess(processIds.frontendPid);

  stopProcess(processIds.backendPid);

  await rm(processFile, {
    force: true,
  });
}
