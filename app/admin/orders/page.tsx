import OrderCard from '@/components/admin/OrderCard'
import { prisma } from '@/src/lib/prisma'
import React from 'react'

async function getPendingOrders() {
    const orders = await prisma.order.findMany({
        where: {
            status: false
        },
        include: { //-->incluimos orderProducts
            orderProducts: {
                include: { //-->nos traemos los productos
                    product: true
                }
            }
        }
    })
    return orders
}

export default async function page() {
    const orders = await getPendingOrders()

    return (
        <>
            <h1 className="text-3xl text-center text-sky-900 font-bold mt-10 mb-5">Administra tus Ordenes</h1>

            {orders.length ?  (
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-5 my-16'>
                    {orders.map((order) => (
                        <OrderCard 
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            ) : <p>No hay órdenes pendientes</p>}
        </>
    )
}
