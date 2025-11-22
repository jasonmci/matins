import { test, expect } from '@playwright/test';

test.describe('Matins landing experience', () => {
  test('renders the introductory headline', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Matins');
  });

  test('lists the starter mind-map prompts', async ({ page }) => {
    await page.goto('/');
    const cards = page.getByRole('heading', { level: 2 });
    await expect(cards).toHaveCount(3);
    await expect(cards).toContainText([
      'Morning pages',
      'Sensory details',
      'Metaphor clusters'
    ]);
  });
});
