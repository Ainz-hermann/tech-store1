import { Laptop, Smartphone, Headphones, Tv, Watch, Camera, Speaker, Gamepad, ChevronRight } from 'lucide-react-native';
import { products } from './products';

export const categories = [
  { name: 'All', icon: ChevronRight },
  { name: 'Laptops', icon: Laptop },
  { name: 'Phones', icon: Smartphone },
  { name: 'Headphones', icon: Headphones },
  { name: 'TVs', icon: Tv },
  { name: 'Watches', icon: Watch },
  { name: 'Cameras', icon: Camera },
  { name: 'Speakers', icon: Speaker },
  { name: 'Gaming', icon: Gamepad },
];

export const promotions = [
  {
    id: 1,
    title: 'Summer Sale',
    subtitle: 'Up to 40% off on selected items',
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Check out the latest tech',
    image: 'https://images.pexels.com/photos/4195326/pexels-photo-4195326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Gaming Deals',
    subtitle: 'Level up your gaming setup',
    image: 'https://images.pexels.com/photos/4225230/pexels-photo-4225230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const featuredProducts = products.slice(0, 6);