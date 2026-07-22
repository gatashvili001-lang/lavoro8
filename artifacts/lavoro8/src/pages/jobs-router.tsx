import { useParams } from "wouter";
import { parseJobsSlug } from "@/lib/seo-slugs";
import { JobsLandingContent } from "@/pages/jobs-landing";
import JobDetailPage from "@/pages/job-detail";

export default function JobsRouterPage() {
  const { id } = useParams<{ id: string }>();
  const parsed = parseJobsSlug(id);

  if (parsed?.type === "country") {
    return (
      <JobsLandingContent
        countryCode={parsed.countryCode}
        countryLabel={parsed.countryLabel}
        countryFlag={parsed.countryFlag}
        path={`/jobs/${parsed.countrySlug}`}
      />
    );
  }

  if (parsed?.type === "combo") {
    return (
      <JobsLandingContent
        countryCode={parsed.countryCode}
        countryLabel={parsed.countryLabel}
        countryFlag={parsed.countryFlag}
        category={parsed.category}
        path={`/jobs/${parsed.categorySlug}-${parsed.countrySlug}`}
      />
    );
  }

  return <JobDetailPage />;
}
