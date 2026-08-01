import test from "node:test";
import assert from "node:assert/strict";
import { normalizeImagePath } from "../utils/imagePath.js";

test("converts server-prefixed local upload paths to public /uploads URLs", () => {
  const localPath = "server/uploads/products/demo/image.jpg";
  assert.equal(normalizeImagePath(localPath), "/uploads/products/demo/image.jpg");
});

test("preserves remote image URLs", () => {
  const remoteUrl = "https://res.cloudinary.com/demo/image/upload/sample.jpg";
  assert.equal(normalizeImagePath(remoteUrl), remoteUrl);
});
