import React, {useState} from 'react'

interface Info {
  price: Number
}

const Price: React.FC<Info> = ({price}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          {Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(price)}
        </div>
        <div className="font-light text-neutral-600">
          p/ mês
        </div>
      </div>
      
    </div>
  )
}

export default Price;