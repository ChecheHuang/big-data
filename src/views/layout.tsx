import { SelectForm } from './components/SelectForm'
import brand from '@/assets/brand.png'
import { Settings } from 'lucide-react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
  return (
    <>
      <header className="flex h-[48px] w-full items-center justify-between bg-primary px-4 text-white">
        <div>LOGO</div>
        <button className="rounded-md  border border-white p-1 ">
          <Settings />
        </button>
      </header>
      <div className="relative  flex  h-[calc(100vh-48px)] bg-slate-200  ">
        <aside className=" hidden h-full w-[146px] bg-white md:block">
          <img className="h-full w-full object-contain" src={brand} alt="" />
        </aside>
        <main className="h-full w-full flex-1 overflow-auto">
          <div className="flex w-full flex-col items-center  px-2">
            <h1 className="my-6 text-2xl">人口數、戶數按戶別及性別統計</h1>
            <SelectForm />
            <div className="mt-4 flex w-full items-center justify-around">
              <div className="h-[1px] w-[40%] bg-primary"></div>
              <span className="w-32 cursor-pointer  rounded-full border border-primary/70 bg-slate-200 px-4 py-2 text-center">
                搜尋結果
              </span>
              <div className="h-[1px] w-[40%] bg-primary"></div>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout
