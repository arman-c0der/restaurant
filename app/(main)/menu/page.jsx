import { Suspense } from "react";
import MenuBanner from "./components/MenuBanner";
import MenuBrowser from "./components/MenuBrowser";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components


export default function MenuPage() {
  return (
    <main>
      <MenuBanner />
      <div className="pt-8">
        <Suspense fallback={null}>
          <MenuBrowser />
        </Suspense>
      </div>
    </main>
  );
}
