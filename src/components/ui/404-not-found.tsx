"use client";

import { Button } from "@/components/Contacts/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function NotFoundPage() {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background">

			<div className="relative z-10 flex flex-col items-center justify-center text-center p-8 max-w-2xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="flex flex-col items-center space-y-4 mb-8"
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 1, delay: 0.2, type: "spring" }}
					>
						<h2 className="mask-b-from-20% mask-b-to-80% text-[12rem] md:text-[16rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/80 to-transparent select-none scale-x-[1.2] scale-y-[1.1]">
							404
						</h2>
					</motion.div>

					<div className="space-y-4 -mt-12 md:-mt-16 z-10">
						<h3 className="text-2xl md:text-3xl lg:text-5xl -mt-2 font-bold tracking-tight uppercase">
							Page not found
						</h3>
						<p className="text-muted-custom max-w-md mx-auto text-sm md:text-base">
							Oops! That link seems to be broken.<br />
							Let&apos;s head back home.
						</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
					className="flex flex-col sm:flex-row items-center gap-4"
				>
					<Button asChild variant="default" className="gap-4 px-8 py-6 rounded-full  border-t hover:border-white/50 border-transparent">
						<Link href="/">
							<HomeIcon className="w-4 h-4" />
							Back to Home
						</Link>
					</Button>
				</motion.div>
			</div>
		</div>
	);
}
