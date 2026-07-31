import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ─── Environment Variables ─── */

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

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

/* ─── Format Order Email ─── */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatOrderEmail(payload: OrderPayload): { subject: string; text: string; html: string } {
  const { customer, items, totalPrice, totalItems } = payload;

  const subject = `New Order Received - ${customer.fullName}`;

  // Plain-text body
  const textLines: string[] = [];
  textLines.push("🛍 New Order — AURA Studio");
  textLines.push("");
  textLines.push("👤 Customer Details");
  textLines.push(`Name: ${customer.fullName}`);
  textLines.push(`Phone: ${customer.phone}`);
  textLines.push(`Address: ${customer.address}`);
  textLines.push(`City: ${customer.city}`);
  if (customer.notes) {
    textLines.push(`Notes: ${customer.notes}`);
  }
  textLines.push("");
  textLines.push("📦 Order Items");
  textLines.push("─".repeat(28));

  items.forEach((item, index) => {
    textLines.push(`${index + 1}. ${item.name}`);
    textLines.push(`   Size: ${item.size} · Color: ${item.color}`);
    textLines.push(
      `   Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}`
    );
  });

  textLines.push("─".repeat(28));
  textLines.push("");
  textLines.push(`Total Items: ${totalItems}`);
  textLines.push(`Grand Total: $${totalPrice.toFixed(2)}`);

  // HTML body
  const itemRows = items
    .map(
      (item, index) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #ececec;color:#555;">${index + 1}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #ececec;">
            <strong>${escapeHtml(item.name)}</strong><br />
            <span style="color:#888;font-size:12px;">Size: ${escapeHtml(item.size)} · Color: ${escapeHtml(item.color)}</span>
          </td>
          <td style="padding:10px 14px;border-bottom:1px solid #ececec;text-align:center;color:#555;">${item.quantity}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #ececec;text-align:right;color:#555;">$${item.price.toFixed(2)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #ececec;text-align:right;font-weight:600;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#fafafa;padding:24px;">
      <div style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
        <div style="background:#111;color:#fff;padding:20px 24px;">
          <h1 style="margin:0;font-size:18px;">🛍 New Order — AURA Studio</h1>
        </div>
        <div style="padding:24px;">
          <h2 style="margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#333;">Customer Details</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:4px 0;color:#888;width:80px;">Name</td>
              <td style="padding:4px 0;font-weight:600;">${escapeHtml(customer.fullName)}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#888;">Phone</td>
              <td style="padding:4px 0;">${escapeHtml(customer.phone)}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#888;">Address</td>
              <td style="padding:4px 0;">${escapeHtml(customer.address)}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#888;">City</td>
              <td style="padding:4px 0;">${escapeHtml(customer.city)}</td>
            </tr>
            ${
              customer.notes
                ? `<tr><td style="padding:4px 0;color:#888;">Notes</td><td style="padding:4px 0;">${escapeHtml(customer.notes)}</td></tr>`
                : ""
            }
          </table>

          <h2 style="margin:24px 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#333;">Order Items</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <thead>
              <tr style="background:#f5f5f5;text-align:left;color:#888;font-size:12px;text-transform:uppercase;">
                <th style="padding:8px 14px;">#</th>
                <th style="padding:8px 14px;">Item</th>
                <th style="padding:8px 14px;text-align:center;">Qty</th>
                <th style="padding:8px 14px;text-align:right;">Price</th>
                <th style="padding:8px 14px;text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>

          <div style="margin-top:20px;padding-top:16px;border-top:2px solid #111;text-align:right;font-size:16px;">
            <span style="color:#888;font-size:13px;">Total Items: ${totalItems}</span><br />
            <strong style="font-size:20px;">Grand Total: $${totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  `;

  return { subject, text: textLines.join("\n"), html };
}

/* ─── POST /api/email ─── */

export async function POST(request: Request) {
  try {
    // Validate required env vars
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.error("Missing Gmail environment variables");
      return NextResponse.json(
        { error: "Server configuration error. Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables." },
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

    // Format the email
    const { subject, text, html } = formatOrderEmail(payload);

    // Send via Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject,
      text,
      html,
    });

    console.log(`Order email sent! Message ID: ${info.messageId}`);

    return NextResponse.json(
      {
        success: true,
        message: "Order email sent successfully.",
        messageId: info.messageId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to send order email:", error);

    // Handle email-specific errors gracefully
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json(
      { error: `Failed to send order email: ${errorMessage}` },
      { status: 500 },
    );
  }
}
