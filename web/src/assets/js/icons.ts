import juices from '../images/juices.png'
import bbq_grill from '../images/bbq-grill.png'
import coconut from '../images/coconut.png'
import kiosk from '../images/kiosk.png'
import meatball from '../images/meatball.png'


const images = {
  juices,
  bbq_grill,
  coconut,
  kiosk,
  meatball
}

export type IconKeys = keyof typeof images

const icons: Record<IconKeys, HTMLImageElement> = {} as Record<IconKeys, HTMLImageElement>;

for (const [key, value] of Object.entries(images)) {
  let image = document.createElement('img')
  image.src = value
  image.className = 'h-8 w-8'

  icons[key] = image
}

export default icons;
