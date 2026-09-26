import { Suspense } from "react";
import MenuBanner from "@/components/MenuBanner";
import MenuBrowser from "@/components/MenuBrowser";

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
