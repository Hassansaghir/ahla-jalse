import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Product images downloaded at build time in /public/images — no Odoo API used

const data = [
  { id: 18, name: { en: 'Club Sandwiches', ar: 'ساندويشات كلوب' }, items: [
    { n: { en: 'halloumi', ar: 'حلوم' }, p: '420,000', img: '/images/181.jpg' },
    { n: { en: 'turkey and cheese', ar: 'تيركي وجبنة' }, p: '420,000', img: '/images/182.jpg' },
    { n: { en: 'tuna mix', ar: 'تونا مكس' }, p: '420,000', img: '/images/185.jpg' } ]},
  { id: 17, name: { en: 'Salad', ar: 'سلطات' }, items: [
    { n: { en: 'greek', ar: 'يونانية' }, p: '580,000', img: '/images/170.jpg' },
    { n: { en: 'tuna pasta', ar: 'تونا باستا' }, p: '580,000', img: '/images/173.jpg' },
    { n: { en: 'chicken caeser', ar: 'تشيكن سيزر' }, p: '580,000', img: '/images/174.jpg' },
    { n: { en: 'crab', ar: 'سلطعون' }, p: '580,000', img: '/images/175.jpg' },
    { n: { en: 'quinoa feta', ar: 'كينوا فيتا' }, p: '580,000', img: '/images/177.jpg' },
    { n: { en: 'the mexican', ar: 'المكسيكية' }, p: '580,000', img: '/images/180.jpg' } ]},
  { id: 14, name: { en: 'Ahla Jalseh', ar: 'أهلا جلسة' }, items: [
    { n: { en: 'sunset spark', ar: 'صن سيت سبارك' }, p: '300,000', img: '/images/136.jpg' },
    { n: { en: 'lyche bliss', ar: 'ليتشي بليس' }, p: '300,000', img: '/images/137.jpg' },
    { n: { en: 'watermelon lemonade', ar: 'ليمون بالبطيخ' }, p: '300,000', img: '/images/142.jpg' },
    { n: { en: 'matcha frappe', ar: 'ماتشا فرابيه' }, p: '450,000', img: '/images/143.jpg' },
    { n: { en: 'iced matcha', ar: 'ماتشا مثلجة' }, p: '450,000', img: '/images/144.jpg' } ]},
  { id: 16, name: { en: 'Take Away', ar: 'تيك أواي' }, items: [
    { n: { en: 'frappe', ar: 'فرابيه' }, p: '360,000', img: '/images/165.jpg' } ]},
  { id: 11, name: { en: 'Gifts', ar: 'هدايا' }, items: [
    { n: { en: 'S001', ar: 'S001' }, p: '900,000', img: '/images/101.jpg' },
    { n: { en: 'S002', ar: 'S002' }, p: '1,700,000', img: '/images/102.jpg' },
    { n: { en: 'S003', ar: 'S003' }, p: '1,700,000', img: '/images/103.jpg' },
    { n: { en: 'S004', ar: 'S004' }, p: '1,530,000', img: '/images/104.jpg' },
    { n: { en: 'S005', ar: 'S005' }, p: '1,700,000', img: '/images/105.jpg' },
    { n: { en: 'S006', ar: 'S006' }, p: '1,450,000', img: '/images/106.jpg' },
    { n: { en: 'S007', ar: 'S007' }, p: '900,000', img: '/images/107.jpg' },
    { n: { en: 'S008', ar: 'S008' }, p: '720,000', img: '/images/108.jpg' },
    { n: { en: 'S009', ar: 'S009' }, p: '1,170,000', img: '/images/109.jpg' },
    { n: { en: 'S010', ar: 'S010' }, p: '1,170,000', img: '/images/110.jpg' },
    { n: { en: 'S011', ar: 'S011' }, p: '1,170,000', img: '/images/111.jpg' },
    { n: { en: 'S012', ar: 'S012' }, p: '900,000', img: '/images/112.jpg' },
    { n: { en: 'S013', ar: 'S013' }, p: '720,000', img: '/images/113.jpg' },
    { n: { en: 'sprinkler', ar: 'سبرانكلر' }, p: '1,080,000', img: '/images/167.jpg' },
    { n: { en: 'sprinkler pot', ar: 'وعاء سبرانكلر' }, p: '1,080,000', img: '/images/168.jpg' } ]},
  { id: 4, name: { en: 'Hot Drinks', ar: 'مشروبات ساخنة' }, items: [
    { n: { en: 'Espresso', ar: 'اسبريسو' }, p: '90,000', img: '/images/8.jpg' },
    { n: { en: 'Espresso Decaf', ar: 'اسبريسو ديكاف' }, p: '70,000', img: '/images/11.jpg' },
    { n: { en: 'Hot Americano', ar: 'هوت اميركانو' }, p: '130,000', img: '/images/12.jpg' },
    { n: { en: 'Cappuccino', ar: 'كابوتشينو' }, p: '150,000', img: '/images/13.jpg' },
    { n: { en: 'Cafe Latte', ar: 'كافيه لاتيه' }, p: '200,000', img: '/images/14.jpg' },
    { n: { en: 'Nescafé', ar: 'نسكافيه' }, p: '140,000', img: '/images/15.jpg' },
    { n: { en: 'Caramel Macchiato', ar: 'كاراميل ماكياتو' }, p: '220,000', img: '/images/16.jpg' },
    { n: { en: 'Mocha', ar: 'موكا' }, p: '220,000', img: '/images/17.jpg' },
    { n: { en: 'Turkish Coffee', ar: 'قهوة تركيه' }, p: '120,000', img: '/images/18.jpg' },
    { n: { en: 'Hot Chocolate', ar: 'هوت شوكليت' }, p: '250,000', img: '/images/19.jpg' },
    { n: { en: 'Flavored Tea', ar: 'شاي نكهات' }, p: '130,000', img: '/images/20.jpg' } ]},
  { id: 7, name: { en: 'Cold Drinks', ar: 'مشروبات باردة' }, items: [
    { n: { en: 'Iced Caramel', ar: 'ايس كاراميل' }, p: '200,000', img: '/images/30.jpg' },
    { n: { en: 'Iced Americano', ar: 'ايس اميريكان' }, p: '130,000', img: '/images/31.jpg' },
    { n: { en: 'Toffee Coffee', ar: 'توفي كافيه' }, p: '240,000', img: '/images/32.jpg' },
    { n: { en: 'Mocha', ar: 'موكا' }, p: '220,000', img: '/images/34.jpg' },
    { n: { en: 'Irish Coffee', ar: 'ايريش كوفي' }, p: '200,000', img: '/images/33.jpg' },
    { n: { en: 'Caramel Frappe', ar: 'فرابيه كاراميل' }, p: '370,000', img: '/images/35.jpg' },
    { n: { en: 'Toffee Frappe', ar: 'توفي فرابيه' }, p: '350,000', img: '/images/36.jpg' },
    { n: { en: 'Iced Coffee', ar: 'قهوة مثلجة' }, p: '170,000', img: '/images/130.jpg' },
    { n: { en: 'Spanish Latte', ar: 'سبانيش لاتيه' }, p: '200,000', img: '/images/131.jpg' },
    { n: { en: 'White Mocha Frappe', ar: 'وايت موكا فرابيه' }, p: '370,000', img: '/images/132.jpg' },
    { n: { en: 'Mocha Frappe', ar: 'موكا فرابيه' }, p: '350,000', img: '/images/135.jpg' },
    { n: { en: 'Iced White Mocha', ar: 'وايت موكا مثلجة' }, p: '220,000', img: '/images/158.jpg' },
    { n: { en: 'Vanilla Iced Coffee', ar: 'فانيلا ايسد كوفي' }, p: '200,000', img: '/images/159.jpg' },
    { n: { en: 'Vanilla Frappe', ar: 'فانيلا فرابيه' }, p: '360,000', img: '/images/222.jpg' },
    { n: { en: 'Irish Frappe', ar: 'ايريش فرابيه' }, p: '360,000', img: '/images/225.jpg' } ]},
  { id: 5, name: { en: 'Smoothies', ar: 'سموزي' }, items: [
    { n: { en: 'Strawberry Smoothie', ar: 'سموزي فريز' }, p: '350,000', img: '/images/21.jpg' },
    { n: { en: 'Berry Smoothie', ar: 'سموزي توت' }, p: '350,000', img: '/images/22.jpg' },
    { n: { en: 'Mango Smoothie', ar: 'سموزي منغا' }, p: '350,000', img: '/images/23.jpg' },
    { n: { en: 'Tropical Smoothie', ar: 'سموزي إستوائي' }, p: '350,000', img: '/images/24.jpg' } ]},
  { id: 6, name: { en: 'Shakes', ar: 'شايك' }, items: [
    { n: { en: 'Chocolate Shake', ar: 'شوكولت شيك' }, p: '380,000', img: '/images/25.jpg' },
    { n: { en: 'Strawberry Shake', ar: 'شيك فريز' }, p: '380,000', img: '/images/26.jpg' },
    { n: { en: 'Bounty Shake', ar: 'باونتي شايك' }, p: '380,000', img: '/images/27.jpg' },
    { n: { en: 'Berry Blast Shake', ar: 'بيري بلاست شايك' }, p: '380,000', img: '/images/28.jpg' },
    { n: { en: 'Lotus Milkshake', ar: 'لوتس شيك' }, p: '380,000', img: '/images/122.jpg' } ]},
  { id: 8, name: { en: 'Mocktails', ar: 'موكتايل' }, items: [
    { n: { en: 'Mojito', ar: 'موجيتو' }, p: '340,000', img: '/images/37.jpg' },
    { n: { en: 'Peach Iced Tea', ar: 'ايس تي خوخ' }, p: '180,000', img: '/images/38.jpg' },
    { n: { en: 'Passion Punch', ar: 'باشن بانش' }, p: '360,000', img: '/images/39.jpg' },
    { n: { en: 'Lychee', ar: 'ليتشي' }, p: '300,000', img: '/images/40.jpg' },
    { n: { en: 'Bisap Fresh', ar: 'كركديه طازج' }, p: '220,000', img: '/images/126.jpg' } ]},
  { id: 9, name: { en: 'Kids Menu', ar: 'منيو الاطفال' }, items: [
    { n: { en: 'Fruit Yogurt', ar: 'لبن بالفواكه' }, p: '280,000', img: '/images/41.jpg' },
    { n: { en: 'Oreo Shake', ar: 'اوريو شيك' }, p: '400,000', img: '/images/42.jpg' },
    { n: { en: 'Lotus Yum Yum', ar: 'لوتس يم يم' }, p: '400,000', img: '/images/43.jpg' },
    { n: { en: 'Bubble Gum', ar: 'علكة بابل' }, p: '280,000', img: '/images/45.jpg' },
    { n: { en: 'Strawberry Shake', ar: 'شيك فريز' }, p: '280,000', img: '/images/46.jpg' } ]},
  { id: 2, name: { en: 'Beverages', ar: 'مشروبات' }, items: [
    { n: { en: 'Water', ar: 'مياه' }, p: '50,000', img: '/images/47.jpg' },
    { n: { en: 'Energy Drink', ar: 'مشروبات طاقة' }, p: '150,000', img: '/images/50.jpg' },
    { n: { en: 'Energy Drink XL', ar: 'مشروب طاقة' }, p: '120,000', img: '/images/100.jpg' },
    { n: { en: 'Energy Drink Red Bull', ar: 'ريد بول' }, p: '190,000', img: '/images/121.jpg' },
    { n: { en: 'Sparkling Water', ar: 'مياه غازية' }, p: '120,000', img: '/images/124.jpg' } ]},
  { id: 10, name: { en: 'Desserts', ar: 'حلويات' }, items: [
    { n: { en: 'Chocolate Tart', ar: 'تارت شوكولا' }, p: '400,000', img: '/images/55.jpg' },
    { n: { en: 'Lotus Cheesecake', ar: 'لوتس تشيزكيك' }, p: '320,000', img: '/images/57.jpg' },
    { n: { en: 'Fondant', ar: 'فوندون' }, p: '400,000', img: '/images/58.jpg' },
    { n: { en: 'Creme Brulee', ar: 'كريم بروليه' }, p: '380,000', img: '/images/149.jpg' },
    { n: { en: 'Rafaello', ar: 'رافايلو' }, p: '350,000', img: '/images/150.jpg' },
    { n: { en: 'Red Velvet', ar: 'ريد فيلفيت' }, p: '360,000', img: '/images/151.jpg' },
    { n: { en: 'Crispy Snickers', ar: 'كرسبي سنكرز' }, p: '360,000', img: '/images/152.jpg' },
    { n: { en: 'Biscuit au Choco', ar: 'بسكويت بالشوكولا' }, p: '350,000', img: '/images/153.jpg' },
    { n: { en: 'Osmaliyeh', ar: 'عثمالية' }, p: '400,000', img: '/images/154.jpg' },
    { n: { en: 'Blackberry Cheesecake', ar: 'تشيزكيك بلاك بيري' }, p: '350,000', img: '/images/155.jpg' },
    { n: { en: 'Strawberry Cheesecake', ar: 'تشيزكيك فريز' }, p: '350,000', img: '/images/156.jpg' },
    { n: { en: 'Oriental', ar: 'شرقي' }, p: '320,000', img: '/images/160.jpg' },
    { n: { en: 'Fudge Cake', ar: 'فادج كيك' }, p: '350,000', img: '/images/161.jpg' },
    { n: { en: 'Opera', ar: 'أوبرا' }, p: '360,000', img: '/images/162.jpg' },
    { n: { en: 'Cheesecake Oreo', ar: 'تشيزكيك اوريو' }, p: '350,000', img: '/images/164.jpg' },
    { n: { en: 'Bahamas', ar: 'باهاماس' }, p: '350,000', img: '/images/226.jpg' },
    { n: { en: 'Kinder Cheesecake', ar: 'كيندر تشيزكيك' }, p: '350,000', img: '/images/227.jpg' },
    { n: { en: 'Knefe Cheese', ar: 'كنافة بالجبنة' }, p: '350,000', img: '/images/228.jpg' } ]},
  { id: 3, name: { en: 'Shisha', ar: 'اراغيل' }, items: [
    { n: { en: 'Shisha', ar: 'اراغيل' }, p: '440,000', img: '/images/10.jpg' } ]}
]

export default function App() {
  const [lang, setLang] = useState('ar')
  const [cat, setCat] = useState('all')
  const t = (o) => o[lang]

  const visible = cat === 'all' ? data : data.filter(c => c.id === cat)

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="app">
      <div className="bg-store"></div>
      <div className="hero" style={{ backgroundImage: 'url(/store-bg.jpg)' }}>
        <button className="lang-btn hero-lang" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
          {lang === 'ar' ? 'EN' : 'عربي'}
        </button>
        <img className="hero-logo" src="/logo.png" alt="Ahla Jalse" onError={(e) => { e.target.style.display = 'none' }} />
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
                      <img loading="lazy" decoding="async" src={it.img} alt={t(it.n)} onError={(e) => {
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
