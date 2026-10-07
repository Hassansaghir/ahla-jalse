import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// 👉 ضع رابط سيرفر Odoo هنا (مثال: "http://192.168.1.10:8069")
const ODOO_URL = 'https://ahla-jalse.odoo.com'

const data = [
  { id: 18, name: { en: 'Club Sandwiches', ar: 'ساندويشات كلوب' }, items: [
    { n: { en: 'halloumi', ar: 'حلوم' }, p: '420,000', img: '/web/image/product.template/181/image_512' },
    { n: { en: 'turkey and cheese', ar: 'تيركي وجبنة' }, p: '420,000', img: '/web/image/product.template/182/image_512' },
    { n: { en: 'tuna mix', ar: 'تونا مكس' }, p: '420,000', img: '/web/image/product.template/185/image_512' } ]},
  { id: 17, name: { en: 'Salad', ar: 'سلطات' }, items: [
    { n: { en: 'greek', ar: 'يونانية' }, p: '580,000', img: '/web/image/product.template/170/image_512' },
    { n: { en: 'tuna pasta', ar: 'تونا باستا' }, p: '580,000', img: '/web/image/product.template/173/image_512' },
    { n: { en: 'chicken caeser', ar: 'تشيكن سيزر' }, p: '580,000', img: '/web/image/product.template/174/image_512' },
    { n: { en: 'crab', ar: 'سلطعون' }, p: '580,000', img: '/web/image/product.template/175/image_512' },
    { n: { en: 'quinoa feta', ar: 'كينوا فيتا' }, p: '580,000', img: '/web/image/product.template/177/image_512' },
    { n: { en: 'the mexican', ar: 'المكسيكية' }, p: '580,000', img: '/web/image/product.template/180/image_512' } ]},
  { id: 14, name: { en: 'Ahla Jalseh', ar: 'أهلا جلسة' }, items: [
    { n: { en: 'sunset spark', ar: 'صن سيت سبارك' }, p: '300,000', img: '/web/image/product.template/136/image_512' },
    { n: { en: 'lyche bliss', ar: 'ليتشي بليس' }, p: '300,000', img: '/web/image/product.template/137/image_512' },
    { n: { en: 'watermelon lemonade', ar: 'ليمون بالبطيخ' }, p: '300,000', img: '/web/image/product.template/142/image_512' },
    { n: { en: 'matcha frappe', ar: 'ماتشا فرابيه' }, p: '450,000', img: '/web/image/product.template/143/image_512' },
    { n: { en: 'iced matcha', ar: 'ماتشا مثلجة' }, p: '450,000', img: '/web/image/product.template/144/image_512' } ]},
  { id: 16, name: { en: 'Take Away', ar: 'تيك أواي' }, items: [
    { n: { en: 'frappe', ar: 'فرابيه' }, p: '360,000', img: '/web/image/product.template/165/image_512' } ]},
  { id: 11, name: { en: 'Gifts', ar: 'هدايا' }, items: [
    { n: { en: 'S001', ar: 'S001' }, p: '900,000', img: '/web/image/product.template/101/image_512' },
    { n: { en: 'S002', ar: 'S002' }, p: '1,700,000', img: '/web/image/product.template/102/image_512' },
    { n: { en: 'S003', ar: 'S003' }, p: '1,700,000', img: '/web/image/product.template/103/image_512' },
    { n: { en: 'S004', ar: 'S004' }, p: '1,530,000', img: '/web/image/product.template/104/image_512' },
    { n: { en: 'S005', ar: 'S005' }, p: '1,700,000', img: '/web/image/product.template/105/image_512' },
    { n: { en: 'S006', ar: 'S006' }, p: '1,450,000', img: '/web/image/product.template/106/image_512' },
    { n: { en: 'S007', ar: 'S007' }, p: '900,000', img: '/web/image/product.template/107/image_512' },
    { n: { en: 'S008', ar: 'S008' }, p: '720,000', img: '/web/image/product.template/108/image_512' },
    { n: { en: 'S009', ar: 'S009' }, p: '1,170,000', img: '/web/image/product.template/109/image_512' },
    { n: { en: 'S010', ar: 'S010' }, p: '1,170,000', img: '/web/image/product.template/110/image_512' },
    { n: { en: 'S011', ar: 'S011' }, p: '1,170,000', img: '/web/image/product.template/111/image_512' },
    { n: { en: 'S012', ar: 'S012' }, p: '900,000', img: '/web/image/product.template/112/image_512' },
    { n: { en: 'S013', ar: 'S013' }, p: '720,000', img: '/web/image/product.template/113/image_512' },
    { n: { en: 'sprinkler', ar: 'سبرانكلر' }, p: '1,080,000', img: '/web/image/product.template/167/image_512' },
    { n: { en: 'sprinkler pot', ar: 'وعاء سبرانكلر' }, p: '1,080,000', img: '/web/image/product.template/168/image_512' } ]},
  { id: 4, name: { en: 'Hot Drinks', ar: 'مشروبات ساخنة' }, items: [
    { n: { en: 'Espresso', ar: 'اسبريسو' }, p: '90,000', img: '/web/image/product.template/8/image_512' },
    { n: { en: 'Espresso Decaf', ar: 'اسبريسو ديكاف' }, p: '70,000', img: '/web/image/product.template/11/image_512' },
    { n: { en: 'Hot Americano', ar: 'هوت اميركانو' }, p: '130,000', img: '/web/image/product.template/12/image_512' },
    { n: { en: 'Cappuccino', ar: 'كابوتشينو' }, p: '150,000', img: '/web/image/product.template/13/image_512' },
    { n: { en: 'Cafe Latte', ar: 'كافيه لاتيه' }, p: '200,000', img: '/web/image/product.template/14/image_512' },
    { n: { en: 'Nescafé', ar: 'نسكافيه' }, p: '140,000', img: '/web/image/product.template/15/image_512' },
    { n: { en: 'Caramel Macchiato', ar: 'كاراميل ماكياتو' }, p: '220,000', img: '/web/image/product.template/16/image_512' },
    { n: { en: 'Mocha', ar: 'موكا' }, p: '220,000', img: '/web/image/product.template/17/image_512' },
    { n: { en: 'Turkish Coffee', ar: 'قهوة تركيه' }, p: '120,000', img: '/web/image/product.template/18/image_512' },
    { n: { en: 'Hot Chocolate', ar: 'هوت شوكليت' }, p: '250,000', img: '/web/image/product.template/19/image_512' },
    { n: { en: 'Flavored Tea', ar: 'شاي نكهات' }, p: '130,000', img: '/web/image/product.template/20/image_512' } ]},
  { id: 7, name: { en: 'Cold Drinks', ar: 'مشروبات باردة' }, items: [
    { n: { en: 'Iced Caramel', ar: 'ايس كاراميل' }, p: '200,000', img: '/web/image/product.template/30/image_512' },
    { n: { en: 'Iced Americano', ar: 'ايس اميريكان' }, p: '130,000', img: '/web/image/product.template/31/image_512' },
    { n: { en: 'Toffee Coffee', ar: 'توفي كافيه' }, p: '240,000', img: '/web/image/product.template/32/image_512' },
    { n: { en: 'Mocha', ar: 'موكا' }, p: '220,000', img: '/web/image/product.template/34/image_512' },
    { n: { en: 'Irish Coffee', ar: 'ايريش كوفي' }, p: '200,000', img: '/web/image/product.template/33/image_512' },
    { n: { en: 'Caramel Frappe', ar: 'فرابيه كاراميل' }, p: '370,000', img: '/web/image/product.template/35/image_512' },
    { n: { en: 'Toffee Frappe', ar: 'توفي فرابيه' }, p: '350,000', img: '/web/image/product.template/36/image_512' },
    { n: { en: 'Iced Coffee', ar: 'قهوة مثلجة' }, p: '170,000', img: '/web/image/product.template/130/image_512' },
    { n: { en: 'Spanish Latte', ar: 'سبانيش لاتيه' }, p: '200,000', img: '/web/image/product.template/131/image_512' },
    { n: { en: 'White Mocha Frappe', ar: 'وايت موكا فرابيه' }, p: '370,000', img: '/web/image/product.template/132/image_512' },
    { n: { en: 'Mocha Frappe', ar: 'موكا فرابيه' }, p: '350,000', img: '/web/image/product.template/135/image_512' },
    { n: { en: 'Iced White Mocha', ar: 'وايت موكا مثلجة' }, p: '220,000', img: '/web/image/product.template/158/image_512' },
    { n: { en: 'Vanilla Iced Coffee', ar: 'فانيلا ايسد كوفي' }, p: '200,000', img: '/web/image/product.template/159/image_512' },
    { n: { en: 'Vanilla Frappe', ar: 'فانيلا فرابيه' }, p: '360,000', img: '/web/image/product.template/222/image_512' },
    { n: { en: 'Irish Frappe', ar: 'ايريش فرابيه' }, p: '360,000', img: '/web/image/product.template/225/image_512' } ]},
  { id: 5, name: { en: 'Smoothies', ar: 'سموزي' }, items: [
    { n: { en: 'Strawberry Smoothie', ar: 'سموزي فريز' }, p: '350,000', img: '/web/image/product.template/21/image_512' },
    { n: { en: 'Berry Smoothie', ar: 'سموزي توت' }, p: '350,000', img: '/web/image/product.template/22/image_512' },
    { n: { en: 'Mango Smoothie', ar: 'سموزي منغا' }, p: '350,000', img: '/web/image/product.template/23/image_512' },
    { n: { en: 'Tropical Smoothie', ar: 'سموزي إستوائي' }, p: '350,000', img: '/web/image/product.template/24/image_512' } ]},
  { id: 6, name: { en: 'Shakes', ar: 'شايك' }, items: [
    { n: { en: 'Chocolate Shake', ar: 'شوكولت شيك' }, p: '380,000', img: '/web/image/product.template/25/image_512' },
    { n: { en: 'Strawberry Shake', ar: 'شيك فريز' }, p: '380,000', img: '/web/image/product.template/26/image_512' },
    { n: { en: 'Bounty Shake', ar: 'باونتي شايك' }, p: '380,000', img: '/web/image/product.template/27/image_512' },
    { n: { en: 'Berry Blast Shake', ar: 'بيري بلاست شايك' }, p: '380,000', img: '/web/image/product.template/28/image_512' },
    { n: { en: 'Lotus Milkshake', ar: 'لوتس شيك' }, p: '380,000', img: '/web/image/product.template/122/image_512' } ]},
  { id: 8, name: { en: 'Mocktails', ar: 'موكتايل' }, items: [
    { n: { en: 'Mojito', ar: 'موجيتو' }, p: '340,000', img: '/web/image/product.template/37/image_512' },
    { n: { en: 'Peach Iced Tea', ar: 'ايس تي خوخ' }, p: '180,000', img: '/web/image/product.template/38/image_512' },
    { n: { en: 'Passion Punch', ar: 'باشن بانش' }, p: '360,000', img: '/web/image/product.template/39/image_512' },
    { n: { en: 'Lychee', ar: 'ليتشي' }, p: '300,000', img: '/web/image/product.template/40/image_512' },
    { n: { en: 'Bisap Fresh', ar: 'كركديه طازج' }, p: '220,000', img: '/web/image/product.template/126/image_512' } ]},
  { id: 9, name: { en: 'Kids Menu', ar: 'منيو الاطفال' }, items: [
    { n: { en: 'Fruit Yogurt', ar: 'لبن بالفواكه' }, p: '280,000', img: '/web/image/product.template/41/image_512' },
    { n: { en: 'Oreo Shake', ar: 'اوريو شيك' }, p: '400,000', img: '/web/image/product.template/42/image_512' },
    { n: { en: 'Lotus Yum Yum', ar: 'لوتس يم يم' }, p: '400,000', img: '/web/image/product.template/43/image_512' },
    { n: { en: 'Bubble Gum', ar: 'علكة بابل' }, p: '280,000', img: '/web/image/product.template/45/image_512' },
    { n: { en: 'Strawberry Shake', ar: 'شيك فريز' }, p: '280,000', img: '/web/image/product.template/46/image_512' } ]},
  { id: 2, name: { en: 'Beverages', ar: 'مشروبات' }, items: [
    { n: { en: 'Water', ar: 'مياه' }, p: '50,000', img: '/web/image/product.template/47/image_512' },
    { n: { en: 'Energy Drink', ar: 'مشروبات طاقة' }, p: '150,000', img: '/web/image/product.template/50/image_512' },
    { n: { en: 'Energy Drink XL', ar: 'مشروب طاقة' }, p: '120,000', img: '/web/image/product.template/100/image_512' },
    { n: { en: 'Energy Drink Red Bull', ar: 'ريد بول' }, p: '190,000', img: '/web/image/product.template/121/image_512' },
    { n: { en: 'Sparkling Water', ar: 'مياه غازية' }, p: '120,000', img: '/web/image/product.template/124/image_512' } ]},
  { id: 10, name: { en: 'Desserts', ar: 'حلويات' }, items: [
    { n: { en: 'Chocolate Tart', ar: 'تارت شوكولا' }, p: '400,000', img: '/web/image/product.template/55/image_512' },
    { n: { en: 'Lotus Cheesecake', ar: 'لوتس تشيزكيك' }, p: '320,000', img: '/web/image/product.template/57/image_512' },
    { n: { en: 'Fondant', ar: 'فوندون' }, p: '400,000', img: '/web/image/product.template/58/image_512' },
    { n: { en: 'Creme Brulee', ar: 'كريم بروليه' }, p: '380,000', img: '/web/image/product.template/149/image_512' },
    { n: { en: 'Rafaello', ar: 'رافايلو' }, p: '350,000', img: '/web/image/product.template/150/image_512' },
    { n: { en: 'Red Velvet', ar: 'ريد فيلفيت' }, p: '360,000', img: '/web/image/product.template/151/image_512' },
    { n: { en: 'Crispy Snickers', ar: 'كرسبي سنكرز' }, p: '360,000', img: '/web/image/product.template/152/image_512' },
    { n: { en: 'Biscuit au Choco', ar: 'بسكويت بالشوكولا' }, p: '350,000', img: '/web/image/product.template/153/image_512' },
    { n: { en: 'Osmaliyeh', ar: 'عثمالية' }, p: '400,000', img: '/web/image/product.template/154/image_512' },
    { n: { en: 'Blackberry Cheesecake', ar: 'تشيزكيك بلاك بيري' }, p: '350,000', img: '/web/image/product.template/155/image_512' },
    { n: { en: 'Strawberry Cheesecake', ar: 'تشيزكيك فريز' }, p: '350,000', img: '/web/image/product.template/156/image_512' },
    { n: { en: 'Oriental', ar: 'شرقي' }, p: '320,000', img: '/web/image/product.template/160/image_512' },
    { n: { en: 'Fudge Cake', ar: 'فادج كيك' }, p: '350,000', img: '/web/image/product.template/161/image_512' },
    { n: { en: 'Opera', ar: 'أوبرا' }, p: '360,000', img: '/web/image/product.template/162/image_512' },
    { n: { en: 'Cheesecake Oreo', ar: 'تشيزكيك اوريو' }, p: '350,000', img: '/web/image/product.template/164/image_512' },
    { n: { en: 'Bahamas', ar: 'باهاماس' }, p: '350,000', img: '/web/image/product.template/226/image_512' },
    { n: { en: 'Kinder Cheesecake', ar: 'كيندر تشيزكيك' }, p: '350,000', img: '/web/image/product.template/227/image_512' },
    { n: { en: 'Knefe Cheese', ar: 'كنافة بالجبنة' }, p: '350,000', img: '/web/image/product.template/228/image_512' } ]},
  { id: 3, name: { en: 'Shisha', ar: 'اراغيل' }, items: [
    { n: { en: 'Shisha', ar: 'اراغيل' }, p: '440,000', img: '/web/image/product.template/10/image_512' } ]}
]

export default function App() {
  const [lang, setLang] = useState('ar')
  const [cat, setCat] = useState('all')
  const t = (o) => o[lang]

  const visible = cat === 'all' ? data : data.filter(c => c.id === cat)

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="app">
      <div className="bg-store"></div>
      <div className="hero" style={{ backgroundImage: `url(${ODOO_URL}/web/image/ir.attachment/1160/raw)` }}>
        <button className="lang-btn hero-lang" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
          {lang === 'ar' ? 'EN' : 'عربي'}
        </button>
        <img className="hero-logo" src={`${ODOO_URL}/web/image/website/1/logo/ahla-jalse?unique=06af06e`} alt="Ahla Jalse" onError={(e) => { e.target.style.display = 'none' }} />
        <div className="hero-overlay">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            {lang === 'ar' ? '☕ أحلا جلسة' : '☕ Ahla Jalse'}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}>
            {lang === 'ar' ? 'قهوة، مشروبات، وحلويات بأجواء دافئة' : 'Coffee, drinks & desserts in a cozy vibe'}
          </motion.p>
          <motion.div className="floats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>
            <span>☕</span><span>🧋</span><span>🍰</span><span>🥤</span><span>🍫</span>
          </motion.div>
        </div>
      </div>

      <div className="sticky-nav">
      <div className="mobile-brand">احلى جلسة ☕</div>

      <nav className="cats">
        <button className={`cat-btn ${cat === 'all' ? 'active' : ''}`} onClick={() => setCat('all')}>
          {lang === 'ar' ? 'الكل' : 'All'}
        </button>
        {data.map(c => (
          <button key={c.id} className={`cat-btn ${cat === c.id ? 'active' : ''}`} onClick={() => setCat(c.id)}>
            {t(c.name)}
          </button>
        ))}
      </nav>
      </div>

      <main className="main">
        <AnimatePresence mode="wait">
          <motion.div key={cat + lang} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {visible.map(c => (
              <section key={c.id}>
                <h2>{t(c.name)}</h2>
                <div className="grid">
                  {c.items.map((it, i) => (
                    <motion.div key={i} className="card"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }} whileHover={{ y: -6, scale: 1.03 }}>
                      <img loading="lazy" decoding="async" src={`${ODOO_URL}${it.img}`} alt={t(it.n)} onError={(e) => {
                        if (!e.target.dataset.fbk) {
                          e.target.dataset.fbk = '1'
                          e.target.src = `https://picsum.photos/seed/${encodeURIComponent(it.n.en.replace(/\s+/g, '-'))}/300/300`
                        } else if (e.target.dataset.fbk === '1') {
                          e.target.dataset.fbk = '2'
                          e.target.src = `https://placehold.co/300x300?text=${encodeURIComponent(t(it.n))}`
                        }
                      }} />
                      <div className="info">
                        <div className="name">{t(it.n)}</div>
                        <span className="price">{it.p} L.L.</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
