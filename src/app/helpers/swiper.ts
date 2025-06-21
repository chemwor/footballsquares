import Swiper from 'swiper'
import type { SwiperOptions } from 'swiper/types'

export const initBindSwiper = (
  element: HTMLElement,
  options: SwiperOptions
): Swiper => {
  const swiperInstance = new Swiper(element, options)

  swiperInstance.on('activeIndexChange', (e) => {
    const activeId = e.slides[e.activeIndex].dataset['swiperBinded']
    const prevId = e.slides[e.previousIndex].dataset['swiperBinded']

    const targetItem = activeId ? document.querySelector(`#${activeId}`) : null
    const previousItem = prevId ? document.querySelector(`#${prevId}`) : null

    previousItem?.classList.remove('active')
    targetItem?.classList.add('active')
  })

  return swiperInstance
}

