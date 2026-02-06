-- ============================================
-- Supabase Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Blog Posts
CREATE TABLE public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content JSONB NOT NULL DEFAULT '{}',
    content_html TEXT,
    cover_image_url TEXT,
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived')),
    author_id UUID REFERENCES auth.users(id),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    meta_title TEXT,
    meta_description TEXT
);

CREATE INDEX idx_blog_posts_status_published ON blog_posts (status, published_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts (slug);

-- Blog Tags
CREATE TABLE public.blog_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog Post Tags (junction)
CREATE TABLE public.blog_post_tags (
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Portfolio Items
CREATE TABLE public.portfolio_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    media_type TEXT NOT NULL CHECK (media_type IN ('photo', 'video')),
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category TEXT,
    sort_order INT DEFAULT 0,
    width INT,
    height INT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_portfolio_items_category ON portfolio_items (category);
CREATE INDEX idx_portfolio_items_featured ON portfolio_items (is_featured, sort_order);

-- Athletics Services
CREATE TABLE public.athletics_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    price_info TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contact Inquiries
CREATE TABLE public.contact_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Site Settings (single-row)
CREATE TABLE public.site_settings (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    hero_tagline TEXT DEFAULT 'Reality is Negotiable',
    about_text TEXT,
    athletics_intro TEXT,
    athletics_philosophy TEXT,
    contact_email TEXT,
    social_instagram TEXT,
    social_linkedin TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO site_settings (about_text) VALUES ('');

-- Work Experiences
CREATE TABLE public.work_experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    subtitle TEXT,
    description JSONB NOT NULL DEFAULT '{}',
    description_html TEXT,
    header_image_url TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_work_experiences_slug ON work_experiences (slug);

-- Work Timeline Events
CREATE TABLE public.work_timeline_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    experience_id UUID NOT NULL REFERENCES work_experiences(id) ON DELETE CASCADE,
    event_date DATE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    photo_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_work_timeline_experience ON work_timeline_events (experience_id, event_date DESC);

-- Work Featured Posts
CREATE TABLE public.work_featured_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    experience_id UUID NOT NULL REFERENCES work_experiences(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    sort_order INT DEFAULT 0,
    UNIQUE(experience_id, post_id)
);

-- Influences
CREATE TABLE public.influences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('book', 'podcast', 'creator')),
    author TEXT,
    description TEXT,
    image_url TEXT,
    link_url TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_influences_category ON influences (category, sort_order);

-- ============================================
-- Updated_at trigger
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON portfolio_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON athletics_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON work_experiences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON work_timeline_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON influences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE athletics_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_featured_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE influences ENABLE ROW LEVEL SECURITY;

-- Blog posts: public read published, auth full access
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Auth full access blog_posts" ON blog_posts FOR ALL USING (auth.uid() IS NOT NULL);

-- Tags: public read, auth manage
CREATE POLICY "Public read tags" ON blog_tags FOR SELECT USING (true);
CREATE POLICY "Auth manage tags" ON blog_tags FOR ALL USING (auth.uid() IS NOT NULL);

-- Post tags: public read, auth manage
CREATE POLICY "Public read post_tags" ON blog_post_tags FOR SELECT USING (true);
CREATE POLICY "Auth manage post_tags" ON blog_post_tags FOR ALL USING (auth.uid() IS NOT NULL);

-- Portfolio: public read, auth manage
CREATE POLICY "Public read portfolio" ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "Auth manage portfolio" ON portfolio_items FOR ALL USING (auth.uid() IS NOT NULL);

-- Athletics: public read active, auth manage
CREATE POLICY "Public read active services" ON athletics_services FOR SELECT USING (is_active = true);
CREATE POLICY "Auth manage services" ON athletics_services FOR ALL USING (auth.uid() IS NOT NULL);

-- Contact: auth read, public insert
CREATE POLICY "Public submit contact" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth read contacts" ON contact_inquiries FOR SELECT USING (auth.uid() IS NOT NULL);

-- Settings: public read, auth manage
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Auth manage settings" ON site_settings FOR ALL USING (auth.uid() IS NOT NULL);

-- Work experiences: public read active, auth manage
CREATE POLICY "Public read active experiences" ON work_experiences FOR SELECT USING (is_active = true);
CREATE POLICY "Auth manage experiences" ON work_experiences FOR ALL USING (auth.uid() IS NOT NULL);

-- Work timeline: public read, auth manage
CREATE POLICY "Public read timeline" ON work_timeline_events FOR SELECT USING (true);
CREATE POLICY "Auth manage timeline" ON work_timeline_events FOR ALL USING (auth.uid() IS NOT NULL);

-- Work featured posts: public read, auth manage
CREATE POLICY "Public read featured" ON work_featured_posts FOR SELECT USING (true);
CREATE POLICY "Auth manage featured" ON work_featured_posts FOR ALL USING (auth.uid() IS NOT NULL);

-- Influences: public read active, auth manage
CREATE POLICY "Public read active influences" ON influences FOR SELECT USING (is_active = true);
CREATE POLICY "Auth manage influences" ON influences FOR ALL USING (auth.uid() IS NOT NULL);

-- ============================================
-- Storage Policies
-- ============================================

-- Public read from both buckets
CREATE POLICY "Public read storage" ON storage.objects
    FOR SELECT USING (bucket_id IN ('blog-images', 'portfolio-media'));

-- Authenticated users can upload to both buckets
CREATE POLICY "Auth upload storage" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id IN ('blog-images', 'portfolio-media')
        AND auth.uid() IS NOT NULL
    );

-- Authenticated users can update files in both buckets
CREATE POLICY "Auth update storage" ON storage.objects
    FOR UPDATE USING (
        bucket_id IN ('blog-images', 'portfolio-media')
        AND auth.uid() IS NOT NULL
    );

-- Authenticated users can delete from both buckets
CREATE POLICY "Auth delete storage" ON storage.objects
    FOR DELETE USING (
        bucket_id IN ('blog-images', 'portfolio-media')
        AND auth.uid() IS NOT NULL
    );
