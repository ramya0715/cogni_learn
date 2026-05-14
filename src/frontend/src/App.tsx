import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { Layout, PublicLayout } from "./components/layout/Layout";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { useAuth } from "./hooks/useAuth";

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const ModulesPage = lazy(() => import("./pages/Modules"));
const SubjectDetailPage = lazy(() => import("./pages/SubjectDetail"));
const QuizSelectPage = lazy(() => import("./pages/QuizSelect"));
const QuizSessionPage = lazy(() => import("./pages/QuizSession"));
const QuizResultPage = lazy(() => import("./pages/QuizResult"));
const AnalyticsPage = lazy(() => import("./pages/Analytics"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const MockInterviewPage = lazy(() => import("./pages/MockInterview"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const ContactPage = lazy(() => import("./pages/Contact"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

const rootRoute = createRootRoute({ component: () => <Outlet /> });

function PageSuspense({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}

function ProtectedPage({
  component: Component,
}: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading, login } = useAuth();
  if (isLoading) return <LoadingScreen message="Checking authentication..." />;
  if (!isAuthenticated) {
    return (
      <PublicLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
          <div className="glass-card p-8 max-w-sm w-full flex flex-col items-center gap-4 text-center animate-slide-up">
            <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-2xl">🔐</span>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                Sign In Required
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Please sign in with Internet Identity to access this page.
              </p>
            </div>
            <button
              type="button"
              onClick={login}
              data-ocid="auth_guard.login_button"
              className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-smooth"
            >
              Sign In with Internet Identity
            </button>
          </div>
        </div>
      </PublicLayout>
    );
  }
  return (
    <Layout>
      <PageSuspense>
        <Component />
      </PageSuspense>
    </Layout>
  );
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <PageSuspense>
      <HomePage />
    </PageSuspense>
  ),
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <PageSuspense>
      <LoginPage />
    </PageSuspense>
  ),
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <PageSuspense>
      <RegisterPage />
    </PageSuspense>
  ),
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => <ProtectedPage component={DashboardPage} />,
});
const modulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/modules",
  component: () => <ProtectedPage component={ModulesPage} />,
});
const subjectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/modules/$subject",
  component: () => <ProtectedPage component={SubjectDetailPage} />,
});
const quizSelectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: () => <ProtectedPage component={QuizSelectPage} />,
});
const quizResultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz/result/$sessionId",
  component: () => <ProtectedPage component={QuizResultPage} />,
});
const quizSessionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz/$sessionId",
  component: () => <ProtectedPage component={QuizSessionPage} />,
});
const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: () => <ProtectedPage component={AnalyticsPage} />,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => <ProtectedPage component={ProfilePage} />,
});
const mockInterviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mock-interview",
  component: () => <ProtectedPage component={MockInterviewPage} />,
});
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => <ProtectedPage component={SettingsPage} />,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <PageSuspense>
      <ContactPage />
    </PageSuspense>
  ),
});
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => (
    <PageSuspense>
      <NotFoundPage />
    </PageSuspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
  modulesRoute,
  subjectDetailRoute,
  quizSelectRoute,
  quizResultRoute,
  quizSessionRoute,
  analyticsRoute,
  profileRoute,
  mockInterviewRoute,
  settingsRoute,
  contactRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--border))",
            color: "oklch(var(--foreground))",
          },
        }}
      />
    </ThemeProvider>
  );
}
