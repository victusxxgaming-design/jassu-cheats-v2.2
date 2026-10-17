import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, ShieldCheck, Headphones, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shell, ProductCard, DiscordCTA, platformIcon, Pill } from "@/components/site";
import { PRODUCTS, PLATFORMS, FAQS } from "@/lib/data";
import { seo } from "@/lib/seo";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => seo("Premium Game Addons", "Vantix is a premium marketplace for independently made game addons — latest versions only, instant delivery."),
  component: Index,
});

function Index() {
  const featured = PRODUCTS.slice(0, 4);
  const latest = [...PRODUCTS].slice(0, 3);
  return (
    <Shell>
      <section className="relative overflow-hidden border-b">
        <img src={hero} alt="" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover opacity-80 md:object-[70%_50%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
        <div className="absolute inset-0 bg-embers" />
        <div className="container-x relative py-20 md:py-36 animate-rise">
          <Pill tone="primary"><Sparkles className="h-3 w-3" />Free Fire season drop · 8 new panels</Pill>
          <h1 className="mt-6 max-w-2xl text-4xl sm:text-5xl md:text-7xl font-bold uppercase leading-[0.95] tracking-tight">
            Booyah-ready panels,<br /><span className="text-gradient">built for survivors.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">HUDs, sensitivity suites and visual packs for PC, iOS and Android. Always the latest version, delivered instantly.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild><Link to="/store">Shop now <ArrowRight /></Link></Button>
            <Button variant="outline" size="lg" asChild><Link to="/about">How it works</Link></Button>
          </div>
          <div className="mt-14 inline-flex flex-wrap gap-6 sm:gap-10 rounded-xl border bg-background/50 px-6 py-4 text-sm backdrop-blur">
            {[["24k+", "Customers"], ["4.8★", "Avg. rating"], ["<1 min", "Delivery"]].map(([a, b]) => (
              <div key={b}><p className="font-display text-2xl font-bold">{a}</p><p className="text-muted-foreground">{b}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x mt-20">
        <div className="flex items-end justify-between mb-8">
          <div><p className="eyebrow">Featured</p><h2 className="mt-2 text-2xl md:text-4xl font-bold uppercase">Popular addons</h2></div>
          <Link to="/store" className="text-sm text-primary-glow hover:underline flex items-center gap-1">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="container-x mt-24">
        <p className="eyebrow">Platforms</p>
        <h2 className="mt-2 mb-8 text-2xl md:text-4xl font-bold uppercase">Shop by platform</h2>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((pl) => {
            const Icon = platformIcon(pl.id);
            const count = PRODUCTS.filter((p) => p.platform === pl.id).length;
            return (
              <Link key={pl.id} to="/store" search={{ platform: pl.id }} className="surface panel-hover panel-corners group p-6">
                <Icon className="h-6 w-6 text-primary-glow" />
                <p className="mt-10 font-display text-xl font-semibold">{pl.label}</p>
                <p className="text-sm text-muted-foreground">{pl.blurb}</p>
                <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1 group-hover:text-foreground">{count} products <ArrowRight className="h-3 w-3" /></p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-x mt-24">
        <p className="eyebrow">Just updated</p>
        <h2 className="mt-2 mb-8 text-2xl md:text-4xl font-bold uppercase">Latest versions</h2>
        <div className="surface divide-y">
          {latest.map((p) => (
            <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="flex items-center gap-4 p-5 hover:bg-surface-2 transition">
              <span className="font-mono text-sm text-primary-glow w-16 shrink-0">v{p.version}</span>
              <div className="min-w-0 flex-1"><p className="font-medium truncate">{p.name}</p><p className="text-sm text-muted-foreground truncate">{p.notes[0]}</p></div>
              <span className="hidden sm:block text-xs text-muted-foreground">{p.released}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x mt-24 grid gap-4 md:grid-cols-3">
        {[
          [Info, "Clear product info", "Compatibility, requirements and release notes on every page — no guesswork."],
          [Zap, "Instant delivery", "Your activation key and download appear the moment payment clears."],
          [Headphones, "Real support", "Humans on tickets and Discord, 7 days a week, with fast replies."],
        ].map(([Icon, t, d]) => {
          const I = Icon as typeof Zap;
          return (
            <div key={t as string} className="surface panel-hover p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15"><I className="h-5 w-5 text-primary-glow" /></span>
              <h3 className="mt-6 text-lg font-semibold">{t as string}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
            </div>
          );
        })}
      </section>

      <DiscordCTA />

      <section className="container-x mt-24 grid gap-10 md:grid-cols-[1fr_2fr]">
        <div><p className="eyebrow">FAQ</p><h2 className="mt-2 text-2xl md:text-4xl font-bold uppercase">Questions, answered</h2>
          <p className="mt-3 text-muted-foreground flex items-center gap-2"><ShieldCheck className="h-4 w-4" />Secure checkout</p></div>
        <Accordion type="single" collapsible className="surface px-6">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`}><AccordionTrigger>{f.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{f.a}</AccordionContent></AccordionItem>
          ))}
        </Accordion>
      </section>
    </Shell>
  );
}
