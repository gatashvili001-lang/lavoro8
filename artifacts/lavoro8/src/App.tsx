import { useEffect, useRef, lazy, Suspense } from "react";
import { LangProvider } from "@/lib/lang-context";
import { ClerkProvider, SignIn, SignUp, useClerk } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import { Switch, Route, useLocation, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Home from "@/pages/home";
import { CookieBanner } from "@/components/cookie-banner";
import { AppSidebar } from "@/components/layout/app-sidebar";

const JobsPage = lazy(() => import("@/pages/jobs"));
const JobsRouterPage = lazy(() => import("@/pages/jobs-router"));
const JobsCountryCityLandingPage = lazy(() => import("@/pages/jobs-landing"));
const ExternalJobDetailPage = lazy(() => import("@/pages/external-job-detail"));
const PublishJobPage = lazy(() => import("@/pages/publish-job"));
const ForCompaniesPage = lazy(() => import("@/pages/for-companies"));
const PricingPage = lazy(() => import("@/pages/pricing"));
const PremiumSuccessPage = lazy(() => import("@/pages/premium-success"));
const AdminPage = lazy(() => import("@/pages/admin"));
const MyApplicationsPage = lazy(() => import("@/pages/my-applications"));
const ApplicationChatPage = lazy(() => import("@/pages/application-chat"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const TerminiPage = lazy(() => import("@/pages/termini"));
const RefundsPage = lazy(() => import("@/pages/refunds"));
const AboutPage = lazy(() => import("@/pages/about"));
const ContactPage = lazy(() => import("@/pages/contact"));
const ThankYouPage = lazy(() => import("@/pages/thank-you"));
const BlogPage = lazy(() => import("@/pages/blog"));
const BlogPostPage = lazy(() => import("@/pages/blog-post"));
const FaqPage = lazy(() => import("@/pages/faq"));
const TrustSafetyPage = lazy(() => import("@/pages/trust-safety"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const msg = error instanceof Error ? error.message : String(error);
        if (msg.includes("401") || msg.includes("Unauthorized")) return false;
        return failureCount < 2;
      },
    },
  },
});

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Chiave Clerk mancante: VITE_CLERK_PUBLISHABLE_KEY");
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
    socialButtonsVariant: "blockButton" as const,
  },
  variables: {
    colorPrimary: "hsl(224, 71%, 40%)",
    colorForeground: "hsl(220, 30%, 15%)",
    colorMutedForeground: "hsl(220, 15%, 45%)",
    colorDanger: "hsl(0, 85%, 60%)",
    colorBackground: "hsl(40, 20%, 98%)",
    colorInput: "hsl(0, 0%, 100%)",
    colorInputForeground: "hsl(220, 30%, 15%)",
    colorNeutral: "hsl(40, 10%, 75%)",
    fontFamily: "'Inter', sans-serif",
    borderRadius: "0.5rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-white rounded-2xl w-[460px] max-w-full overflow-hidden shadow-xl border border-border",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-foreground font-bold font-display",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButtonText: "text-foreground font-medium",
    formFieldLabel: "text-foreground font-medium",
    footerActionLink: "text-primary font-semibold hover:underline",
    footerActionText: "text-muted-foreground",
    dividerText: "text-muted-foreground",
    identityPreviewEditButton: "text-primary",
    formFieldSuccessText: "text-green-600",
    alertText: "text-foreground",
    logoBox: "mb-1",
    logoImage: "h-8 w-auto",
    socialButtonsBlockButton: "border border-border bg-white hover:bg-muted/40 transition-colors",
    formButtonPrimary: "bg-primary hover:bg-primary/90 text-white font-semibold",
    formFieldInput: "border-border bg-white text-foreground placeholder:text-muted-foreground",
    footerAction: "bg-transparent",
    dividerLine: "bg-border",
    alert: "bg-destructive/10 border border-destructive/20 rounded-lg",
    otpCodeFieldInput: "border-border",
    formFieldRow: "gap-4",
    main: "gap-5",
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-muted/20 px-4 py-8">
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
      />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-muted/20 px-4 py-8">
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
      />
    </div>
  );
}

function OnlinePinger() {
  useEffect(() => {
    const sid = Math.random().toString(36).slice(2);
    const ping = () => fetch("/api/online/ping", {
      method: "POST",
      headers: { "x-session-id": sid },
    }).catch(() => {});
    ping();
    const iv = setInterval(ping, 60000);
    return () => clearInterval(iv);
  }, []);
  return null;
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/jobs" component={JobsPage} />
        <Route path="/jobs/ext/:id" component={ExternalJobDetailPage} />
        <Route path="/jobs/:country/:city" component={JobsCountryCityLandingPage} />
        <Route path="/jobs/:id" component={JobsRouterPage} />
        <Route path="/pubblica" component={PublishJobPage} />
        <Route path="/aziende" component={ForCompaniesPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/premium/success" component={PremiumSuccessPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/my-applications/:id" component={ApplicationChatPage} />
        <Route path="/my-applications" component={MyApplicationsPage} />
        <Route path="/profilo" component={ProfilePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/termini" component={TerminiPage} />
        <Route path="/refunds" component={RefundsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/trust-safety" component={TrustSafetyPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/grazie" component={ThankYouPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/sign-in/*?" component={SignInPage} />
        <Route path="/sign-up/*?" component={SignUpPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: "Bentornato",
            subtitle: "Accedi al tuo account lavoro8.com",
          },
        },
        signUp: {
          start: {
            title: "Crea il tuo account",
            subtitle: "Trova lavoro in Italia con lavoro8.com",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <OnlinePinger />
        <TooltipProvider>
          <AppSidebar />
          <Router />
          <Toaster />
          <CookieBanner />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <LangProvider>
      <WouterRouter base={basePath}>
        <ClerkProviderWithRoutes />
        <Analytics />
        <SpeedInsights />
      </WouterRouter>
    </LangProvider>
  );
}

export default App;
