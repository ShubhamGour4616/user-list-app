import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchUserById } from "../../store/slices/userSlice";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserDetails from ".";
import "@testing-library/jest-dom";

// Mock the necessary hooks
vi.mock("../../hooks/redux", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

// Mock fetchUserById action
vi.mock("../../store/slices/userSlice", () => ({
  fetchUserById: vi.fn(),
}));

describe("UserDetails", () => {
  const mockDispatch = vi.fn();
  const mockUseAppDispatch = useAppDispatch as any;
  const mockUseAppSelector = useAppSelector as any;

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(mockDispatch);
  });

  test("renders loading spinner while data is being fetched", () => {
    mockUseAppSelector.mockReturnValue({
      selectedUser: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Make sure the component includes a loading spinner with data-testid="loading-spinner"
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("renders error message if there is an error fetching user data", () => {
    mockUseAppSelector.mockReturnValue({
      selectedUser: null,
      loading: false,
      error: "Failed to fetch user",
    });

    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Failed to fetch user")).toBeInTheDocument();
  });

  test("renders user details if data is available", async () => {
    const user = {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      phone: "123-456-7890",
      website: "example.com",
      address: {
        street: "123 Main St",
        suite: "Apt 4",
        city: "New York",
        zipcode: "10001",
        geo: { lat: "40.7128", lng: "-74.0060" },
      },
      company: {
        name: "Example Inc.",
        catchPhrase: "Innovation",
        bs: "Business Solutions",
      },
    };

    mockUseAppSelector.mockReturnValue({
      selectedUser: user,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Ensure that user details are rendered correctly
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.username)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(user.phone)).toBeInTheDocument();
    expect(screen.getByText(user.website)).toBeInTheDocument();

    // Change this to use a regular expression to match "New York" more flexibly
    expect(screen.getByText(/New York/i)).toBeInTheDocument(); // Case insensitive match for the city

    expect(screen.getByText(user.company.name)).toBeInTheDocument();
  });

  test("calls dispatch when component mounts if user data is not available", async () => {
    mockUseAppSelector.mockReturnValue({
      selectedUser: null,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Use `waitFor` to ensure dispatch is called after component renders
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(fetchUserById(1))
    );
  });

  test("calls handleBackClick when back button is clicked", () => {
    const user = {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      phone: "123-456-7890",
      website: "example.com",
      address: {
        street: "123 Main St",
        suite: "Apt 4",
        city: "New York",
        zipcode: "10001",
        geo: { lat: "40.7128", lng: "-74.0060" },
      },
      company: {
        name: "Example Inc.",
        catchPhrase: "Innovation",
        bs: "Business Solutions",
      },
    };

    mockUseAppSelector.mockReturnValue({
      selectedUser: user,
      loading: false,
      error: null,
    });

    const spyBack = vi.spyOn(window.history, "back");

    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("← Back"));
    expect(spyBack).toHaveBeenCalled();
  });
});
