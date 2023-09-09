import juices from '../images/juices.png'
import bbq_grill from '../images/bbq-grill.png'
import coconut from '../images/coconut.png'
import kiosk from '../images/kiosk.png'
import meatball from '../images/meatball.png'


export const iconImages = {
  juices,
  bbq_grill,
  coconut,
  kiosk,
  meatball,
}

export type IconKeys = keyof typeof iconImages

const icons: Record<IconKeys, HTMLImageElement> = {} as Record<IconKeys, HTMLImageElement>;

for (const [key, value] of Object.entries(iconImages)) {
  let image = document.createElement('img')
  image.src = value
  image.className = 'object-scale-down'

  icons[key] = image
}

export default icons;
