import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../context";
import { CustomButton } from "./";
import { logo, menu, closeMenu, search, profile_2 } from "../assets";
import { navlinks } from "../constants";
import { ThirdwebProvider, ConnectButton, darkTheme } from "thirdweb/react";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { client } from "../client";

const Navbar = () => {
	const wallets = [
		createWallet("io.metamask"),
		createWallet("com.coinbase.wallet"),
		walletConnect(),
		inAppWallet({
			auth: {
				options: ["email", "google", "facebook", "phone"],
			},
		}),
		createWallet("com.trustwallet.app"),
		createWallet("app.phantom"),
	];
	const navigate = useNavigate();
	const [isActive, setIsActive] = useState("dashboard");
	const [toggleDrawer, setToggleDrawer] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const { address } = useStateContext();
	const location = useLocation();

	const handleShowMenu = () => {
		setToggleDrawer((prev) => !prev);
		setShowMenu(!showMenu);
	};

	return (
		<div className="flex md:flex-row flex-col-reverse justify-end mb-[35px] gap-6">
			<div className="sm:flex hidden flex-row justify-end gap-4">
				{address ? (
					<CustomButton
						btnType="button"
						title="Create Campaign"
						styles="bg-[#09d3ac]"
						handleClick={() => navigate("create-campaign")}
					/>
				) : (
					""
				)}
				<ConnectButton
					client={client}
					wallets={wallets}
					theme={darkTheme({
						colors: {
							accentText: "#09D3AC",
							accentButtonBg: "#09D3AC",
							accentButtonText: "#ffffff",
						},
					})}
					connectModal={{
						size: "wide",
						title: "Eduraise",
						titleIcon: "https://i.ibb.co/k8FxhNw/logo-2.png",
						showThirdwebBranding: false,
					}}
				/>

				{/* <Link to="/profile">
          <div
            className={`w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer ${
              location.pathname === "/profile" ? "" : "false"
            }`}
          >
            <img
              src={profile_2}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link> */}
			</div>

			<div className="sm:hidden flex justify-between items-center relative">
				<div className="w-[75px] h-[40px] flex justify-center items-center cursor-pointer">
					<img
						src={logo}
						alt="user"
						className="w-full h-full object-contain"
					/>
				</div>

				{!showMenu ? (
					<img
						src={menu}
						alt="menu"
						className="w-[34px] h-[34px] object-contain cursor-pointer"
						onClick={handleShowMenu}
					/>
				) : (
					<img
						src={closeMenu}
						alt="menu"
						className="w-[34px] h-[34px] object-contain cursor-pointer"
						onClick={() => handleShowMenu()}
					/>
				)}

				<div
					className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
						!toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
					} transition-all duration-700`}
				>
					<ul className="mb-4">
						{navlinks.map((link) => (
							<li
								key={link.name}
								className={`flex p-4 ${
									isActive === link.name && "bg-[#3a3a43]"
								}`}
								onClick={() => {
									setIsActive(link.name);
									setToggleDrawer(false);
									navigate(link.link);
								}}
							>
								<img
									src={link.imgUrl}
									alt={link.name}
									className={`w-[24px] h-[24px] object-contain ${
										isActive === link.name
											? "grayscale-0"
											: "grayscale"
									}`}
								/>
								<p
									className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
										isActive === link.name
											? "text-[#1dc071]"
											: "text-[#808191]"
									}`}
								>
									{link.name}
								</p>
							</li>
						))}
					</ul>

					<div className="flex mx-4">
						{address ? (
							<CustomButton
								btnType="button"
								title="Create Campaign"
								styles="bg-[#1dc071]"
								handleClick={() => navigate("create-campaign")}
							/>
						) : (
							<ConnectButton client={client} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
