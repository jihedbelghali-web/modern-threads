import { NextResponse } from "next/server";
import twilio from "twilio";

/* ─── Environment Variables ─── */

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_NUMBER,
  ADMIN_WHATSAPP_NUMBER,
} = process.env;

/* ─── Types ─── */

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

interface OrderPayload {
  customer: CustomerDetails;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

/* ─── Format Order Message ─── */

function formatOrderMessage(payload: OrderPayload): string {
  const { customer, items, totalPrice } = payload;
  const lines: string[] = [];

  lines.push("🛍 *New Order — AURA Studio*");
  lines.push("");
  lines.push("👤 *Customer Details*");
  lines.push(`Name: ${customer.fullName}`);
  lines.push(`Phone: ${customer.phone}`);
  lines.push(`Address: ${customer.address}`);
  lines.push(`City: ${customer.city}`);
  if (customer.notes) {
    lines.push(`Notes: ${customer.notes}`);
  }
  lines.push("");
  lines.push("📦 *Order Items*");
  lines.push("─".repeat(20));

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`   Size: ${item.size} · Color: ${item.color}`);
    lines.push(`   Qty: ${item.quantity} × $${item.price} = $${(item.price * item.quantity).toFixed(2)}`);
  });

  lines.push("─".repeat(20));
  lines.push("");
  lines.push(`💰 *Grand Total: $${totalPrice.toFixed(2)}*`);

  return lines.join("\n");
}

/* ─── POST /api/whatsapp ─── */

export async function POST(request: Request) {
  try {
    // Validate required env vars
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER || !ADMIN_WHATSAPP_NUMBER) {
      console.error("Missing Twilio environment variables");
      return NextResponse.json(
        { error: "Server configuration error. Please set Twilio environment variables." },
        { status: 500 },
      );
    }

    // Parse request body
    const payload: OrderPayload = await request.json();

    // Basic validation
    if (!payload.customer || !payload.items || payload.items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order payload. Customer details and items are required." },
        { status: 400 },
      );
    }

    // Format the WhatsApp message
    const messageBody = formatOrderMessage(payload);

    // Send via Twilio
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const message = await client.messages.create({
      from: TWILIO_WHATSAPP_NUMBER,
      to: ADMIN_WHATSAPP_NUMBER,
      body: messageBody,
    });

    console.log(`WhatsApp order notification sent! SID: ${message.sid}`);

    return NextResponse.json(
      {
        success: true,
        message: "Order notification sent successfully.",
        sid: message.sid,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);

    // Handle Twilio-specific errors gracefully
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json(
      { error: `Failed to send order notification: ${errorMessage}` },
      { status: 500 },
    );
  }
}
