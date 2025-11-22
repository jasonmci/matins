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

test.describe('Hint palette interactions', () => {
  test('opens when the Escape key is pressed', async ({ page }) => {
    await page.goto('/');
    const palette = page.getByRole('complementary', { name: 'Hint palette' });
    await expect(palette).toHaveCount(0);

    await page.keyboard.press('Escape');
    await expect(palette).toBeVisible();
  });

  test('opens when the colon key is pressed', async ({ page }) => {
    await page.goto('/');
    const palette = page.getByRole('complementary', { name: 'Hint palette' });
    await expect(palette).toHaveCount(0);

    await page.keyboard.type(':');
    await expect(palette).toBeVisible();
  });

  test('opens when the Hints control is clicked', async ({ page }) => {
    await page.goto('/');
    const palette = page.getByRole('complementary', { name: 'Hint palette' });
    await expect(palette).toHaveCount(0);

    await page.getByRole('button', { name: 'Hints' }).click();
    await expect(palette).toBeVisible();
  });

  test('closes when Escape is pressed while open', async ({ page }) => {
    await page.goto('/');
    const palette = page.getByRole('complementary', { name: 'Hint palette' });

    await page.getByRole('button', { name: 'Hints' }).click();
    await expect(palette).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(palette).toHaveCount(0);
  });

  test('closes when the Close button is clicked', async ({ page }) => {
    await page.goto('/');
    const palette = page.getByRole('complementary', { name: 'Hint palette' });

    await page.getByRole('button', { name: 'Hints' }).click();
    await expect(palette).toBeVisible();

    await page.getByRole('button', { name: 'Close hints' }).click();
    await expect(palette).toHaveCount(0);
  });
});
