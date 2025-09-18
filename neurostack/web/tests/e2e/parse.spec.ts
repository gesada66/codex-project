import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Parse: upload → options → preview', async ({ page }) => {
  await page.goto('/parse');

  // Upload a small fixture file via hidden input
  const fileChooser = page.locator('#file-input');
  // Prefer provided PDFs if present
  const overrideDir = process.env.SAMPLES_PDF_DIR;
  const repoRootSamplePdfDir = path.resolve(__dirname, '..', '..', '..', 'sample-pdf');
  const defaultPdfDir = path.resolve(__dirname, '..', 'fixtures', 'pdfs');
  const pdfDir =
    (overrideDir && fs.existsSync(overrideDir) && overrideDir) ||
    (fs.existsSync(repoRootSamplePdfDir) && repoRootSamplePdfDir) ||
    defaultPdfDir;
  let toUpload: string | undefined;
  const preferred = [
    path.join(pdfDir, 'sample-small.pdf'),
    path.join(pdfDir, 'sample-medium.pdf'),
    path.join(pdfDir, 'sample-scanned.pdf'),
  ];
  toUpload = preferred.find((p) => fs.existsSync(p));
  if (!toUpload && fs.existsSync(pdfDir)) {
    const anyPdf = fs.readdirSync(pdfDir).find((f) => f.toLowerCase().endsWith('.pdf'));
    if (anyPdf) toUpload = path.join(pdfDir, anyPdf);
  }
  const fallback = path.resolve(__dirname, '..', 'fixtures', 'sample.txt');
  await fileChooser.setInputFiles(toUpload ?? fallback);

  // Run parse
  const btn = page.getByTestId('parse-button');
  await expect(btn).toBeEnabled();
  await btn.click();

  // Preview should appear
  await expect(page.getByTestId('parse-preview-md')).toContainText('Preview');
});
