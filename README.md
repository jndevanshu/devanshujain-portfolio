# Devanshu Jain — Personal Portfolio

A mobile-friendly, editorial/academic personal portfolio and MDX/LaTeX-ready technical blog built with **Astro**, **Tailwind CSS**, and **MDX**, ready for deployment on **Google Cloud**.

## Local Development

```bash
# Install dependencies
npm install

# Start development server at http://localhost:4321
npm run dev

# Build static production bundle into dist/
npm run build

# Preview production build locally
npm run preview
```

## Updating Portfolio Content

All structured portfolio sections (**Bio, Experience, Publications, Projects, Skills, Education, and Social Links**) live in a single typed file:
- [`src/data/portfolio.ts`](./src/data/portfolio.ts)

## Adding Blog Posts (Markdown / MDX + LaTeX)

Drop any `.md` or `.mdx` file into [`src/content/blog/`](./src/content/blog/) with frontmatter:

```mdx
---
title: "Your Post Title"
description: "Brief summary of the post."
pubDate: 2026-10-25
tags: ["LLM Inference", "Cloud TPU"]
readingTime: "5 min read"
draft: false
---

Inline math like $O(N^2)$ and display equations with `$$...$$` are pre-rendered at build time via KaTeX.
```

---

## Deploying Publicly on Google Cloud with a Custom Domain & HTTPS

### Continuous Deployment via GitHub Actions (Recommended)

This repository includes a ready-to-use GitHub Actions workflow at [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) that automatically builds and deploys your portfolio to **Google Cloud Run** on every push to `main`.

#### 1. Run the One-Time GCP + GitHub Keyless OIDC Setup Script
From your local terminal, run:
```bash
gcloud auth login
./scripts/setup-gcp-github-cd.sh YOUR_GCP_PROJECT_ID jndevanshu/YOUR_REPO_NAME
```
This script enables the required GCP APIs, creates a `github-deployer` Service Account with least-privilege Cloud Run/Cloud Build permissions, configures **Workload Identity Federation** (so you never have to manage long-lived JSON keys), and prints the exact **1 Variable** and **2 Secrets** to paste into your GitHub repository (`Settings → Secrets and variables → Actions`):
- **Variable**: `GCP_PROJECT_ID`
- **Secrets**: `GCP_WORKLOAD_IDENTITY_PROVIDER` and `GCP_SERVICE_ACCOUNT`

#### 2. Push to GitHub
```bash
git add .
git commit -m "Initial portfolio and Cloud Run CI/CD workflow"
git remote add origin https://github.com/jndevanshu/YOUR_REPO_NAME.git
git push -u origin main
```
Every push to `main` will now trigger the **Deploy Portfolio to Google Cloud Run** workflow automatically!

---

### Manual CLI Deployment Options

There are **two recommended ways** to host this portfolio manually on Google Cloud with a custom domain and free automatic SSL/HTTPS certificates:

### Option 1: Google Cloud Run (Recommended if using `gcloud` CLI only)

Since you already have `/opt/homebrew/bin/gcloud` installed and this repo includes a production [`Dockerfile`](./Dockerfile) and [`nginx.conf`](./nginx.conf), **Cloud Run** will build your container in the cloud (no local Docker required), scale to zero when idle (free tier), and provision a free managed TLS/HTTPS certificate for your custom domain.

#### Step 1: Authenticate & Set Your GCP Project
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs (Cloud Run, Cloud Build, Artifact Registry)
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
```

#### Step 2: Deploy from Source to Cloud Run
Run this from `/Users/devanshujain/workspace/personal-portfolio`:
```bash
gcloud run deploy portfolio \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080
```
*(This will give you a live `https://portfolio-xxxx-uc.a.run.app` URL in ~2 minutes.)*

#### Step 3: Map Your Custom Domain & Enable Managed HTTPS
1. **Verify domain ownership** (if not bought via Google Cloud Domains):
   - Open [Google Cloud Console → Cloud Run → Manage Custom Domains](https://console.cloud.google.com/run/domains).
   - Click **Add Mapping** → Select service `portfolio` → Enter your domain (e.g., `devanshujain.com` and/or `www.devanshujain.com`).
   - Or via CLI:
     ```bash
     gcloud beta run domain-mappings create \
       --service portfolio \
       --domain YOUR_DOMAIN.com \
       --region us-central1
     ```
2. **Update DNS Records at your Domain Registrar** (Cloudflare, Squarespace/Google Domains, Namecheap, Route53):
   - Add the `A` and `AAAA` records (for root `@`) or `CNAME` record (`ghs.googlehosted.com.` for `www`) shown by Cloud Run.
   - *(Note: If using Cloudflare DNS, set the proxy status to **DNS Only / Grey Cloud** initially so Google can verify the domain and issue your managed Let's Encrypt SSL certificate within 15–30 minutes).*

---

### Option 2: Firebase Hosting (Backed by Google Cloud CDN)

Firebase Hosting is Google Cloud's native global CDN for static sites. It links directly to your Google Cloud project, serves your static `dist/` bundle from Google edge POPs worldwide, and provisions automatic HTTPS for custom domains.

```bash
# 1. Build the static site
npm run build

# 2. Run Firebase CLI (via npx, no global install needed)
npx firebase-tools login
npx firebase-tools init hosting   # Select your GCP project, set public directory to "dist"
npx firebase-tools deploy --only hosting
```
Then go to **Firebase Console → Hosting → Add custom domain** to connect your domain and auto-provision HTTPS.
