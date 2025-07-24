import { API_BASE_URL } from "./api";
import { getAuthCookies, getCommonHeaders } from "./auth";

export async function createCheckoutSession(tier) {
  const { token } = getAuthCookies();
  if (!token) {
    throw new Error("You must be logged in to subscribe.");
  }
  const response = await fetch(`${API_BASE_URL}/api/v1/subscribe/checkout`, {
    method: "POST",
    headers: getCommonHeaders(true, token),
    body: JSON.stringify({ tier }),
  });
  const checkoutData = await response.json();
  if (!response.ok) {
    if (checkoutData?.detail) {
      throw new Error(checkoutData.detail);
    }
    throw new Error(
      `Failed to create checkout session: ${response.statusText}`
    );
  }
  return checkoutData;
}
