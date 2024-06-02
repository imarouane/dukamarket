import {
  slider_img_1,
  slider_img_3,
  slider_img_4,
  banner_1,
  banner_2,
  banner_3
} from '@/assets/images'
import {
  TruckIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline'

export const PRODUCTS_PER_PAGE = 10

export const heroContent = [
  {
    title: 'The best Smart Watch',
    priority: 'Hot Deals',
    discount: 30,
    sliderImage: slider_img_1
  },
  {
    title: 'XX99 Mark II Headphone',
    priority: 'New Arraivels',
    discount: 15,
    sliderImage: slider_img_4
  },
  {
    title: 'The best Tabltes',
    priority: 'New Deals',
    discount: 20,
    sliderImage: slider_img_3
  }
]

export const features = [
  {
    title: 'Free Delivery',
    description: 'For all orders over $120',
    icon: TruckIcon
  },
  {
    title: 'Save Payment',
    description: '100% secure payment',
    icon: CreditCardIcon
  },
  {
    title: 'Member Discount',
    description: 'One very order over $140.00',
    icon: CurrencyDollarIcon
  },
  {
    title: '24/7 HELP CENTER',
    description: 'Delicated 24/7 support',
    icon: ChatBubbleLeftRightIcon
  }
]

export const bannerItems = [
  {
    title: 'New Touch Control',
    priority: 'Intelligent',
    description: 'Discount 20% On Products',
    image: banner_1
  },
  {
    title: 'Best Prices',
    priority: 'On-sale',
    description: 'Limited Time: Online Only!',
    image: banner_2
  },
  {
    title: 'Super Laptops 2024',
    priority: 'Hot Sale',
    description: 'Free Shipping All Order',
    image: banner_3
  }
]
