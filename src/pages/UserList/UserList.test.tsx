import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchUsers } from "../../store/slices/userSlice";
import { MemoryRouter } from "react-router-dom";
import UserList from ".";
import "@testing-library/jest-dom";

// Mock the necessary hooks
vi.mock("../../hooks/redux", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

// Mock fetchUsers action
vi.mock("../../store/slices/userSlice", () => ({
  fetchUsers: vi.fn(),
}));

describe("UserList", () => {
  const mockDispatch = vi.fn();
  const mockUseAppDispatch = useAppDispatch as any;
  const mockUseAppSelector = useAppSelector as any;

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(mockDispatch);
  });

  test("renders loading spinner while data is being fetched", () => {
    mockUseAppSelector.mockReturnValue({
      users: [],
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("renders error message if there is an error fetching users", () => {
    mockUseAppSelector.mockReturnValue({
      users: [],
      loading: false,
      error: "Failed to fetch users",
    });

    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    expect(screen.getByText("Failed to fetch users")).toBeInTheDocument();
  });

  test("renders users list correctly", async () => {
    const users = [
      {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
      },
      {
        id: 2,
        name: "Jane Doe",
        username: "janedoe",
        email: "jane@example.com",
      },
    ];

    mockUseAppSelector.mockReturnValue({
      users: users,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  test("calls dispatch to fetch users when component mounts", () => {
    mockUseAppSelector.mockReturnValue({
      users: [],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalledWith(fetchUsers());
  });

  test("handles page change when pagination button is clicked", () => {
    const users = [
      {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
      },
      {
        id: 2,
        name: "Jane Doe",
        username: "janedoe",
        email: "jane@example.com",
      },
    ];

    mockUseAppSelector.mockReturnValue({
      users: users,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Next →"));
    expect(mockDispatch).toHaveBeenCalled();
  });
});
