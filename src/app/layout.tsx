import "./globals.css";
import Providers from "@/store/Providers";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			data-theme={"black"}
		>
			<body
			// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<Navbar />
					{children}
					<Player/>
				</Providers>
			</body>
		</html>
	);
}
