import { test, expect } from "@playwright/test";

test.describe("Json Placeholder API - Post request ...", () => {
  test("should create a new post", async ({ request }) => {
    const newPost = { title: "New Post", body: "This is a new new post.", userId: 1 };
    const response = await request.post("/posts", { data: newPost });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    expect(await response.json()).toEqual(
      expect.objectContaining({
        title: newPost.title,
        body: newPost.body,
        userId: newPost.userId,
      })
    );
  });
});
