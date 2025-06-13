/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { JSX, useState } from 'react';
import { TileData } from "../../interfaces/types";

const FuturesTile: React.FC<{ token: TileData; refreshTile: () => void }> = ({ token, refreshTile }) => {
	const [contractCopied, setContractCopied] = useState(false);

	const handleContractCopy = (contractAddress: string) => {
		navigator.clipboard.writeText(contractAddress)
			.then(() => {
				setContractCopied(true);
				setTimeout(() => setContractCopied(false), 2000);
			})
			.catch((err) => console.error("Copy error:", err));
	};

	const formatPrice = (price: number): JSX.Element => {
		let str = price.toString();

		if (str.includes('e')) {
			const [baseStr, expStr] = str.split('e');
			const exponent = Number(expStr);
			const base = Math.abs(Number(baseStr));
			const [intPart, fracPart = ''] = base.toString().split('.');
			const digits = intPart + fracPart;

			if (exponent < 0) {
				const padding = '0'.repeat(Math.abs(exponent) - 1);
				str = `0.${padding}${digits}`;
				if (Number(baseStr) < 0) str = '-' + str;
			}
		}

		const [integerPart, decimalPart = ''] = str.split('.');
		if (!decimalPart) return <>{integerPart}</>;

		let zeroCount = 0;
		if (integerPart === '0') {
			while (decimalPart[zeroCount] === '0') zeroCount++;
		}

		const remaining = decimalPart.slice(zeroCount);
		if (!remaining) return <>{`${integerPart}.0`}</>;

		/* if (zeroCount === 0) {
			return <>{`${integerPart}.${decimalPart.slice(0, 2)}`}</>;
		} */

		if (zeroCount === 0) {
			const intNum = Number(integerPart);
			const decimalsCount = intNum < 3 ? 4 : 2;

			return <>{`${integerPart}.${decimalPart.slice(0, decimalsCount)}`}</>;
		}

		if (zeroCount === 1) {
			return <>{`${integerPart}.0${remaining.slice(0, 4)}`}</>;
		}

		return (
			<>
				{integerPart}.[
				<span className="text-xs">0</span>
				<span className="text-[0.68em] align-sub tracking-wider">{zeroCount}</span>
				]
				{remaining.slice(0, 4)}
			</>
		);
	};




	const getExchangeLink = (exchange: string, symbol: string, baseCoin: string, contract?: string, chain?: string): string => {
		const baseLinks: Record<string, string> = {
			okx: 'https://www.okx.com/ru/trade-spot/',
			bybit: 'https://www.bybit.com/trade/spot/',
			mexc: 'https://www.mexc.com/exchange/',
			bitget: 'https://www.bitget.com/spot/',
			gate: 'https://www.gate.io/trade/',
			kucoin: 'https://www.kucoin.com/trade/',
			htx: 'https://www.htx.com/trade/',
			bitmart: 'https://www.bitmart.com/trade?symbol=',
			xt: 'https://www.xt.com/trade/',
			dex: 'https://web3.okx.com/ru/dex-swap',
			oneInch: 'https://app.1inch.io/swap?src=1:USDT&dst=1:0xAFCdd4f666c84Fed1d8BD825aA762e3714F652c9',
		};

		const base = baseLinks[exchange.toLowerCase()];

		const currentChain = chain === 'ETH'
			? 'ethereum'
			: chain === 'SOL'
				? 'solana'
				: ''

		const currentUsdt = chain === 'ETH'
			? '0xdac17f958d2ee523a2206206994597c13d831ec7'
			: chain === 'SOL'
				? 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
				: ''

		if (!base) {
			return '#';
		}

		if (['bybit'].includes(exchange)) {
			return `${base}${baseCoin}/USDT`;
		}

		if (['mexc'].includes(exchange)) {
			return `${base}${baseCoin}_USDT`;
		}

		if (['htx'].includes(exchange)) {
			return `${base}${baseCoin}_usdt?type=spot`;
		}

		if (['dex'].includes(exchange)) {
			return `${base}?chain=${currentChain?.toLowerCase()},${currentChain?.toLowerCase()}&token=${contract},${currentUsdt}`;
		}

		return `${base}${symbol}`;
	};

	return (
		<div className="flex flex-col h-full p-4 justify-between rounded-lg text-gray-200 bg-gray-800/50 border border-gray-600">
			<div className="flex flex-col h-full justify-start space-y-4">
				{/* HEADER */}
				<div className="flex justify-between items-start text-xl font-semibold border-b border-gray-700 pb-2">
					<div>
						<p className="">
							{token.baseCoin && Object.keys(token.baseCoin).length > 0
								? token.baseCoin[Object.keys(token.baseCoin)[0]].toUpperCase() + "USDT"
								: "UNKNOWN"}
						</p>
						<p
							className={`cursor-pointer text-xs hover:underline transition duration-500 ${contractCopied ? "text-green-400" : "text-gray-400"}`}
							onClick={() => {
								if (token.baseContract) {
									handleContractCopy(token.baseContract);
								}
							}}
						>
							{token.baseContract?.slice(0, 8) + "..." + token.baseContract?.slice(-8) || "Unknown"}
						</p>
					</div>
					<div className="">
						<p
							className={`text-md text-right ${token.chain === "ETH"
								? "text-green-500"
								: token.chain === "SOL"
									? "text-sky-500"
									: token.chain === "BSC"
										? "text-yellow-500"
										: "text-gray-400"
								}`}>
							{token.chain}
						</p>
						<p className="text-xs text-gray-400 text-blue-300">
							{token.chain === "ETH"
								? "Ethereum"
								: token.chain === "SOL"
									? "Solana"
									: token.chain === "BSC"
										? "Binance Smart Chain"
										: "Unknown"
							}
						</p>
					</div>
				</div>

				<div className="border border-gray-600 rounded-lg">
					{/* FIRST LINE */}
					<div className="py-2 grid grid-cols-8 gap-2 text-center text-sm">
						<div className="p-1 col-span-3">
                                                        <div className="text-gray-400">Long Price</div>
							<div className="text-md font-semibold">{formatPrice(Number(token?.bestBuyPrice))}</div>
						</div>
						<div className="p-1 border-x border-gray-600 col-span-2">
							<div className="text-gray-400">Deal</div>
							<div className="hidden md:block font-semibold">
								{(token?.bestBuyExchange === "dex"
									? "DEX "
									: "CEX ") +
									(token?.bestSellExchange === "dex"
										? "─ DEX"
										: "─ CEX")}
							</div>
							<div className="block md:hidden font-semibold">
								{(token?.bestBuyExchange === "dex"
									? "D "
									: "C ") +
									(token?.bestSellExchange === "dex"
										? "─ D"
										: "─ C")}
							</div>
						</div>
						<div className="p-1 col-span-3">
                                                        <div className="text-gray-400">Short Price</div>
							<div className="text-md font-semibold">{formatPrice(Number(token?.bestSellPrice))}</div>
						</div>
					</div>
					{/* PROFITS */}
					<div className='py-2 grid grid-cols-8 gap-2 border-t border-gray-600 text-center text-sm'>
						<div className="p-1 col-span-3">
							<div className="text-gray-400">Base Bought</div>
							<div className="text-md font-semibold">{formatPrice(token?.depthBuyAmount ?? 0)}</div>
						</div>
						<div className="p-1 col-span-2 border-x border-gray-600">
							<div className="text-gray-400">Profit</div>
							<div className="text-md font-semibold">
								{formatPrice(token?.estimatedProfit ?? 0)}
								{" %"}
							</div>
						</div>
						<div className="p-1 col-span-3">
							<div className="text-gray-400">Quote Sold</div>
							<div className="text-md font-semibold">{formatPrice(token?.depthSellAmount ?? 0)}</div>
						</div>
					</div>
				</div>

				{/* TABLE */}
				<div className="overflow-x-auto">
					<table className="w-full text-xs text-gray-300 border-separate border-spacing-y-1 table-fixed">
						<thead>
							<tr className="text-gray-500">
								<th className="w-1/5 py-1 text-center">Exchange</th>
								<th className="w-1/5 py-1 text-center">Min Ask</th>
								<th className="w-1/5 py-1 text-center">Max Bid</th>
								<th className="w-1/5 py-1 text-center">Spread</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(token.bidPrice ?? {})
								.sort(([exA], [exB]) => {
									const spreadA = token.spreadD?.[exA] ?? 0;
									const spreadB = token.spreadD?.[exB] ?? 0;
									return spreadA - spreadB;
								})
								.map(([exchange, bid], idx) => {
									const ask = token.askPrice?.[exchange] ?? 0;
									const spread = token.spreadD?.[exchange] ?? 0;

									return (
										<tr key={`${exchange}-${idx}`} className="bg-gray-800">
											<td className="py-1 px-2 text-center rounded-l-md">{exchange.toUpperCase()}</td>
											<td className="py-1 px-2 text-center">{formatPrice(ask)}</td>
											<td className="py-1 px-2 text-center">{formatPrice(bid)}</td>
											<td className="py-1 px-2 text-center">{spread.toFixed(2)} %</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
			<div className="mt-6 grid grid-cols-3 gap-2 text-center text-sm">
				<a
					href={
						token.bestBuyExchange && token.symbol?.[token.bestBuyExchange] && token.baseCoin?.[token.bestBuyExchange]
							? getExchangeLink(
								token.bestBuyExchange,
								token.symbol[token.bestBuyExchange],
								token.baseCoin[token.bestBuyExchange],
								token.baseContract,
								token.chain)
							: '#'
					}
					target="_blank"
					rel="noopener noreferrer"
					className="block border border-gray-600 hover:bg-emerald-800 cursor-pointer p-2 rounded-lg transition-all duration-300"
				>
                                        <div className="text-gray-400">Long on</div>
					<div className="font-semibold">
						{token.bestBuyExchange?.toUpperCase() || "UNKNOWN"}
					</div>
				</a>

				<a
					href={token?.dexUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="block border border-gray-600 hover:bg-blue-950 cursor-pointer p-2 rounded-lg transition-all duration-300"
				>
					<div className="text-gray-400">Liquidity</div>
					<div className="font-semibold">
						{token.liquidity?.toFixed(2)}
					</div>
				</a>

				<a
					href={
						token.bestSellExchange && token.symbol?.[token.bestSellExchange] && token.baseCoin?.[token.bestSellExchange]
							? getExchangeLink(
								token.bestSellExchange,
								token.symbol[token.bestSellExchange],
								token.baseCoin[token.bestSellExchange],
								token.baseContract,
								token.chain)
							: '#'
					}
					target="_blank"
					rel="noopener noreferrer"
					className="block border border-gray-600 hover:bg-red-800 cursor-pointer p-2 rounded-lg transition-all duration-300"
				>
                                        <div className="text-gray-400">Short on</div>
					<div className="font-semibold">
						{token.bestSellExchange?.toUpperCase() || "UNKNOWN"}
					</div>
				</a>
			</div>
		</div>
	);
};

export default FuturesTile;
