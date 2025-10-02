import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import IntoTheism from "@/pages/IntoTheism";
import PublishedWorks from "@/pages/PublishedWorks";
import About from "@/pages/About";
import Media from "@/pages/Media";
import Contact from "@/pages/Contact";
import Shop from "@/pages/Shop";
import Success from "@/pages/Success";
import RequestProposal from "@/pages/RequestProposal";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/into-theism" component={IntoTheism} />
      <Route path="/published-works" component={PublishedWorks} />
      <Route path="/about" component={About} />
      <Route path="/media" component={Media} />
      <Route path="/contact" component={Contact} />
      <Route path="/shop" component={Shop} />
      <Route path="/success" component={Success} />
      <Route path="/request-proposal" component={RequestProposal} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
