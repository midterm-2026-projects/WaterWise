import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PWAInstallPrompt from "../../components/PWAInstallPrompt";

function createInstallEvent(outcome = "accepted") {
  const event = new Event("beforeinstallprompt", { cancelable: true });
  event.prompt = vi.fn().mockResolvedValue(undefined);
  event.userChoice = Promise.resolve({ outcome, platform: "web" });
  return event;
}

describe("PWAInstallPrompt", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("binds the installability event and invokes the browser prompt", async () => {
    const installEvent = createInstallEvent();
    render(<PWAInstallPrompt />);

    expect(screen.queryByTestId("pwa-install-prompt")).not.toBeInTheDocument();

    fireEvent(window, installEvent);

    expect(screen.getByTestId("pwa-install-prompt")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Install app" }));

    expect(installEvent.defaultPrevented).toBe(true);
    expect(installEvent.prompt).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(screen.queryByTestId("pwa-install-prompt")).not.toBeInTheDocument();
    });
  });

  it("hides a dismissed prompt for the rest of the browser session", () => {
    render(<PWAInstallPrompt />);
    fireEvent(window, createInstallEvent("dismissed"));
    fireEvent.click(screen.getByRole("button", { name: "Not now" }));

    expect(screen.queryByTestId("pwa-install-prompt")).not.toBeInTheDocument();

    fireEvent(window, createInstallEvent());
    expect(screen.queryByTestId("pwa-install-prompt")).not.toBeInTheDocument();
  });

  it("clears the prompt after the application is installed", () => {
    render(<PWAInstallPrompt />);
    fireEvent(window, createInstallEvent());

    expect(screen.getByTestId("pwa-install-prompt")).toBeInTheDocument();
    fireEvent(window, new Event("appinstalled"));
    expect(screen.queryByTestId("pwa-install-prompt")).not.toBeInTheDocument();
  });
});
