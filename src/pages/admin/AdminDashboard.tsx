import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAllCaseStudies } from '@/hooks/useCaseStudies';
import { useContactMessages } from '@/hooks/useContactMessages';
import { useNewsletterSubscribers } from '@/hooks/useNewsletterSubscribers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye, EyeOff, Plus, ArrowRight, MessageSquare, Users } from 'lucide-react';

export default function AdminDashboard() {
  const { data: caseStudies = [] } = useAllCaseStudies();
  const { messages, unreadCount } = useContactMessages();
  const { totalCount: subscriberCount } = useNewsletterSubscribers();

  const publishedCount = caseStudies.filter((s) => s.is_published).length;
  const draftCount = caseStudies.filter((s) => !s.is_published).length;

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1.5">
          Welcome to the Astute Computer CMS
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5 mb-10">
        <Card className="border-border/60 bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Case Studies</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{caseStudies.length}</div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Eye className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{publishedCount}</div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center">
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{draftCount}</div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Messages</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {messages.length}
              {unreadCount > 0 && (
                <span className="ml-2 text-sm font-normal text-destructive">
                  ({unreadCount} new)
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Subscribers</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{subscriberCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start rounded-xl">
              <Link to="/admin/case-studies/new">
                <Plus className="h-4 w-4 mr-2" />
                Create New Case Study
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start rounded-xl">
              <Link to="/admin/case-studies">
                <FileText className="h-4 w-4 mr-2" />
                Manage All Case Studies
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Recent Case Studies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0.5">
            {caseStudies.slice(0, 5).map((study) => (
              <Link
                key={study.id}
                to={`/admin/case-studies/${study.id}`}
                className="flex items-center justify-between py-3 hover:bg-muted/50 px-3 rounded-xl -mx-3 transition-colors"
              >
                <div>
                  <div className="font-medium text-sm">{study.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {study.category}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-3" />
              </Link>
            ))}
            {caseStudies.length === 0 && (
              <p className="text-sm text-muted-foreground py-6 text-center">
                No case studies yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
