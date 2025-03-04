"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, TrendingUp, Users, Shield } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function ZapCoinLanding() {
  function LiveTokenStats({ tokenAddress }: { tokenAddress: string }) {
    const [tokenData, setTokenData] = useState<{
      price: string
      marketCap: string
      holders: number
      priceChange: string
    }>({
      price: "$0.00042069",
      marketCap: "$69M",
      holders: 42069,
      priceChange: "+420%",
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      async function fetchTokenData() {
        try {
          setLoading(true)

          // Generate more noticeable random variations for demo purposes
          const timestamp = Date.now()
          const randomFactor = Math.sin(timestamp / 1000) * 0.1 // Use sine wave for more visible changes

          // Generate semi-random price based on timestamp to simulate live updates
          const basePrice = 0.00042069
          const priceVariation = basePrice * randomFactor
          const currentPrice = basePrice + priceVariation

          // Calculate other metrics based on the price
          const marketCap = (currentPrice * 1000000000).toFixed(2)
          const priceChangePercent = (randomFactor * 200 + 420).toFixed(2)
          const holders = 42069 + Math.floor(Math.random() * 2000)

          console.log("Updating token data at:", new Date().toLocaleTimeString())

          // Force a small delay to simulate network request
          await new Promise((resolve) => setTimeout(resolve, 500))

          setTokenData({
            price: `$${currentPrice.toFixed(8)}`,
            marketCap: `$${marketCap}M`,
            holders: holders,
            priceChange: `+${priceChangePercent}%`,
          })

          setError(null)
        } catch (err) {
          console.error("Error updating token data:", err)

          // Generate fallback data with visible variations
          const timestamp = Date.now()
          const randomFactor = Math.sin(timestamp / 1000) * 0.1
          const basePrice = 0.00042069
          const currentPrice = basePrice + basePrice * randomFactor

          setTokenData({
            price: `$${currentPrice.toFixed(8)}`,
            marketCap: "$69M",
            holders: 42069 + Math.floor(Math.random() * 1000),
            priceChange: "+420%",
          })
        } finally {
          setLoading(false)
        }
      }

      fetchTokenData()

      // Set up polling to refresh data every 5 seconds for more visible updates
      const intervalId = setInterval(fetchTokenData, 5000)

      // Clean up interval on component unmount
      return () => clearInterval(intervalId)
    }, [])

    return (
      <>
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400 backdrop-blur-sm">
            <Zap className="mr-2 h-4 w-4" />
            <span>Live Token Stats</span>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center space-y-2 border-2 border-blue-500/30 rounded-xl p-8 bg-black/20 relative overflow-hidden">
            <div className="absolute -top-1 -right-1 bg-blue-500/20 px-2 py-1 text-xs text-blue-400 rounded-bl-md">
              {new Date().toLocaleTimeString()}
            </div>
            <h3 className="text-xl font-bold">Current Price</h3>
            {loading ? (
              <div className="h-10 w-32 bg-gray-700/50 animate-pulse rounded"></div>
            ) : (
              <>
                <p className="text-4xl font-bold text-blue-400">{tokenData.price}</p>
                <p className="text-sm text-green-400">{tokenData.priceChange} this week</p>
              </>
            )}
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 border-2 border-blue-500/30 rounded-xl p-8 bg-black/20 relative overflow-hidden">
            <div className="absolute -top-1 -right-1 bg-blue-500/20 px-2 py-1 text-xs text-blue-400 rounded-bl-md">
              {new Date().toLocaleTimeString()}
            </div>
            <h3 className="text-xl font-bold">Market Cap</h3>
            {loading ? (
              <div className="h-10 w-32 bg-gray-700/50 animate-pulse rounded"></div>
            ) : (
              <>
                <p className="text-4xl font-bold text-blue-400">{tokenData.marketCap}</p>
                <p className="text-sm text-gray-400">Fully Diluted: $420M</p>
              </>
            )}
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 border-2 border-blue-500/30 rounded-xl p-8 bg-black/20 relative overflow-hidden">
            <div className="absolute -top-1 -right-1 bg-blue-500/20 px-2 py-1 text-xs text-blue-400 rounded-bl-md">
              {new Date().toLocaleTimeString()}
            </div>
            <h3 className="text-xl font-bold">Holders</h3>
            {loading ? (
              <div className="h-10 w-32 bg-gray-700/50 animate-pulse rounded"></div>
            ) : (
              <>
                <p className="text-4xl font-bold text-blue-400">{tokenData.holders.toLocaleString()}</p>
                <p className="text-sm text-green-400">+1,337 in 24h</p>
              </>
            )}
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>
            Token: {tokenAddress.slice(0, 6)}...{tokenAddress.slice(-4)}
          </p>
          <p className="mt-1">Data refreshes every 15 seconds</p>
        </div>
      </>
    )
  }
  return (
    <div className="flex min-h-screen flex-col dark bg-gray-950">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-gray-950 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Zap className="h-6 w-6 text-blue-400" />
            <span className="text-white">$ZAP</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => {
                  document.querySelector("#why-choose-zap")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                About
              </Button>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => {
                  document.querySelector("#tokenomics")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Tokenomics
              </Button>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => {
                  document.querySelector("#stats-section")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Stats
              </Button>
              <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-black">
                Buy ZAP
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-black via-indigo-950 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-40"></div>
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500/20 blur-xl animate-float"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-400 backdrop-blur-sm">
                  <Zap className="mr-1 h-3.5 w-3.5" />
                  <span>The Future of Passive Crypto</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  ZAP - Zero Action Profit
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  The revolutionary memecoin that rewards you for doing absolutely nothing. Just HODL and watch your
                  wealth grow!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-blue-500 hover:bg-blue-600 text-black font-bold">Buy ZAP Now</Button>
                <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10">
                  Dex Screener
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-[250px] w-[250px] md:h-[350px] md:w-[350px]">
                    <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>
                    <Image
                      src="https://i.imgur.com/976cgcq.jpeg"
                      alt="ZAP Coin"
                      width={350}
                      height={350}
                      className="rounded-full object-cover relative z-10 shadow-2xl shadow-black"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-400/50 animate-spin-slow"></div>
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-400/30 animate-spin-slow animation-delay-2000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center" id="why-choose-zap">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">Why Choose ZAP?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                The memecoin that's taking the crypto world by storm. Here's why you should join the ZAP community.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 border-blue-500/20 bg-gray-900">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <Zap className="h-12 w-12 text-blue-500" />
                </div>
                <CardTitle className="text-center text-xl text-white">Zero Effort</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-300">
                  No staking, no farming, no complicated processes. Just buy and HODL.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-500/20 bg-gray-900">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-12 w-12 text-blue-500" />
                </div>
                <CardTitle className="text-center text-xl text-white">Explosive Growth</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-300">
                  1,000,000% potential growth based on our advanced meme algorithms.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-500/20 bg-gray-900">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <Users className="h-12 w-12 text-blue-500" />
                </div>
                <CardTitle className="text-center text-xl text-white">Vibrant Community</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-300">
                  Join thousands of ZAP holders who believe in doing nothing together.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-500/20 bg-gray-900" id="tokenomics">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <Shield className="h-12 w-12 text-blue-500" />
                </div>
                <CardTitle className="text-center text-xl text-white">Tokenomics</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-300">
                  1 trillion total supply with 40% burned and 2% reflection on each transaction.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-black to-indigo-950 text-white"
        id="stats-section"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400 backdrop-blur-sm">
              <Zap className="mr-2 h-4 w-4" />
              <span>FMTN Token Stats</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Live Solana Memecoin Data</h2>
            <p className="max-w-[600px] text-gray-300">
              Real-time stats for{" "}
              <span className="text-blue-400 font-mono">FMTN9SvBq6nk4uyunPxQUBH4SeHoAkhwvYiV4P7hpump</span>
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center space-y-2 border-2 border-blue-500/30 rounded-xl p-8 bg-black/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-2 right-2 bg-blue-500/10 px-2 py-1 text-xs text-blue-400 rounded-md">
                Solana
              </div>
              <Zap className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="text-xl font-bold">Current Price</h3>
              <p className="text-4xl font-bold text-blue-400">$0.0183</p>
              <p className="text-sm text-green-400">+3.2% today</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 border-2 border-blue-500/30 rounded-xl p-8 bg-black/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-2 right-2 bg-blue-500/10 px-2 py-1 text-xs text-blue-400 rounded-md">
                FMTN
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="text-xl font-bold">Market Cap</h3>
              <p className="text-4xl font-bold text-blue-400">$40,000</p>
              <p className="text-sm text-gray-400">Fully Diluted: $42,069</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 border-2 border-blue-500/30 rounded-xl p-8 bg-black/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-2 right-2 bg-blue-500/10 px-2 py-1 text-xs text-blue-400 rounded-md">
                Memecoin
              </div>
              <Users className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="text-xl font-bold">Holders</h3>
              <p className="text-4xl font-bold text-blue-400">2,187</p>
              <p className="text-sm text-green-400">+83 in 24h</p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg border border-blue-500/20">
              <h4 className="text-sm font-medium text-gray-400 mb-1">24h Volume</h4>
              <p className="text-xl font-bold text-white">$1,842</p>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg border border-blue-500/20">
              <h4 className="text-sm font-medium text-gray-400 mb-1">Circulating Supply</h4>
              <p className="text-xl font-bold text-white">2.19M FMTN</p>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg border border-blue-500/20">
              <h4 className="text-sm font-medium text-gray-400 mb-1">All-Time High</h4>
              <p className="text-xl font-bold text-white">$0.0192</p>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg border border-blue-500/20">
              <h4 className="text-sm font-medium text-gray-400 mb-1">Price Change (7d)</h4>
              <p className="text-xl font-bold text-red-400">-4.8%</p>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href={`https://solscan.io/token/${encodeURIComponent("FMTN9SvBq6nk4uyunPxQUBH4SeHoAkhwvYiV4P7hpump")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full transition-colors"
            >
              <span>View on Solscan</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">Ready to ZAP?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join the revolution of doing absolutely nothing and potentially profiting.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-blue-500 hover:bg-blue-600 text-black font-bold px-8">Twitter</Button>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10">
                Join Discord
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">ZAP Coin</span>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} ZAP Coin. All rights reserved. This is a meme coin with no intrinsic value.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z"></path>
                  <path d="M3 8h18"></path>
                </svg>
                <span className="sr-only">Telegram</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                  <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                </svg>
                <span className="sr-only">Discord</span>
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: -2s;
          animation-direction: reverse;
        }
        @keyframes float {
          0% { transform: translate(0, 0); opacity: 0.5; }
          50% { transform: translate(20px, -20px); opacity: 0.8; }
          100% { transform: translate(0, 0); opacity: 0.5; }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

