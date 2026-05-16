import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { record } = await req.json() // جلب السجل الجديد (الطلب) من Webhook

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'NASAQ Group <info@nasaq.group>', 
        to: ['your-personal-email@gmail.com'], // البريد الذي تود استقبال الإشعارات عليه
        subject: `طلب خدمة جديد: ${record.service}`,
        html: `
          <h3>تفاصيل الطلب الجديد</h3>
          <p><b>الاسم:</b> ${record.name}</p>
          <p><b>الهاتف:</b> ${record.phone}</p>
          <p><b>البريد الإلكتروني:</b> ${record.email}</p>
          <p><b>الخدمة المطلوبة:</b> ${record.service}</p>
          <p><b>الرسالة:</b></p>
          <p>${record.message}</p>
          <hr />
          <p>تم الإرسال بتاريخ: ${record.date}</p>
        `,
      }),
    })

    const result = await response.json()
    return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})