import { test, expect } from "@playwright/test";

test.describe("Json Placeholder API - Patch request ...", () => {
  test("should update single attributes of an existing post", async ({ request }) => {
    const title = "** PATCHED **";
    const response = await request.patch("/posts/1", { data: { title } });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(expect.objectContaining({ title }));
  });
});
