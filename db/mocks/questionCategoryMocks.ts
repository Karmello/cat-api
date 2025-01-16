import { IQuestionCategory } from 'cat-shared/utils'

const QUESTION_CATEGORY_MOCKS = [
  { _id: '67853c6f182c98ed8158532d', name: { en: 'Architecture', pl: 'Architektura' } },
  { _id: '67853c6f182c98ed8158532e', name: { en: 'Arts', pl: 'Sztuka' } },
  { _id: '67853c6f182c98ed8158532f', name: { en: 'Banking', pl: 'Bankowość' } },
  { _id: '67853c6f182c98ed81585330', name: { en: 'Biology', pl: 'Biologia' } },
  { _id: '67853c6f182c98ed81585331', name: { en: 'Business', pl: 'Biznes' } },
  { _id: '67853c6f182c98ed81585332', name: { en: 'Cars', pl: 'Samochody' } },
  {
    _id: '67853c6f182c98ed81585333',
    name: { en: 'Celebrities', pl: 'Celebryci' },
  },
  { _id: '67853c6f182c98ed81585334', name: { en: 'Chemistry', pl: 'Chemia' } },
  {
    _id: '67853c6f182c98ed81585335',
    name: { en: 'Construction', pl: 'Budownictwo' },
  },
  {
    _id: '67853c6f182c98ed81585336',
    name: { en: 'Economics', pl: 'Ekonomia' },
  },
  {
    _id: '67853c6f182c98ed81585337',
    name: { en: 'Education', pl: 'Edukacja' },
  },
  {
    _id: '67853c6f182c98ed81585338',
    name: { en: 'Electronics', pl: 'Elektronika' },
  },
  {
    _id: '67853c6f182c98ed81585339',
    name: { en: 'Entertainment', pl: 'Rozrywka' },
  },
  { _id: '67853c6f182c98ed8158533a', name: { en: 'Film', pl: 'Film' } },
  {
    _id: '67853c6f182c98ed8158533b',
    name: { en: 'Food & beverages', pl: 'Gastronomia' },
  },
  { _id: '67853c6f182c98ed8158533c', name: { en: 'Gaming', pl: 'Gry' } },
  {
    _id: '67853c6f182c98ed8158533d',
    name: { en: 'Geography', pl: 'Geografia' },
  },
  { _id: '67853c6f182c98ed8158533e', name: { en: 'Government', pl: 'Rząd' } },
  { _id: '67853c6f182c98ed8158533f', name: { en: 'Health', pl: 'Zdrowie' } },
  { _id: '67853c6f182c98ed81585340', name: { en: 'History', pl: 'Historia' } },
  {
    _id: '67853c6f182c98ed81585341',
    name: { en: 'Information technology', pl: 'Informatyka' },
  },
  { _id: '67853c6f182c98ed81585342', name: { en: 'Internet', pl: 'Internet' } },
  { _id: '67853c6f182c98ed81585343', name: { en: 'Languages', pl: 'Języki' } },
  {
    _id: '67853c6f182c98ed81585344',
    name: { en: 'Literature', pl: 'Literatura' },
  },
  {
    _id: '67853c6f182c98ed81585345',
    name: { en: 'Mathematics', pl: 'Matematyka' },
  },
  { _id: '67853c6f182c98ed81585346', name: { en: 'Media', pl: 'Media' } },
  {
    _id: '67853c6f182c98ed81585347',
    name: { en: 'Motorization', pl: 'Motoryzacja' },
  },
  { _id: '67853c6f182c98ed81585348', name: { en: 'Music', pl: 'Muzyka' } },
  { _id: '67853c6f182c98ed81585349', name: { en: 'Nature', pl: 'Natura' } },
  { _id: '67853c6f182c98ed8158534a', name: { en: 'Physics', pl: 'Fizyka' } },
  { _id: '67853c6f182c98ed8158534b', name: { en: 'Politics', pl: 'Polityka' } },
  {
    _id: '67853c6f182c98ed8158534c',
    name: { en: 'Programming', pl: 'Programowanie' },
  },
  {
    _id: '67853c6f182c98ed8158534d',
    name: { en: 'Psychology', pl: 'Psychologia' },
  },
  { _id: '67853c6f182c98ed8158534e', name: { en: 'Religion', pl: 'Religia' } },
  { _id: '67853c6f182c98ed8158534f', name: { en: 'Science', pl: 'Nauka' } },
  {
    _id: '67853c6f182c98ed81585350',
    name: { en: 'Sociology', pl: 'Socjologia' },
  },
  { _id: '67853c6f182c98ed81585351', name: { en: 'Sport', pl: 'Sport' } },
  {
    _id: '67853c6f182c98ed81585352',
    name: { en: 'Technology', pl: 'Technologia' },
  },
  { _id: '67853c6f182c98ed81585353', name: { en: 'Theater', pl: 'Teatr' } },
  {
    _id: '67853c6f182c98ed81585354',
    name: { en: 'Traveling', pl: 'Podróżowanie' },
  },
  { _id: '67853c6f182c98ed81585355', name: { en: 'TV', pl: 'Telewizja' } },
  { _id: '67853c6f182c98ed81585356', name: { en: 'Universe', pl: 'Kosmos' } },
  { _id: '67853c6f182c98ed81585357', name: { en: 'Other', pl: 'Inne' } },
] as IQuestionCategory[]

export default QUESTION_CATEGORY_MOCKS
