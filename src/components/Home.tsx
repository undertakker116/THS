import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-gray-100 min-h-screen font-sans">
      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div id="about" className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-transparent bg-clip-text animate-gradient-x">
              Crypto Arbitrage <span className="block mt-2">by TwinHeadSnake</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Like a <span className="text-green-400">two-headed serpent</span> striking at price discrepancies, our platform captures arbitrage opportunities across decentralized and centralized exchanges with lightning-fast execution.
            </p>
            <div className="flex space-x-4">
              <button className="relative px-6 py-3 overflow-hidden group bg-green-600 rounded-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-purple-500 hover:shadow-lg hover:shadow-green-800/50 transition-all duration-300"
                onClick={() => navigate('/arbitrage')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                <span className="relative z-10">Get Started</span>
              </button>
              {/* <button className="px-6 py-3 border border-green-500 rounded-lg hover:bg-green-900/25 transition">
                Learn More
              </button> */}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative overflow-hidden rounded-md border border-green-800/30 bg-gradient-to-br from-green-900/20 to-blue-900/20 p-4 transition-shadow duration-500 hover:shadow-lg hover:shadow-green-800/30">
            <div className="h-full w-full bg-black/50 rounded p-4 text-green-400 font-mono text-sm overflow-hidden">
              <div className="whitespace-pre-line">
                root@twinheadsnake:~$ dotnet ./main-service.dll
                {'\n'}Connecting to exchange data pools...
                {'\n'}
                {'\n'}[HTTP RESPONSE 200] Connected to CEX data pool
                {'\n'}[HTTP RESPONSE 200] Connected to DEX data pool
                {'\n'}
                {'\n'}[INFO] Starting API services...
                {'\n'}[INFO] Starting CEX arbitrage engine...
                {'\n'}[INFO] Starting DEX arbitrage engine...
                {'\n'}
                {'\n'}Arbitrage opportunity detected!
                {'\n'}Proceed with trade? [Y/n]:&nbsp;
                <span className="animate-cursor-blink mb-2">
                  █
                </span>
              </div>
            </div>
          </div>


        </div>
      </main>

      {/* HIGHLIGHTS */}
      <section id="features" className="container mx-auto px-4 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-10 text-center">Significant <span className="text-green-500">Highlights</span></h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Dual-Headed Speed", desc: "Like two heads working in unison, we execute trades simultaneously across multiple exchanges" },
            { title: "DEX & CEX Synergy", desc: "Our twin fangs pierce both decentralized and centralized exchange ecosystems" },
            { title: "Market Vision", desc: "With the precision of a serpent's gaze, we detect arbitrage opportunities before they vanish" }
          ].map((feature, i) => (
            <div key={i} className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition border border-gray-700 group">
              <div className="text-green-500 text-3xl mb-4 transition-transform duration-300">
                {i === 0 && "📡"}
                {i === 1 && "💱"}
                {i === 2 && "⏱️"}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="container mx-auto px-4 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-10 text-center scroll-mt-20">Our <span className="text-green-500">Evolution</span></h2>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-800/30 to-blue-800/30"></div>
          <div className="space-y-8">
            {[
              { year: "May 12, 2025", title: "Bilingual Launch (Twin Fangs Emergence)", desc: "Official debut of TwinHeadSnake with Ethereum and Solana network integration. Begin closed beta testing for elite traders, simulating dual venom potency across two blockchain ecosystems." },
              { year: "Late May 2025", title: "Scale Multiplication", desc: "Integrate 20+ blockchain networks, amplifying our decentralized prey-tracking capabilities. Prepare for hyper-liquidity shedding in Q3." },
              { year: "June 2025", title: "Strategic Striking Range", desc: "Deploy futures trading signals across MEXC, Binance, and Gate.io. Calibrate venomous algorithms for high-precision arbitrage strikes." },
              { year: "Q3 2025", title: "Perfect Predator Mode", desc: "Launch fully automated arbitrage engine. Twin heads synchronize for 24/7 algorithmic trading, exploiting price discrepancies like a serpent constricting prey." },
              /*               { year: "May 2025", title: "Global Hunt (Plained)", desc: "Expand operations of futures trading signals" },
                            { year: "July 2025", title: "Predator Mode (Plained)", desc: "Release of application for semi- and fully- automated trading" } */
            ].map((item, i) => (
              <div key={i} className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:items-center`}>
                <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-right pr-8' : 'md:text-left pl-8'}`}>
                  <div className="text-green-500 font-semibold">{item.year}</div>
                  <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                  <p className="text-gray-400 mt-2">{item.desc}</p>
                </div>

                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full border-4 border-gray-900 shadow-lg shadow-green-500/20"></div>
                </div>

                <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-left pl-8' : 'md:text-right pr-8'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-gray-800 p-8 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
          <p className="text-gray-400 mb-6">Like a serpent shedding its skin, stay updated on our evolution</p>

          {/* Форма подписки */}
          {/* <form className="max-w-md mx-auto mb-8 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 transition w-full"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </form> */}

          <div className="flex justify-center gap-8 mb-6">
            {/* Discord */}
            <a
              href="https://t.co/lEAbx1rrEe"
              className="text-gray-400 hover:text-green-400 transition-colors"
              aria-label="Discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 15.77 8 19a7.25 7.25 0 0 1-5-2.33A30 30 0 0 1 4.83 6.6 1 1 0 0 1 5.43 6 23.65 23.65 0 0 1 12 5a23.65 23.65 0 0 1 6.57 1 1 1 0 0 1 .6.59A30 30 0 0 1 21 16.67 7.25 7.25 0 0 1 16 19l-1-3.23"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M7 15a13.38 13.38 0 0 0 5 1 13.38 13.38 0 0 0 5-1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M15 10h.1m-6 0H9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://x.com/twin_head_snake"
              className="text-gray-400 hover:text-green-400 transition-colors"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                viewBox="0 0 50 50" fill="white" className="w-6 h-6">
                <path
                  d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z"></path>
              </svg>
            </a>
            {/* Telegram */}
            <a
              href="https://t.me/twinheadsnake"
              className="text-gray-400 hover:text-green-400 transition-colors"
              aria-label="Telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                viewBox="0 0 50 50" className="w-6 h-6" fill="white">
                <path
                  d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"></path>
              </svg>
            </a>

            {/* GitHub */}
            {/* <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                   viewBox="0 0 28 28" fill="white" className="w-6 h-6">
                <path
                    d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
            </a> */}
          </div>


          {/* Копирайт */}
          <p className="text-gray-500 mt-6">© 2025 TwinHeadSnake | All rights reserved</p>
        </div>
      </footer>

    </div>
  );

};

export default Home;
