import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { StateContextProvider } from "./context";
import App from "./App";
import "./globals.css";

const container = document.getElementById("eduraise-root");
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<ThirdwebProvider>
			<Router>
				<StateContextProvider>
					<App />
				</StateContextProvider>
			</Router>
		</ThirdwebProvider>
	</React.StrictMode>
);
