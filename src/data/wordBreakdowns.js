// Word-by-word breakdowns keyed by phrase id
// Each entry: { phonetic, thai, meaning }
export const WORD_BREAKDOWNS = {
  hello: [
    { phonetic: 'Sawat-dee', thai: 'สวัสดี', meaning: 'hello / greetings' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  goodbye: [
    { phonetic: 'La', thai: 'ลา', meaning: 'farewell / leave' },
    { phonetic: 'korn', thai: 'ก่อน', meaning: 'first / before' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  thank_you: [
    { phonetic: 'Khop-khun', thai: 'ขอบคุณ', meaning: 'thank you' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  sorry: [
    { phonetic: 'Kho', thai: 'ขอ', meaning: 'to request / excuse' },
    { phonetic: 'thot', thai: 'โทษ', meaning: 'fault / blame' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  help: [
    { phonetic: 'Chuay', thai: 'ช่วย', meaning: 'help' },
    { phonetic: 'duay', thai: 'ด้วย', meaning: 'also / please' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  my_name: [
    { phonetic: 'Phom / Chan', thai: 'ผม / ฉัน', meaning: 'I (male / female)' },
    { phonetic: 'cheu', thai: 'ชื่อ', meaning: 'name / named' },
    { phonetic: '[your name]', thai: '...', meaning: 'your name here' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  yes_no: [
    { phonetic: 'Chai', thai: 'ใช่', meaning: 'yes / correct' },
    { phonetic: 'Mai chai', thai: 'ไม่ใช่', meaning: 'no / not correct' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  shellfish_allergy: [
    { phonetic: 'Phom / Chan', thai: 'ผม / ฉัน', meaning: 'I (male / female)' },
    { phonetic: 'phae', thai: 'แพ้', meaning: 'allergic to' },
    { phonetic: 'aa-haan', thai: 'อาหาร', meaning: 'food' },
    { phonetic: 'ta-lae', thai: 'ทะเล', meaning: 'sea / seafood' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  shellfish_check: [
    { phonetic: 'Aa-haan nee', thai: 'อาหารนี้', meaning: 'this food / dish' },
    { phonetic: 'mee', thai: 'มี', meaning: 'have / contain' },
    { phonetic: 'aa-haan ta-lae', thai: 'อาหารทะเล', meaning: 'seafood' },
    { phonetic: 'mai', thai: 'ไหม', meaning: 'question particle (?)' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  not_spicy: [
    { phonetic: 'Mai', thai: 'ไม่', meaning: 'no / not' },
    { phonetic: 'ao', thai: 'เอา', meaning: 'want' },
    { phonetic: 'phet', thai: 'เผ็ด', meaning: 'spicy' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  no_chili: [
    { phonetic: 'Mai', thai: 'ไม่', meaning: 'no / not' },
    { phonetic: 'sai', thai: 'ใส่', meaning: 'put / add' },
    { phonetic: 'phrik', thai: 'พริก', meaning: 'chili' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  delicious: [
    { phonetic: 'Aroy', thai: 'อร่อย', meaning: 'delicious / tasty' },
    { phonetic: 'mak', thai: 'มาก', meaning: 'very / a lot' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  bill_please: [
    { phonetic: 'Kep', thai: 'เก็บ', meaning: 'collect / take' },
    { phonetic: 'ngen', thai: 'เงิน', meaning: 'money' },
    { phonetic: 'duay', thai: 'ด้วย', meaning: 'also / please' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  water: [
    { phonetic: 'Nam', thai: 'น้ำ', meaning: 'water' },
    { phonetic: 'plao', thai: 'เปล่า', meaning: 'plain / empty' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  bathroom: [
    { phonetic: 'Hong-nam', thai: 'ห้องน้ำ', meaning: 'bathroom (lit. water room)' },
    { phonetic: 'yoo', thai: 'อยู่', meaning: 'is / located' },
    { phonetic: 'thee-nai', thai: 'ที่ไหน', meaning: 'where' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  where_is: [
    { phonetic: '[place name]', thai: '...', meaning: 'destination / location' },
    { phonetic: 'yoo', thai: 'อยู่', meaning: 'is / located' },
    { phonetic: 'thee-nai', thai: 'ที่ไหน', meaning: 'where' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  how_to_get: [
    { phonetic: 'Pai', thai: 'ไป', meaning: 'go' },
    { phonetic: 'thee', thai: 'ที่', meaning: 'to / at' },
    { phonetic: '[place]', thai: '...', meaning: 'destination' },
    { phonetic: 'yang-rai', thai: 'อย่างไร', meaning: 'how' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  take_me: [
    { phonetic: 'Pha', thai: 'พา', meaning: 'take / lead' },
    { phonetic: 'pai', thai: 'ไป', meaning: 'go' },
    { phonetic: 'thee', thai: 'ที่', meaning: 'to / at' },
    { phonetic: '[destination]', thai: '...', meaning: 'place name' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  how_much: [
    { phonetic: 'An-nee', thai: 'อันนี้', meaning: 'this one / this item' },
    { phonetic: 'thao-rai', thai: 'เท่าไหร่', meaning: 'how much' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  expensive: [
    { phonetic: 'Phaeng', thai: 'แพง', meaning: 'expensive' },
    { phonetic: 'pai', thai: 'ไป', meaning: 'too / excessively' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  will_you_take: [
    { phonetic: '[price]', thai: '[ราคา]', meaning: 'your offer amount' },
    { phonetic: 'dai', thai: 'ได้', meaning: 'can / acceptable' },
    { phonetic: 'mai', thai: 'ไหม', meaning: 'question particle (?)' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  discount: [
    { phonetic: 'Lot', thai: 'ลด', meaning: 'reduce / discount' },
    { phonetic: 'noi', thai: 'หน่อย', meaning: 'a little' },
    { phonetic: 'dai', thai: 'ได้', meaning: 'can' },
    { phonetic: 'mai', thai: 'ไหม', meaning: 'or not (?)' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  very_good: [
    { phonetic: 'Dee', thai: 'ดี', meaning: 'good' },
    { phonetic: 'mak', thai: 'มาก', meaning: 'very' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  no_problem: [
    { phonetic: 'Mai', thai: 'ไม่', meaning: 'not' },
    { phonetic: 'pen', thai: 'เป็น', meaning: 'to be' },
    { phonetic: 'rai', thai: 'ไร', meaning: 'anything' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  welcome: [
    { phonetic: 'Yin-dee', thai: 'ยินดี', meaning: 'delighted / pleased' },
    { phonetic: 'khrap / ka', thai: 'ครับ / ค่ะ', meaning: 'polite particle' },
  ],
  temple_etiquette: [
    { phonetic: 'Ma-ra-yaat', thai: 'มารยาท', meaning: 'etiquette / manners' },
    { phonetic: 'nai', thai: 'ใน', meaning: 'in / inside' },
    { phonetic: 'wat', thai: 'วัด', meaning: 'temple' },
  ],
  head_feet: [
    { phonetic: 'Hua', thai: 'หัว', meaning: 'head' },
    { phonetic: 'sak-sit', thai: 'ศักดิ์สิทธิ์', meaning: 'sacred / holy' },
    { phonetic: 'thao', thai: 'เท้า', meaning: 'feet' },
    { phonetic: 'tam', thai: 'ต่ำ', meaning: 'low / inferior' },
  ],
};
