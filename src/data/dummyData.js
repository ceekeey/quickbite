export const categories = [
  { id: 1, name: 'All', icon: '🍽️' },
  { id: 2, name: 'Pizza', icon: '🍕' },
  { id: 3, name: 'Burgers', icon: '🍔' },
  { id: 4, name: 'Sushi', icon: '🍣' },
  { id: 5, name: 'Salads', icon: '🥗' },
  { id: 6, name: 'Desserts', icon: '🍰' },
  { id: 7, name: 'Drinks', icon: '🥤' },
];

export const foods = [
  {
    id: 1,
    name: 'Classic Margherita Pizza',
    price: 12.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop',
    description: 'Fresh mozzarella, tomatoes, and basil on our signature thin crust.',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Double Cheeseburger',
    price: 9.99,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    description: 'Two juicy beef patties with cheddar cheese, lettuce, and our secret sauce.',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Premium Sushi Platter',
    price: 24.50,
    category: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop',
    description: 'A selection of fresh nigiri and maki rolls prepared by our master chef.',
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Greek Salad',
    price: 8.50,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop',
    description: 'Fresh cucumber, tomatoes, olives, and feta cheese with balsamic vinaigrette.',
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Chocolate Lava Cake',
    price: 6.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800&auto=format&fit=crop',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Strawberry Milkshake',
    price: 4.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bee?q=80&w=800&auto=format&fit=crop',
    description: 'Creamy milkshake made with fresh strawberries and whole milk.',
    rating: 4.6,
  },
];

export const orders = [
  {
    id: '#ORD-1001',
    user: 'John Doe',
    items: ['Classic Margherita Pizza', 'Strawberry Milkshake'],
    total: 17.49,
    status: 'Delivered',
    date: '2026-04-09 18:30',
  },
  {
    id: '#ORD-1002',
    user: 'Jane Smith',
    items: ['Double Cheeseburger', 'Double Cheeseburger'],
    total: 19.98,
    status: 'Pending',
    date: '2026-04-10 10:15',
  },
  {
    id: '#ORD-1003',
    user: 'Michael Brown',
    items: ['Premium Sushi Platter'],
    total: 24.50,
    status: 'Preparing',
    date: '2026-04-10 11:00',
  },
];

export const stats = [
  { label: 'Total Orders', value: '1,240', change: '+12%', icon: 'ShoppingBag' },
  { label: 'Total Revenue', value: '$12,850', change: '+18%', icon: 'DollarSign' },
  { label: 'Active Users', value: '450', change: '+5%', icon: 'Users' },
];
