import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, TrendingUp, Users, BarChart3 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
              FD
            </div>
            <span className="font-semibold text-foreground">FlowDeck</span>
          </div>
          <div className="hidden md:flex gap-6">
            <Link href="/customers/health" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
            Keep Customers <span className="text-primary">Healthy</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            Monitor customer health metrics and prioritize outreach with real-time insights. Built for Customer Success teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/customers/health">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Access Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Core Features</h2>
          <p className="text-muted-foreground">Everything you need to manage customer health</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature Card 1 */}
          <Card className="p-6 space-y-4 card-hover">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Real-time Health Scoring</h3>
            <p className="text-sm text-muted-foreground">
              Automatically track and calculate customer health scores based on engagement and usage patterns.
            </p>
          </Card>

          {/* Feature Card 2 */}
          <Card className="p-6 space-y-4 card-hover">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Smart Prioritization</h3>
            <p className="text-sm text-muted-foreground">
              Segment customers by health status to prioritize outreach and allocate resources efficiently.
            </p>
          </Card>

          {/* Feature Card 3 */}
          <Card className="p-6 space-y-4 card-hover">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Detailed Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Get comprehensive insights with health trend charts and activity logs for each customer.
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <Card className="p-8 md:p-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Ready to improve customer retention?</h3>
              <p className="text-muted-foreground">Start monitoring customer health today</p>
            </div>
            <Link href="/customers/health" className="whitespace-nowrap">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-24">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="text-sm text-muted-foreground">© 2026 FlowDeck. Customer Success Made Simple.</p>
        </div>
      </footer>
    </div>
  )
}
