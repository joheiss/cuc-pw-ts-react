import { test, expect } from "@playwright/test";

test.describe("Json Placeholder API - Get request ...", () => {
  test("should return all user posts", async ({ request }) => {
    const response = await request.get("/posts");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test("should return a specific post", async ({ request }) => {
    const response = await request.get("/posts/1");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(
      expect.objectContaining({
        id: 1,
        userId: 1,
      })
    );
  });

  test("should return an error on a invalid route", async ({ request }) => {
    const response = await request.get("/animals");
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
    expect(response.statusText()).toEqual("Not Found");
  });
});
