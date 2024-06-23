
import { Suspense } from "react";
import { listRegions } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";
import { Navbar } from "flowbite-react"; // Assuming you are using Flowbite React components
import Link from 'next/link'; // Assuming you are using Next.js for routing

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions);

  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {process.env.FEATURE_SEARCH_ENABLED && (
          <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/search"
            scroll={false}
            data-testid="nav-search-link"
          >
            Search
          </LocalizedClientLink>
        )}
        <LocalizedClientLink
          className="hover:text-ui-fg-base"
          href="/account"
          data-testid="nav-account-link"
        >
          Account
        </LocalizedClientLink>
        <Suspense
          fallback={
            <LocalizedClientLink
              className="hover:text-ui-fg-base flex gap-2"
              href="/cart"
              data-testid="nav-cart-link"
            >
              Cart (0)
            </LocalizedClientLink>
          }
        >
          <CartButton />
        </Suspense>
        <Navbar.Link as={Link} href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/about">
          About
        </Navbar.Link>
        <Navbar.Link as={Link} href="/services">
          Services
        </Navbar.Link>
        <Navbar.Link as={Link} href="/pricing">
          Pricing
        </Navbar.Link>
        <Navbar.Link as={Link} href="/contact">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}