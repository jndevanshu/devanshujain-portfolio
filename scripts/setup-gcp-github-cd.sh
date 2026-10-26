#!/usr/bin/env bash
# ==============================================================================
# One-Time Setup Script: Google Cloud Run + GitHub Actions Keyless OIDC Auth
# Usage:
#   ./scripts/setup-gcp-github-cd.sh <GCP_PROJECT_ID> <GITHUB_USERNAME/REPO_NAME>
# Example:
#   ./scripts/setup-gcp-github-cd.sh my-portfolio-project jndevanshu/personal-portfolio
# ==============================================================================
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <GCP_PROJECT_ID> <GITHUB_OWNER/REPO_NAME>"
  echo "Example: $0 my-gcp-project jndevanshu/personal-portfolio"
  exit 1
fi

PROJECT_ID="$1"
GITHUB_REPO="$2"
SA_NAME="github-deployer"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
POOL_NAME="github-pool"
PROVIDER_NAME="github-provider"

echo "==> Setting active GCP project to: ${PROJECT_ID}"
gcloud config set project "${PROJECT_ID}"

echo "==> Enabling required Google Cloud APIs..."
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  iamcredentials.googleapis.com \
  cloudresourcemanager.googleapis.com \
  iam.googleapis.com

PROJECT_NUMBER=$(gcloud projects describe "${PROJECT_ID}" --format="value(projectNumber)")

echo "==> Creating Service Account: ${SA_EMAIL} (if it doesn't exist)..."
gcloud iam service-accounts describe "${SA_EMAIL}" >/dev/null 2>&1 || \
  gcloud iam service-accounts create "${SA_NAME}" \
    --display-name="GitHub Actions Cloud Run Deployer"

echo "==> Granting Cloud Run & Cloud Build IAM roles to ${SA_EMAIL}..."
for ROLE in \
  "roles/run.admin" \
  "roles/storage.admin" \
  "roles/artifactregistry.admin" \
  "roles/cloudbuild.builds.editor" \
  "roles/iam.serviceAccountUser" \
  "roles/serviceusage.serviceUsageConsumer"; do
  gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="${ROLE}" \
    --condition=None \
    --quiet >/dev/null
done

echo "==> Creating Workload Identity Pool (${POOL_NAME})..."
gcloud iam workload-identity-pools describe "${POOL_NAME}" --location="global" >/dev/null 2>&1 || \
  gcloud iam workload-identity-pools create "${POOL_NAME}" \
    --location="global" \
    --display-name="GitHub Actions Pool"

echo "==> Creating OIDC Provider (${PROVIDER_NAME})..."
gcloud iam workload-identity-pools providers describe "${PROVIDER_NAME}" \
  --workload-identity-pool="${POOL_NAME}" \
  --location="global" >/dev/null 2>&1 || \
  gcloud iam workload-identity-pools providers create-oidc "${PROVIDER_NAME}" \
    --workload-identity-pool="${POOL_NAME}" \
    --location="global" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
    --attribute-condition="assertion.repository=='${GITHUB_REPO}'"

echo "==> Binding GitHub repo (${GITHUB_REPO}) to Service Account..."
gcloud iam service-accounts add-iam-policy-binding "${SA_EMAIL}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_NAME}/attribute.repository/${GITHUB_REPO}" \
  --quiet >/dev/null

WIF_PROVIDER="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_NAME}/providers/${PROVIDER_NAME}"

echo ""
echo "=============================================================================="
echo "✅ GCP Setup Complete! Add these to your GitHub Repository Settings:"
echo "   (Settings -> Secrets and variables -> Actions)"
echo "=============================================================================="
echo ""
echo "1. Under the 'Variables' tab, add Repository Variable:"
echo "   Name:  GCP_PROJECT_ID"
echo "   Value: ${PROJECT_ID}"
echo ""
echo "2. Under the 'Secrets' tab, add these 2 Repository Secrets:"
echo "   Name:  GCP_WORKLOAD_IDENTITY_PROVIDER"
echo "   Value: ${WIF_PROVIDER}"
echo ""
echo "   Name:  GCP_SERVICE_ACCOUNT"
echo "   Value: ${SA_EMAIL}"
echo "=============================================================================="
