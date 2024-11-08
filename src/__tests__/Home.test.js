import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import Home from "../ClientPages/Home";
import userEvent from "@testing-library/user-event";
import SubscriptionCards from "../components/SubscriptionCards";
import HomeContent from "../components/HomeContent";
import { wait } from "@testing-library/user-event/dist/utils";
import { act } from "react-dom/test-utils";

describe("Home Page Testing", () => {
  let screenCon = null;
  let pathHistory = null;
  let _queryByText = null;
  let _getByText = null;
  beforeEach(async () => {
    await act(async () => {
      const { container, getByText, queryByText, history } =
        await renderWithProviders(<Home />);
      screenCon = container;
      (_getByText = getByText), (_queryByText = queryByText);
      // pathHistory = history;
    });
  });

  describe("Carousel Section", () => {
    test("at least one carousel image", () => {
      const carousels = screenCon.getElementsByClassName("carousel-item");
      expect(carousels.length).toBeGreaterThan(0);
    });

    test("check subscribe button", () => {
      const button = screen.getByRole("button", {
        name: /subscribe to watch/i,
        hidden: true,
      });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Bharat ka OTT Section", () => {
    test("testing heading", () => {
      expect(screen.getByText(/bharat ka ott/i)).toBeInTheDocument();
    });

    test("search box", () => {
      const searchBox = screen.getByPlaceholderText(
        /Search for facts & Truth \/series\/podcasts/i
      );
      expect(searchBox).toBeInTheDocument();
      expect(searchBox).toHaveAttribute("type", "search");
      expect(searchBox).not.toHaveAttribute("type", "senarch");
    });

    test("clicking options below search box", () => {
      const movieBtn = screen.getByRole("button", { name: /movies/i });
      expect(movieBtn).toBeInTheDocument();

      const searchBox = screen.getByPlaceholderText(
        /Search for facts & Truth \/series\/podcasts/i
      );
      expect(searchBox).toBeInTheDocument();

      // userEvent.click(screen.getByRole('button', { name: /movies/i }));
      // expect(searchBox).toHaveTextContent(/movies/i);
    });
  });

  describe("Recently Uploaded Section", () => {
    beforeEach(async () => {
      await wait(2000);
    });

    test("testing heading", async () => {
      await waitFor(async () => {
        const text = await _getByText(/recently/i);
        expect(text).toBeInTheDocument();
      });
    });

    test("testing video thumnail", async () => {
      await waitFor(async () => {
        const img = (await screenCon.getElementsByClassName("thumbnail"))[0];

        expect(img.getAttribute("src")).toMatch(/^https:\/\/adelaide-car/i);
      });
    });

    test("testing navigation", async () => {
      await waitFor(async () => {});
    });
  });

  describe("Subscription Plan Section", () => {
    renderWithProviders(<SubscriptionCards />);
    test("testing heading", () => {
      expect(screen.getByText(/Subscription Plans/i)).toBeInTheDocument();
    });
  });

  describe("What Everywhere Section", () => {
    test("testing heading", () => {
      expect(screen.getByText(/what everywhere/i)).toBeInTheDocument();
    });

    test("testing get started button", () => {
      const getStartBtn = screen.getByRole("button", { name: /get started/i });
      expect(getStartBtn).toBeInTheDocument();

      fireEvent.click(getStartBtn);
      expect(window.location.pathname).toBe("/auth/signup");
    });
  });

  describe("FAQ Section", () => {
    test("testing heading", () => {
      expect(
        screen.getByText(/Frequently Asked questions/i)
      ).toBeInTheDocument();
    });
  });
});
