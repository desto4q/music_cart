"use client"

import { useAtom, useAtomValue } from "jotai";
import { cart_atom, cart_total_atom } from "@/store/store";
import { LucideDelete } from "lucide-react";
import { usePaystackPayment } from "react-paystack";
const config = {
    reference: (new Date()).getTime().toString(),
    email: "desto4q@gmail.com",
    amount: 20000 * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK as string,
};
function Page() {
	let [cartItems, setCartItems] = useAtom(cart_atom);
	let cart_total = useAtomValue(cart_total_atom);
    const initializePayment = usePaystackPayment(config);
	return (
		<div className="bg-base-200">
            {/* <p>{process.env.NEXT_PUBLIC_PAYSTACK}</p> */}
			<main className="container mx-auto  py-4 flex flex-col">
				<div>
					<h2 className="text-3xl font-bold">Your Cart</h2>
					<div className="flex">
						<div className="flex-[1_1_350px]">
							<h3 className=" py-2 text-xl font-bold mb-2 border-b">
								Product
							</h3>
							{cartItems.map((e,i) => {
								return (
									<div
										className="flex gap-2 h-20 items-center"
										key={`cart_${e.id}_${i}`}
									>
										<div className="size-16">
											<img
												className="size-16 rounded-lg shadow-xl"
												src={e.image_url}
												alt=""
											/>
										</div>
										<div>
											<div className="text-primary font-semibold text-xl">
												{e.title}
											</div>
											<p>producer Pack</p>
										</div>
									</div>
								);
							})}
						</div>
						<div className="">
							<h3 className=" py-2 text-xl font-bold mb-2 border-b">
								Price
							</h3>
							<div>
								{cartItems.map((e) => {
									return (
										<div className="  h-18" key={`cart_price_${e.id}`}>
											N{e.price}
											<button
												className="btn btn-ghost"
												onClick={() => {
													setCartItems((prev) => {
														return prev.filter(
															(itm) => {
																return (
																	e.id !=
																	itm.id
																);
															}
														);
													});
												}}
											>
												<LucideDelete />
											</button>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				<div className="ml-auto">
					<h3 className=" py-2 text-xl font-bold mb-2 border-b">
						Total
					</h3>
					{cart_total > 0 ? (
						<p className="text-3xl font-bold">N{cart_total}</p>
					) : (
						<p className="text-3xl font-bold text-error">
							Cart Is Empty
						</p>
					)}
                    <button onClick={async ()=>{
                       initializePayment({
                        onSuccess:(e)=>{
                            console.log(e)
                        },
                       })
                    }} className="btn btn-lg btn-primary">Pay now</button>
				</div>
			</main>
		</div>
	);
}

export default Page;
