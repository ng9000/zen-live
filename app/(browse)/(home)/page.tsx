import { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_components/results";

export default function Home() {
  return (
    <div className="h-full max-w-screen-2xl mx-auto p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
