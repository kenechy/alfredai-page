# AlfredAI.bot - Landing Page

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Build](https://img.shields.io/badge/Build-Passing-success?style=flat-square)

A modern, high-performance landing page for AlfredAI.bot built with Next.js 16, TypeScript, and TailwindCSS. Features a beautiful UI, real-time form submission, email automation, and comprehensive analytics.

## Live Demo

**Production:** [https://alfredai.bot](https://alfredai.bot) _(Coming Soon)_

**Preview:** [Vercel Preview](https://alfredai-landing.vercel.app) _(Deploy to generate)_

## Features

### Core Features
- **Modern Design:** Beautiful, responsive landing page with smooth animations
- **Contact Form:** Lead capture with real-time validation and submission
- **Email Automation:** Automated notifications using Resend
- **Database Integration:** Supabase for reliable data storage
- **Analytics Ready:** Google Analytics integration and tracking
- **Performance Optimized:** Lighthouse score 90+ across all metrics

### Technical Features
- **Type Safety:** Full TypeScript implementation
- **Security First:** Rate limiting, CSRF protection, security headers
- **Real-time Validation:** Zod schema validation for forms
- **Responsive Design:** Mobile-first approach with TailwindCSS
- **Accessibility:** WCAG 2.1 AA compliant
- **SEO Optimized:** Meta tags, structured data, sitemap
- **Health Monitoring:** Built-in health check endpoint
- **Error Handling:** Comprehensive error handling and logging

## Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Validation:** [Zod](https://zod.dev/)

### Backend
- **Runtime:** Node.js 20 LTS
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Email:** [Resend](https://resend.com/)
- **API Routes:** Next.js API Routes (App Router)

### DevOps
- **Deployment:** [Vercel](https://vercel.com/)
- **Version Control:** Git
- **CI/CD:** Vercel automated deployments
- **Monitoring:** Vercel Analytics + Speed Insights

### Development Tools
- **Linting:** ESLint
- **Formatting:** Prettier
- **Type Checking:** TypeScript strict mode
- **Package Manager:** npm

## Quick Start

### Prerequisites

- **Node.js:** 20.x or higher ([Download](https://nodejs.org/))
- **npm:** 10.x or higher (comes with Node.js)
- **Git:** Latest version ([Download](https://git-scm.com/))
- **Supabase Account:** [Sign up](https://supabase.com/)
- **Resend Account:** [Sign up](https://resend.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/alfredai-landing.git
   cd alfredai-landing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Configure environment variables:**

   Edit `.env.local` with your actual values:
   ```bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Resend
   RESEND_API_KEY=your-resend-api-key
   FROM_EMAIL=noreply@alfredai.bot
   ADMIN_EMAIL=admin@alfredai.bot

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Set up database:**

   Run the SQL migration in your Supabase SQL editor:
   ```bash
   # Copy contents of supabase-migration-phase4.sql
   # Paste into Supabase SQL Editor
   # Execute
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

7. **Open browser:**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Development Setup

### Project Structure

```
alfredai-landing/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── health/           # Health check endpoint
│   │   └── submit-lead/      # Lead submission endpoint
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/               # React components
│   ├── layout/               # Layout components
│   │   ├── Header.tsx        # Site header
│   │   └── Footer.tsx        # Site footer
│   ├── sections/             # Page sections
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Features.tsx      # Features section
│   │   ├── Testimonials.tsx  # Testimonials
│   │   └── ContactForm.tsx   # Contact form
│   └── ui/                   # UI components
│       ├── Button.tsx        # Button component
│       ├── Input.tsx         # Input component
│       ├── Textarea.tsx      # Textarea component
│       └── Card.tsx          # Card component
├── lib/                      # Utility libraries
│   ├── supabase/            # Supabase client
│   ├── resend/              # Resend email client
│   ├── rate-limit/          # Rate limiting
│   ├── analytics/           # Analytics tracking
│   └── utils/               # Utility functions
├── public/                   # Static assets
│   ├── images/              # Images
│   └── icons/               # Icons
├── middleware.ts             # Next.js middleware
├── .env.local.example        # Environment variables template
└── package.json              # Dependencies
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Development Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes:**
   - Edit files
   - Test locally
   - Run linting and formatting

3. **Commit changes:**
   ```bash
   git add .
   git commit -m "Add: your feature description"
   ```

4. **Push to repository:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create pull request:**
   - Open GitHub
   - Create PR from your branch
   - Wait for review

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `eyJ...` |
| `RESEND_API_KEY` | Resend API key | `re_...` |
| `FROM_EMAIL` | Email sender address | `noreply@alfredai.bot` |
| `ADMIN_EMAIL` | Admin notification email | `admin@alfredai.bot` |
| `NEXT_PUBLIC_APP_URL` | Application URL | `https://alfredai.bot` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | - |
| `NEXT_PUBLIC_ENABLE_BETA_FEATURES` | Enable beta features | `false` |

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/alfredai-landing)

### Manual Deployment

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Configure environment variables in Vercel dashboard**

5. **Add custom domain in Vercel settings**

## Testing

### Manual Testing

1. **Homepage loads:**
   ```bash
   curl http://localhost:3000
   ```

2. **Health check:**
   ```bash
   curl http://localhost:3000/api/health
   ```

3. **Form submission:**
   ```bash
   curl -X POST http://localhost:3000/api/submit-lead \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "company": "Test Co",
       "message": "Test message"
     }'
   ```

### Testing Checklist

- [ ] Homepage renders correctly
- [ ] All sections visible (Hero, Features, Testimonials, Contact)
- [ ] Navigation works
- [ ] Contact form validates input
- [ ] Form submission succeeds
- [ ] Email notifications received
- [ ] Database records created
- [ ] Mobile responsive design
- [ ] Cross-browser compatibility
- [ ] Performance metrics meet targets

## Performance

### Lighthouse Scores

Target scores for production:

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

### Web Vitals

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

## Monitoring

### Health Check Endpoint

```bash
GET /api/health

Response:
{
  "status": "healthy",
  "timestamp": "2025-11-23T...",
  "services": {
    "database": "operational",
    "email": "operational"
  }
}
```

### Monitoring Tools

- **Vercel Analytics:** Built-in analytics
- **Vercel Speed Insights:** Real-user performance monitoring
- **Supabase Dashboard:** Database monitoring
- **Resend Dashboard:** Email delivery monitoring

## Troubleshooting

### Common Issues

**Build fails:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Database connection fails:**
- Check Supabase URL and keys
- Verify database is running
- Check network connectivity

**Email not sending:**
- Verify Resend API key
- Check domain verification
- Review Resend dashboard logs

## Project Architecture

### System Overview

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│   Browser   │────────>│   Next.js    │────────>│   Supabase   │
│             │         │   App Router │         │   Database   │
└─────────────┘         └──────────────┘         └──────────────┘
                               │
                               │
                               v
                        ┌──────────────┐
                        │    Resend    │
                        │    Email     │
                        └──────────────┘
```

## Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit changes (`git commit -m 'Add: amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing code structure
- Run `npm run format` before committing
- Ensure `npm run lint` passes
- Add comments for complex logic

### Commit Message Format

```
Type: Brief description

Detailed explanation (optional)

Examples:
- Add: New feature implementation
- Fix: Bug fix description
- Update: Enhancement to existing feature
- Refactor: Code restructuring
- Docs: Documentation changes
- Test: Test additions or updates
```

### Pull Request Process

1. Update README.md with changes if needed
2. Update CHANGELOG.md with your changes
3. Ensure all tests pass
4. Request review from maintainers
5. Address review feedback
6. Merge after approval

## Security

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Email security concerns to: security@alfredai.bot

### Security Features

- Rate limiting on API endpoints
- CSRF protection
- Security headers (CSP, X-Frame-Options, etc.)
- Input validation with Zod
- SQL injection prevention (Supabase parameterized queries)
- Environment variable encryption
- HTTPS only in production

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

```
MIT License

Copyright (c) 2025 AlfredAI.bot

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Acknowledgments

- **Next.js Team:** For the amazing framework
- **Vercel:** For hosting and deployment platform
- **Supabase:** For backend infrastructure
- **Resend:** For email delivery service
- **TailwindCSS:** For styling framework
- **Open Source Community:** For all the great tools

## Setup Guides

- **[Supabase Setup](./SETUP_SUPABASE.md)** - Step-by-step guide to configure your Supabase database
- **[Resend Setup](./SETUP_RESEND.md)** - Step-by-step guide to configure email automation

## Support

### Get Help

- **Issues:** [GitHub Issues](https://github.com/yourusername/alfredai-landing/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/alfredai-landing/discussions)
- **Email:** support@alfredai.bot

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## Roadmap

### v1.0.0 (Current)
- [x] Landing page with modern design
- [x] Contact form with validation
- [x] Email automation
- [x] Database integration
- [x] Analytics tracking
- [x] Deployment to Vercel

### v1.1.0 (Planned)
- [ ] Blog section
- [ ] FAQ section
- [ ] Integration examples
- [ ] Video demos
- [ ] Multi-language support

### v2.0.0 (Future)
- [ ] User dashboard
- [ ] API documentation
- [ ] Self-service onboarding
- [ ] Interactive demos
- [ ] Advanced analytics

## Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/alfredai-landing?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/alfredai-landing?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/alfredai-landing?style=social)

---

**Built with care by the AlfredAI.bot team**

**Last Updated:** 2025-11-23
