import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingSkeleton from "../../components/LoadingSkeleton";

describe("LoadingSkeleton", () => {
  it.each(["metrics", "billing", "profile"])(
    "renders the %s loading layout with an accessible label",
    (variant) => {
      render(
        <LoadingSkeleton
          label={`Loading ${variant}`}
          variant={variant}
        />,
      );

      expect(screen.getByRole("status")).toHaveTextContent(`Loading ${variant}`);
      expect(screen.getByTestId(`loading-skeleton-${variant}`)).toBeInTheDocument();
    },
  );
});
