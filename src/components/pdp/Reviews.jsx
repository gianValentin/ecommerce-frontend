import { StarIcon } from '@heroicons/react/24/outline'
import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const reviews = { href: '#', average: 4, totalCount: 117 }

const Reviews = ({ product }) => {
    return (
        <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
                <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                            key={rating}
                            className={classNames(
                                reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                        />
                    ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                </a>
            </div>
        </div>
    )
}

export default Reviews