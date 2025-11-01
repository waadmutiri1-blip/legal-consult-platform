# الاستشارات القانونية الذكية - Starter

هذا المشروع جاهز للرفع على GitHub وVercel. يوفّر:
- واجهة Next.js + Tailwind
- شات ذكي يتصل بـ OpenAI
- حفظ الاستشارات محليًا في SQLite
- دعم عربي/إنجليزي مع اختيار الأسلوب (ودّي أو قانوني)
- إعدادات أولية لتشغيل محليًا

## إعداد سريع
1. انسخ المشروع.
2. أنشئ ملف `.env.local` في الجذر وأضف:
   ```
   OPENAI_API_KEY=sk-...
   ADMIN_PASSWORD=your_admin_password
   JWT_SECRET=any_long_secret
   CONTACT_EMAIL=WAADMUTIRI1@GMAIL.COM
   ```
3. ثبت الحزم:
   ```
   npm install
   ```
4. شغّل المشروع محليًا:
   ```
   npm run dev
   ```
5. لرفع على Vercel: ارفع المشروع إلى GitHub ثم اربطه بحساب Vercel واضغط Deploy.

