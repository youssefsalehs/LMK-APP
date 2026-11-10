export default function generateOrGetIdempotencyKey(): string {
  const idempotency = localStorage.getItem("idempotency");
  if (idempotency) {
    return idempotency;
  }
  const newIdempotency = crypto.randomUUID();
  localStorage.setItem("idempotency", newIdempotency);
  return newIdempotency;
}
