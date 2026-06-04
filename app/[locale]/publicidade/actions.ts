"use server";

const ALLOWED_GOALS = ["spots", "patrocinio", "evento", "passatempo", "anunciante", "outro"] as const;
type Goal = (typeof ALLOWED_GOALS)[number];

type Result =
  | { ok: true }
  | { ok: false; error: "validation" | "config" | "delivery" };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitQuoteRequest(formData: FormData): Promise<Result> {
  // --- Validate
  const name = String(formData.get("name") || "").trim().slice(0, 200);
  const businessField = String(formData.get("business") || "").trim().slice(0, 200);
  const phone = String(formData.get("phone") || "").trim().slice(0, 50);
  const email = String(formData.get("email") || "").trim().slice(0, 200);
  const goalRaw = String(formData.get("goal") || "").trim();
  const message = String(formData.get("message") || "").trim().slice(0, 5000);
  const consent = formData.get("consent");

  if (
    !name ||
    !businessField ||
    !email ||
    !EMAIL_REGEX.test(email) ||
    !ALLOWED_GOALS.includes(goalRaw as Goal) ||
    message.length < 10 ||
    !consent
  ) {
    return { ok: false, error: "validation" };
  }
  const goal = goalRaw as Goal;

  // --- Delivery — Telegram bot
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[publicidade/actions] Telegram env not configured");
    return { ok: false, error: "config" };
  }

  const text = [
    "<b>📻 Novo pedido de orçamento — Barca FM</b>",
    "",
    `<b>Nome:</b> ${escape(name)}`,
    `<b>Empresa:</b> ${escape(businessField)}`,
    `<b>Email:</b> ${escape(email)}`,
    phone ? `<b>Telefone:</b> ${escape(phone)}` : null,
    `<b>Objetivo:</b> ${escape(goal)}`,
    "",
    "<b>Mensagem:</b>",
    escape(message),
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[publicidade/actions] Telegram error", res.status, body);
      return { ok: false, error: "delivery" };
    }
    return { ok: true };
  } catch (e) {
    console.error("[publicidade/actions] Telegram fetch failed", e);
    return { ok: false, error: "delivery" };
  }
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
