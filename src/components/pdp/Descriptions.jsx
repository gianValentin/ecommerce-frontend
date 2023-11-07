import React from 'react'

const productDemoData = {    
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, cumque repellat, tempora recusandae aliquam nemo esse natus impedit, nostrum temporibus veritatis eaque soluta aperiam id repudiandae fugiat deserunt! Explicabo, veritatis?',
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    details:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, cumque repellat, tempora recusandae aliquam nemo esse natus impedit, nostrum temporibus veritatis eaque soluta aperiam id.',
  }

const Descriptions = ({product}) => {
    return (
        <>
            <div>
                <h3 className="sr-only">Descripción</h3>

                <div className="space-y-6">
                    <p className="text-base text-gray-900">{product.description ?? productDemoData.description}</p>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Aspectos destacados</h3>

                <div className="mt-4">
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                        {[product.highlights ?? productDemoData.highlights].map((highlight) => (
                            <li key={highlight} className="text-gray-400">
                                <span className="text-gray-600">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Detalles</h2>

                <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details ?? productDemoData.details}</p>
                </div>
            </div>
        </>
    )
}

export default Descriptions