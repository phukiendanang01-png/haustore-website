// ===== TELEGRAM CONFIG =====
const TELEGRAM_CONFIG = {
    botToken: "8483746111:AAFg93sIEBksTlhTN2nZYIZruFwJ9SUa79A",
    chatId: "6892745098"  // Chat ID của anh Hậu
};

// Gửi đơn hàng về Telegram
async function sendOrderToTelegram(order) {
    const { botToken, chatId } = TELEGRAM_CONFIG;
    
    if (botToken === "TELEGRAM_BOT_TOKEN") {
        console.log("⚠️ Chưa cấu hình Telegram Bot. Đơn hàng:", order);
        return;
    }

    const itemsList = order.items.map(item => 
        `• ${item.name} x${item.qty} = ${formatPrice(item.total)}`
    ).join('\n');

    const message = `
🛒 *ĐƠN HÀNG MỚI - HẬU STORE*

👤 *Khách hàng:* ${order.name}
📱 *SĐT:* ${order.phone}
📍 *Địa chỉ:* ${order.address}
${order.note ? `📝 *Ghi chú:* ${order.note}\n` : ''}
📦 *Sản phẩm:*
${itemsList}

💰 *Tổng cộng:* ${formatPrice(order.total)}
⏰ *Thời gian:* ${order.date}
`.trim();

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            }
        );

        if (response.ok) {
            console.log("✅ Đã gửi đơn hàng về Telegram");
        } else {
            console.error("❌ Lỗi gửi Telegram:", await response.text());
        }
    } catch (error) {
        console.error("❌ Lỗi kết nối Telegram:", error);
    }
}
