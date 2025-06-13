import React, { useEffect, useState } from 'react';
import { RawData, TileData } from '../interfaces/types';
import FuturesTile from './elements/FuturesTile';

const FuturesDashboard: React.FC = () => {
	const [tiles, setTiles] = useState<TileData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchData();
		const intervalId = setInterval(fetchData, 5000);
		return () => clearInterval(intervalId);
	}, []);

	const fetchData = async () => {
		try {
                        const result = await fetch('/api/futures');
                        //const result = await fetch('http://localhost:5000/api/futures');
			const rawData: RawData[] = await result.json();

			const limitedData = rawData.slice(0, 86);
			const enrichedData = await calculateData(limitedData);

			setTiles(enrichedData);
		} catch (err) {
			console.error("Fetch error:", err);
		} finally {
			setLoading(false);
		}
	};

	const calculateData = async (data: RawData[]) => {
		const calculatedData: TileData[] = data.map((item) => {
			const bids = Object.entries(item.bidPrice || {});
			const asks = Object.entries(item.askPrice || {});

			let depthBuyAmount = 0;
			let depthSellAmount = 0;
			let estimatedProfit = 0;

			const [bestSellExchange, bestSellPrice = 0] = bids.reduce(
				(best, curr) => (curr[1] > best[1] ? curr : best),
				["", 0]
			);
			const [bestBuyExchange, bestBuyPriceRaw] = asks.reduce(
				(best, curr) => (curr[1] < best[1] ? curr : best),
				["", Infinity]
			);
			const bestBuyPrice = bestBuyPriceRaw === Infinity ? 0 : bestBuyPriceRaw;

			const chain = !item.isChainsConflict
				? Object.values(item.parsedChain || {})[0]
				: undefined;

			const minFee = item.withdrawFee?.[bestBuyExchange] ?? 0;

			if (bestBuyExchange === "dex") {
				if (item?.dexQuotePrice) { depthBuyAmount = 100 / item?.dexQuotePrice; }
				else { depthBuyAmount = 0; }
			}
			else {
				const orderbookEntry = item.orderbook?.[bestBuyExchange];
				if (orderbookEntry && Array.isArray(orderbookEntry.asks)) {
					depthBuyAmount = getBuyAmount(orderbookEntry.asks, minFee);
				}
			}

			if (bestSellExchange === "dex") {
				if (item?.dexQuotePrice) { depthSellAmount = depthBuyAmount * item?.dexQuotePrice; }
				else { depthBuyAmount = 0; }
			}
			else {
				const orderbookEntry = item.orderbook?.[bestBuyExchange];
				if (orderbookEntry && Array.isArray(orderbookEntry.bids)) {
					depthSellAmount = getSellAmount(orderbookEntry.bids, depthBuyAmount);
				}
			}

			if (depthSellAmount !== 0) {
				estimatedProfit = ((depthSellAmount - 100) / 100) * 100;
			}
			else {
				estimatedProfit = 0;
			}

			return {
				...item,
				bestBuyPrice,
				bestSellPrice,
				bestBuyExchange,
				bestSellExchange,
				chain,
				minFee,
				depthBuyAmount,
				depthSellAmount,
				estimatedProfit
			};
		});
		
		calculatedData.sort((a, b) => (b.estimatedProfit ?? 0) - (a.estimatedProfit ?? 0));

		return calculatedData;
	}

	const getBuyAmount = (asks: [string, string][], minFee: number): number => {
		let remainingUSD = 100;
		let totalTokens = 0;

		for (const [priceStr, sizeStr] of asks) {
			const price = parseFloat(priceStr);
			const size = parseFloat(sizeStr);
			if (remainingUSD <= 0) break;

			const maxBuyableAtThisLevel = remainingUSD / price;
			const taken = Math.min(size, maxBuyableAtThisLevel);

			totalTokens += taken;
			remainingUSD -= taken * price;
		}

		return remainingUSD > 0 ? 0 : totalTokens - minFee;
	};

	const getSellAmount = (bids: [string, string][], tokenAmount: number): number => {
		let remainingTokens = tokenAmount;
		let totalUSD = 0;

		for (const [priceStr, sizeStr] of bids) {
			const price = parseFloat(priceStr);
			const size = parseFloat(sizeStr);
			if (remainingTokens <= 0) break;

			const sellableAtThisLevel = Math.min(size, remainingTokens);

			totalUSD += sellableAtThisLevel * price;
			remainingTokens -= sellableAtThisLevel;
		}

		return remainingTokens > 0 ? 0 : totalUSD;
	};


	return (
		<main className="p-4 text-gray-400">
			{loading ? (
				<p className="mt-2 pt-2 text-xl text-center">Downloading data...</p>
			) : (
				<div className="mt-2 grid grid-cols-8 gap-4">
					{tiles.map((token, index) => (
						<div key={index} className="col-span-8 sm:col-span-4">
                                                        <FuturesTile token={token} refreshTile={() => fetchData()} />
						</div>
					))}
				</div>
			)}
		</main>
	);
};

export default FuturesDashboard;
