import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import DashboardLayout from "../components/DashboardLayout";
import { dashboardSections } from "../data/layout";

test.each(dashboardSections)(
  "renders section %s",
  (section) => {
    render(<DashboardLayout />);

    expect(screen.getByText(section)).toBeInTheDocument();
  }
);