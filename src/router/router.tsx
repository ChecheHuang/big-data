import LazyLoad from './LazyLoad/LazyLoad'

const router: Route[] = [
  {
    path: '/',
    element: LazyLoad(import('@/views/layout')),
    children: [
      {
        path: '/:year/:county/:town',
        element: LazyLoad(import('@/views/[year]/[county]/[town]/page')),
      },
    ],
  },
  {
    path: '/*',
    element: LazyLoad(import('@/views/notfound/page')),
    label: 'Not Found',
    name: 'Not Found',
    isHidden: true,
  },
]
export default router
export interface Route {
  path: string
  element: JSX.Element
  name?: string
  label?: string
  icon?: JSX.Element
  children?: Route[]
  isHidden?: boolean
}
