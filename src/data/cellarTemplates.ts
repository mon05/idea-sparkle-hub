export interface CellarTemplate {
  id: string;
  titleEn: string;
  titleKa: string;
  noteEn: string;
  noteKa: string;
  intervalDays: number; // default recurrence interval
  icon: string;
}

export const cellarTemplates: CellarTemplate[] = [
  {
    id: 'rack-wine',
    titleEn: 'Rack wine',
    titleKa: 'ღვინის გადაღება',
    noteEn: 'Transfer wine off lees to a clean vessel',
    noteKa: 'ღვინის ნალექიდან სუფთა ჭურჭელში გადატანა',
    intervalDays: 30,
    icon: '🍷',
  },
  {
    id: 'test-so2',
    titleEn: 'Test SO₂',
    titleKa: 'SO₂-ის ტესტი',
    noteEn: 'Measure free and total SO₂ levels',
    noteKa: 'თავისუფალი და საერთო SO₂ დონის გაზომვა',
    intervalDays: 14,
    icon: '🧪',
  },
  {
    id: 'check-mlf',
    titleEn: 'Check MLF',
    titleKa: 'MLF შემოწმება',
    noteEn: 'Test malolactic fermentation progress via chromatography',
    noteKa: 'მალოლაქტიკური დუღილის პროგრესის შემოწმება',
    intervalDays: 7,
    icon: '🔬',
  },
  {
    id: 'top-up-barrels',
    titleEn: 'Top up barrels',
    titleKa: 'კასრების შევსება',
    noteEn: 'Top up barrels to minimize ullage and oxidation',
    noteKa: 'კასრების შევსება ოქსიდაციის შესამცირებლად',
    intervalDays: 14,
    icon: '🪵',
  },
  {
    id: 'temperature-check',
    titleEn: 'Temperature check',
    titleKa: 'ტემპერატურის შემოწმება',
    noteEn: 'Monitor fermentation or storage temperature',
    noteKa: 'დუღილის ან შენახვის ტემპერატურის მონიტორინგი',
    intervalDays: 1,
    icon: '🌡️',
  },
  {
    id: 'brix-check',
    titleEn: 'Check Brix / SG',
    titleKa: 'Brix / SG შემოწმება',
    noteEn: 'Measure sugar levels during fermentation',
    noteKa: 'შაქრის დონის გაზომვა დუღილისას',
    intervalDays: 1,
    icon: '📊',
  },
];
