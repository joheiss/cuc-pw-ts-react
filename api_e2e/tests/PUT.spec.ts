import { test, expect } from "@playwright/test";

test.describe("Json Placeholder API - Put request ...", () => {
  test("should update an existing post", async ({ request }) => {
    const updatedPost = { id: 1, title: "**UPDATED**", body: "This is a **UPDATED** post.", userId: 1 };
    const response = await request.put("/posts/1", { data: updatedPost });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(
      expect.objectContaining({
        title: updatedPost.title,
        body: updatedPost.body,
        userId: updatedPost.userId,
      })
    );
  });

  test("should return an error for non-existing data", async ({ request }) => {
    const updatedPost = { id: 1, title: "**UPDATED**", body: "This is a **UPDATED** post.", userId: 1 };
    const response = await request.put("/posts/555", { data: updatedPost });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(500);
    expect(response.statusText()).toEqual("Internal Server Error");
    expect(await response.text()).toContain("Cannot read properties of undefined");
  });
});
