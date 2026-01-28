
import { Plant, Sunlight, Water, Size, Season } from './types';

export const PLANTS: Plant[] = [
  {
    id: 'tomato',
    name: 'Tomate',
    icon: '🍅',
    sun: Sunlight.SUNNY,
    water: Water.HIGH,
    size: Size.LARGE,
    season: Season.SPRING,
    friends: ['basil', 'carrot', 'onion', 'marigold'],
    enemies: ['potato', 'fennel'],
    tip: 'Tomaten brauchen viel Sonne und Schutz vor Regen.'
  },
  {
    id: 'carrot',
    name: 'Karotte',
    icon: '🥕',
    sun: Sunlight.SUNNY,
    water: Water.MEDIUM,
    size: Size.SMALL,
    season: Season.SPRING,
    friends: ['onion', 'tomato', 'leek'],
    enemies: ['fennel'],
    tip: 'Karotten lieben lockeren Boden ohne Steine.'
  },
  {
    id: 'basil',
    name: 'Basilikum',
    icon: '🌿',
    sun: Sunlight.SUNNY,
    water: Water.MEDIUM,
    size: Size.SMALL,
    season: Season.SUMMER,
    friends: ['tomato', 'zucchini'],
    enemies: ['melissa'],
    tip: 'Zupfe immer die Spitzen ab, dann wächst es buschiger.'
  },
  {
    id: 'lettuce',
    name: 'Salat',
    icon: '🥬',
    sun: Sunlight.PARTIAL,
    water: Water.MEDIUM,
    size: Size.SMALL,
    season: Season.SPRING,
    friends: ['radish', 'strawberry', 'cucumber'],
    enemies: ['parsley'],
    tip: 'Salat mag es nicht zu heiß, sonst wird er bitter.'
  },
  {
    id: 'strawberry',
    name: 'Erdbeere',
    icon: '🍓',
    sun: Sunlight.SUNNY,
    water: Water.MEDIUM,
    size: Size.SMALL,
    season: Season.SPRING,
    friends: ['onion', 'lettuce', 'spinach'],
    enemies: ['cabbage'],
    tip: 'Etwas Stroh unter den Früchten hält sie sauber und trocken.'
  },
  {
    id: 'zucchini',
    name: 'Zucchini',
    icon: '🥒',
    sun: Sunlight.SUNNY,
    water: Water.HIGH,
    size: Size.LARGE,
    season: Season.SUMMER,
    friends: ['onion', 'basil', 'corn'],
    enemies: ['cucumber'],
    tip: 'Eine Pflanze reicht meistens für eine ganze Familie!'
  },
  {
    id: 'onion',
    name: 'Zwiebel',
    icon: '🧅',
    sun: Sunlight.SUNNY,
    water: Water.LOW,
    size: Size.SMALL,
    season: Season.SPRING,
    friends: ['carrot', 'strawberry', 'tomato'],
    enemies: ['bean', 'pea'],
    tip: 'Zwiebeln halten viele Schädlinge von ihren Nachbarn fern.'
  },
  {
    id: 'radish',
    name: 'Radieschen',
    icon: '🔴',
    sun: Sunlight.PARTIAL,
    water: Water.MEDIUM,
    size: Size.SMALL,
    season: Season.SPRING,
    friends: ['lettuce', 'carrot', 'pea'],
    enemies: ['cucumber'],
    tip: 'Wachsen superschnell – ideal für ungeduldige Gärtner.'
  },
  {
    id: 'pepper',
    name: 'Paprika',
    icon: '🫑',
    sun: Sunlight.SUNNY,
    water: Water.MEDIUM,
    size: Size.MEDIUM,
    season: Season.SUMMER,
    friends: ['basil', 'carrot', 'onion'],
    enemies: ['fennel'],
    tip: 'Brauchen viel Wärme, am besten an einer Südwand.'
  },
  {
    id: 'potato',
    name: 'Kartoffel',
    icon: '🥔',
    sun: Sunlight.SUNNY,
    water: Water.MEDIUM,
    size: Size.MEDIUM,
    season: Season.SPRING,
    friends: ['corn', 'marigold', 'bean'],
    enemies: ['tomato', 'sunflower'],
    tip: 'Kann man auch prima in einem großen Sack anbauen.'
  },
  {
    id: 'mint',
    name: 'Minze',
    icon: '🍃',
    sun: Sunlight.PARTIAL,
    water: Water.HIGH,
    size: Size.MEDIUM,
    season: Season.SPRING,
    friends: ['tomato', 'cabbage'],
    enemies: ['chamomile'],
    tip: 'Vorsicht: Minze breitet sich sehr stark aus!'
  },
  {
    id: 'marigold',
    name: 'Ringelblume',
    icon: '🌼',
    sun: Sunlight.SUNNY,
    water: Water.MEDIUM,
    size: Size.MEDIUM,
    season: Season.SPRING,
    friends: ['tomato', 'potato', 'strawberry'],
    enemies: [],
    tip: 'Sieht toll aus und hilft dem Boden gesund zu bleiben.'
  }
];
