import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useRef(true)
  const dep = deps?.map((item) => JSON.stringify(item))

  useEffect(() => {
    const isFirstRender = isFirst.current
    if (isFirstRender) {
      isFirst.current = false
      return
    }

    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dep)
}
export default useUpdateEffect
