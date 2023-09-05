import { ClipLoader } from 'react-spinners'

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ClipLoader color="#651FFF" size={50} />
    </div>
  )
}

export default Loading
