"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const searchNavLinks = [
	{ name: "Rider", href: "/search/rider" },
	{ name: "Team", href: "/search/team" },
	{ name: "Race", href: "/search/race" },
];

export default function SearchLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="p-8">
				<div className="text-center mb-8">
					<h1 className="text-5xl font-bold tracking-tight">Search</h1>
					<p className="text-muted-foreground mt-2">for a</p>
				</div>
				<nav className="flex justify-center gap-4 mb-8">
					{searchNavLinks.map((link) => (
						<Button
							key={link.href}
							asChild
							variant="outline"
							size="lg"
						>
							<Link href={link.href}>{link.name}</Link>
						</Button>
					))}
				</nav>
				<div className="mt-6">{children}</div>
			</div>
		);
	}

	return (
		<div className="p-8">
			<div className="text-center mb-8">
				<h1 className="text-5xl font-bold tracking-tight">Search</h1>
				<p className="text-muted-foreground mt-2">for a</p>
			</div>
			<nav className="flex justify-center gap-4 mb-8">
				{searchNavLinks.map((link) => (
					<Button
						key={link.href}
						asChild
						variant={
							pathname === link.href ? "default" : "outline"
						}
						size="lg"
					>
						<Link href={link.href}>{link.name}</Link>
					</Button>
				))}
			</nav>
			<div className="mt-6">{children}</div>
		</div>
	);
}
