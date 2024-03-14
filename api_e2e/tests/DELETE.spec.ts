import { test, expect } from "@playwright/test";

test.describe("Json Placeholder API - Delete request ...", () => {
  test("should delete an existing post", async ({ request }) => {
    const response = await request.delete("/posts/1");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("{}");
  });
});
