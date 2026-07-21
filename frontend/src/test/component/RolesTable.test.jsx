import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import RolesTable from "../../components/RolesTable";

const mockRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access",
    permissions: ["Create", "Edit", "Delete"],
    usersAssigned: 5,
    dateCreated: "2026-06-23",
  },
  {
    id: 2,
    name: "Staff",
    description: "Limited access",
    permissions: ["View"],
    usersAssigned: 10,
    dateCreated: "2026-06-20",
  },
];

describe("RolesTable", () => {
  test("renders all roles correctly", () => {
    render(<RolesTable roles={mockRoles} />);

    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("Staff")).toBeInTheDocument();
    expect(screen.getByText("Full system access")).toBeInTheDocument();
    expect(screen.getByText("Limited access")).toBeInTheDocument();
  });

  test("calls onEdit when Edit button is clicked", () => {
    const handleEdit = vi.fn();

    render(
      <RolesTable
        roles={mockRoles}
        onEdit={handleEdit}
      />
    );

    const editButtons = screen.getAllByText("Edit");

    fireEvent.click(editButtons[0]);

    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(mockRoles[0]);
  });

  test("calls onDelete when Delete button is clicked", () => {
    const handleDelete = vi.fn();

    render(
      <RolesTable
        roles={mockRoles}
        onDelete={handleDelete}
      />
    );

    const deleteButtons = screen.getAllByText("Delete");

    fireEvent.click(deleteButtons[0]);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(1);
  });

  test("displays empty state when no roles exist", () => {
    render(<RolesTable roles={[]} />);

    expect(
      screen.getByText("No roles available.")
    ).toBeInTheDocument();
  });
});