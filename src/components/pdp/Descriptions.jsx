import React from 'react'

const productDemoData = {    
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  }

const Descriptions = ({product}) => {
    return (
        <>
            <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                    <p className="text-base text-gray-900">{product.description ?? productDemoData.description}</p>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

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
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details ?? productDemoData.details}</p>
                </div>
            </div>
        </>
    )
}

export default Descriptions