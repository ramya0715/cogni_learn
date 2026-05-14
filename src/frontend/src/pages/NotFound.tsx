import { Link } from "@tanstack/react-router";
import { ArrowLeft, Brain, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6 animate-fade-in">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Brain size={40} className="text-primary/60" />
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center">
            <span className="font-display font-bold text-lg text-muted-foreground">
              ?
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-6xl font-bold text-foreground">
            404
          </h1>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            to="/dashboard"
            data-ocid="not_found.dashboard_button"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-smooth flex-1"
          >
            <Home size={16} />
            Go to Dashboard
          </Link>
          <button
            type="button"
            data-ocid="not_found.back_button"
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-muted text-foreground font-medium text-sm hover:bg-muted/80 transition-smooth flex-1"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
