# RISING SUN GLOBAL (RSG)
## PROJECT BRAIN
### Master Context • Architecture • Requirements • Decisions • Vision

---

# PROJECT STATUS
Status: Active Development
Project Type:
- Corporate Website
- Business Showcase Platform
- Admin CMS
- Lead Generation System

Current Stage:
- Fresh rebuild from scratch
- Next.js initialized
- PostgreSQL connected
- Prisma configured
- Upload structure created
- Homepage design system currently under development

---

# PRIMARY OBJECTIVE
Build a premium international corporate website and CMS for Rising Sun Global.
The goal is NOT to create a generic website.
The goal is to create a digital presence that immediately communicates:
- Trust
- Professionalism
- International Reach
- Reliability
- Industrial Expertise

The website should help convert visitors into real business conversations.

---

# COMPANY INFORMATION
Company Name:
Rising Sun Global

Business Areas:
- Industrial Scrap Procurement
- Metal Recovery
- Industrial Recycling
- Ferrous Metal Trading
- Non-Ferrous Metal Trading
- Export Operations
- Bulk Supply Solutions
- Circular Economy Enablement

Current Countries Served:
- Australia
- India

Future Requirement:
Architecture must support unlimited countries.

---

# DIRECTOR CONTACT INFORMATION
WhatsApp: +61 432 753 733
Call: +61 432 753 733
Email: risingsunglobal.au@gmail.com
LinkedIn: https://www.linkedin.com/in/rahul-shah-707847147/

---

# BUSINESS PHILOSOPHY
The website exists primarily to:
- Build trust
- Showcase capability
- Demonstrate professionalism
- Generate qualified leads

The website does NOT exist to automate sales.
Actual business flow:
Website -> Trust Building -> Contact Director -> WhatsApp / Call / LinkedIn -> Discussion -> Business Deal
The director is intentionally a central part of the customer journey.

---

# DESIGN PHILOSOPHY
The design should never feel like:
- Generic Scrap Dealer Website
- Template Corporate Website
- Cheap Business Directory Listing
- SaaS Startup Dashboard

The design should feel like:
- International Industrial Company
- Premium Corporate Brand
- Global Trading Organization
- Established Business Presence

---

# DESIGN REFERENCES
POPPR (Intro animation inspiration)
Apple (Simplicity, Typography, White Space, Clean Layout, Minimalism, Premium Feel)
Slack (Vertical Website Flow, Section Structure, Information Architecture)
Target Design Ratio: 80% Apple / 20% Industrial Luxury

---

# BRANDING RULES
Primary colors must come from:
1. Official Company Logo
2. Official Visiting Card

Avoid:
- Generic SaaS Blue
- Template Colors
- Random Gradients

Preferred Direction:
- Navy
- Charcoal
- White
- Orange
- Metallic Accents
- Premium Industrial Colors

---

# WEBSITE STRUCTURE
- Homepage
- About
- Services
- Industries
- Projects
- Testimonials
- Contact
- Admin Panel

---

# HOMEPAGE STRUCTURE
1. Navbar
2. Hero Section
3. Trust Strip
4. About Section
5. Services Section
6. Industries Section
7. Projects Showcase
8. Testimonials
9. Contact Director
10. Footer

---

# HERO SECTION PHILOSOPHY
Hero should communicate within seconds:
- What the company does
- Where the company operates
- Why visitors should trust the company
- How visitors can contact the company
Hero should emphasize: Scrap Procurement, Metal Recovery, Global Trading, Circular Economy, Australia + India Presence.

---

# ADMIN PHILOSOPHY
Admin experience should be flexible.
Never force data entry unless technically required.
Empty fields should not break the system.
If data is missing: Store NULL, Hide Gracefully, Continue Working.

---

# VISIBILITY SYSTEM
Platform should support visibility controls (Public/Private) for:
Projects, Testimonials, Documents, Statistics, Services, Industries, Future Content.

---

# PROJECT MODULE
Fields: Title, Description, Country, Industry, Category, Images, Documents, Featured, Visibility, Created Date, Status.
Visibility: Public / Private
Featured: Yes / No

---

# TESTIMONIAL MODULE
Fields: Customer Name, Company Name, Message, Visibility.
Visibility: Public / Private

---

# DOCUMENT MODULE
Store: PDFs, Certificates, Agreements, Project Documents, Company Documents.
Visibility: Public / Private

---

# COMPANY INFORMATION MODULE
Manage through CMS: About Us, Mission, Vision, Company Description, Contact Information, Social Links, Countries Served, Core Services, Statistics.
Avoid hardcoding business content where possible.

---

# STATISTICS MODULE
Potential Statistics: Years Experience, Projects Completed, Countries Served, Industries Served.
Important Rule: Every statistic should have visibility control.

---

# COUNTRIES MODULE
Current: Australia, India
Future: Unlimited Countries (CMS manageable).

---

# SERVICES IDENTIFIED SO FAR
Scrap Metal Provider, Industrial Metal Recycling, Scrap Procurement, Ferrous Metals, Non-Ferrous Metals, Export Operations, Bulk Supply, Global Trading, Circular Economy Enablement, Sustainable Growth Solutions.

---

# CONTACT PHILOSOPHY
Primary Contact Methods: WhatsApp, Call, Email, LinkedIn.
Contact Director should be highly visible.

---

# SECURITY PHILOSOPHY
Admin access should NOT be visible publicly (Secret Route, e.g., /admin-login).

---

# STORAGE PHILOSOPHY
Current: Local Storage (uploads/projects, uploads/testimonials, uploads/documents, uploads/company, uploads/temp).
Future: Upgrade Path (AWS S3, Cloudflare R2, etc.).

---

# TECHNOLOGY STACK
- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Next.js Route Handlers, Server Components
- Database: PostgreSQL
- ORM: Prisma

---

# DEVELOPMENT PHILOSOPHY
Decision Priority: 1. Business Value, 2. User Experience, 3. Scalability, 4. Developer Convenience.
Avoid: Temporary Hacks, Demo Code, Placeholder Architecture.
Prefer: Clean Architecture, Scalability, Long-Term Thinking, Production Quality.

---

# USER WORKING STYLE
Project Owner Preferences: First Principles Thinking, Deep Understanding, Architectural Reasoning, Long-Term Vision, Production Quality, Practical Execution.

---

# CORE PRINCIPLE
Every feature, page, database table, component, and design decision should be explainable.
Nothing should exist because "That's how templates do it."

---

# CURRENT NEXT STEP
Finalize: Design System, Navbar, Hero Section, Brand Color Palette.
Then Build: Trust Strip, About Section, Services Section, Industries Section, Projects Section, Testimonials Section, Contact Section, Admin CMS.

---
END OF PROJECT BRAIN