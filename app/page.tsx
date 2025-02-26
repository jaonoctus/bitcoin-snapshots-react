"use client"

import { useState } from "react"
import { ExternalLink, Download, Shield, HardDrive, Hash } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type NetworkType = "pruned" | "full"
type NetworkInfo = {
  id: string
  type: NetworkType
  name: string
  color: string
  hoverColor: string
  textColor: string
  borderColor: string
  downloadUrl: string
  assumeutxoUrl: string
  assumeutxoHeight: string
  chain: string
  prune: string
  size: string
  height: string
  heightUrl: string
  bestBlock: string
  muhash: string
  hashSerialized: string
  txouts: string
  supply: string
  pruneHeight?: string
}

export default function BitcoinSnapshotsRedesign() {
  const [, setActiveTab] = useState("overview")

  const networks: NetworkInfo[] = [
    {
      id: "mainnet",
      type: "pruned",
      name: "Mainnet",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      textColor: "text-orange-500",
      borderColor: "border-orange-500",
      downloadUrl: "https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/022025/snapshot-bitcoin-mainnet-885445-pruned.tar.zst",
      assumeutxoUrl:
          "XXX",
      assumeutxoHeight: "821568",
      chain: "mainnet",
      prune: "550",
      pruneHeight: "885156",
      size: "12G",
      height: "885445",
      heightUrl: "https://mempool.space/block/00000000000000000001344da71dcf873b5d9a00e30d61b6a27d2c0667ba085c",
      bestBlock: "00000000000000000001344da71dcf873b5d9a00e30d61b6a27d2c0667ba085c",
      muhash: "68a7c1b34cbd6ca2fadffd650d2554a3639ddfe284863af5acb37639eb04d411",
      hashSerialized: "4b9f2b488dbbcd80a75f602dfa5aceeb880fab29bbd1b20c567ce373093c83d0",
      txouts: "179299972",
      supply: "1982929792652975",
    },
    // {
    //   id: "testnet3",
    //   type: "pruned",
    //   name: "Testnet3",
    //   color: "bg-teal-500",
    //   hoverColor: "hover:bg-teal-600",
    //   textColor: "text-teal-500",
    //   borderColor: "border-teal-500",
    //   downloadUrl: "https://eu2.contabostorage.com/3fc7909e0b8744a6a4fb58dc5158ffb6:bitcoin/202404/testnet.tar.zst",
    //   assumeutxoUrl:
    //       "https://eu2.contabostorage.com/3fc7909e0b8744a6a4fb58dc5158ffb6:bitcoin/20231218/utxo-testnet-2500000.dat.zst",
    //   assumeutxoHeight: "2,500,000",
    //   chain: "testnet",
    //   prune: "550",
    //   size: "7.6G",
    //   height: "2,745,129",
    //   heightUrl: "https://mempool.space/testnet/block/00000000000003acf6e5b8e560ff5c5a97748f9a4279418159f8a80af9bdea6d",
    //   bestBlock: "59F8 A80A F9BD EA6D",
    //   muhash: "F8F1 4157 C031 EDDE",
    //   hashSerialized: "7652 0565 7BC6 D834",
    //   txouts: "103,066,356",
    //   supply: "2,099,663,916,474,610",
    // },
    // {
    //   id: "testnet4",
    //   type: "full",
    //   name: "Testnet4",
    //   color: "bg-purple-500",
    //   hoverColor: "hover:bg-purple-600",
    //   textColor: "text-purple-500",
    //   borderColor: "border-purple-500",
    //   downloadUrl: "#",
    //   assumeutxoUrl: "#",
    //   assumeutxoHeight: "1,500,000",
    //   chain: "testnet4",
    //   prune: "550",
    //   size: "5.2G",
    //   height: "1,652,487",
    //   heightUrl: "#",
    //   bestBlock: "A7F3 B21C D8E4 F92B",
    //   muhash: "D4E2 C93A B7F5 1D8C",
    //   hashSerialized: "B3F1 C27D 45A8 E9C2",
    //   txouts: "85,421,934",
    //   supply: "1,845,732,518,293,751",
    // },
    {
      id: "signet",
      type: "full",
      name: "Signet",
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
      textColor: "text-indigo-500",
      borderColor: "border-indigo-500",
      downloadUrl: "https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/022025/snapshot-bitcoin-signet-237052-full.tar.zst",
      assumeutxoUrl: "XXX",
      assumeutxoHeight: "160,000",
      chain: "signet",
      prune: "-",
      size: "9.3G",
      height: "237052",
      heightUrl: "https://mempool.space/signet/block/000000749029989b6df38e62bb2e2e43778a814ba8c13807ca0fd9930de23f7f",
      bestBlock: "000000749029989b6df38e62bb2e2e43778a814ba8c13807ca0fd9930de23f7f",
      muhash: "fe14ef3f472786d9f07b25940a75bc0bac224475e77478f60a2854da805ac8fe",
      hashSerialized: "7f9ec48ab5f54a860bb2b69dbbee45352a3cbe193cae453ef83758092a349849",
      txouts: "11671351",
      supply: "1117602719924825",
    },
  ]

  function getLongFormat(hash: string) {
    return `${hash.slice(-16)}`
        .toUpperCase()
        .match(/.{1,4}/g)?.join(' ')
  }

  function formatNumber(n: string) {
    return new Intl.NumberFormat().format(Number(n))
  }

  return (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-6 text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-300">
              Bitcoin Core Snapshots
            </h1>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg">
              Fast-track your node setup with pre-synced blockchain data. These snapshots provide a verified copy of the
              Bitcoin blockchain at specific points in time, significantly reducing initial sync time.
            </p>
            <a href="https://zbd.gg/jaonoctus" target="_blank" className="inline-flex items-center justify-center p-1 bg-orange-500/10 rounded-full mb-4">
              <span className="px-2">If you like this, donate to:</span>
              <Badge
                  variant="outline"
                  className="border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-sm font-medium"
              >
                jaonoctus@zbd.gg
              </Badge>
            </a>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Technical Details</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {networks.map((network) => (
                    <Card key={network.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                      <div className={`h-2 w-full ${network.color}`}></div>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className={network.textColor}>{network.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {network.type}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Block Height:{" "}
                          <a
                              href={network.heightUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-dotted underline-offset-2 hover:text-white transition-colors"
                          >
                            {formatNumber(network.height)}
                          </a>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-col space-y-2">
                          <Button asChild className={`${network.color} ${network.hoverColor} text-white`}>
                            <a href={network.downloadUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="mr-2 h-4 w-4"/> Download snapshot
                            </a>
                          </Button>
                          {/*<Button asChild variant="outline" className="border-gray-700 hover:bg-gray-800">*/}
                          {/*  <a href={network.assumeutxoUrl} target="_blank" rel="noopener noreferrer">*/}
                          {/*    <FileDown className="mr-2 h-4 w-4"/> assumeutxo @ {formatNumber(network.assumeutxoHeight)}*/}
                          {/*  </a>*/}
                          {/*</Button>*/}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-gray-800 bg-gray-900/50 px-6 py-3">
                        <div className="w-full text-sm text-gray-400">
                          <span>Txouts: {formatNumber(network.txouts)}</span>
                        </div>
                      </CardFooter>
                    </Card>
                ))}
              </div>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-orange-500"/>
                    Verify Downloads
                  </CardTitle>
                  <CardDescription>Don&apos;t trust, verify! Check the integrity of your downloads.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <code>$ sha256sum --check --ignore-missing digests.txt</code>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <code>$ gpg --verify digests.txt.asc</code>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-800">
                      <a
                          href="https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/022025/digests.txt"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                        Download Checksum
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-800">
                      <a
                          href="https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/022025/digests.txt.asc"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                        Download Signature
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HardDrive className="mr-2 h-5 w-5 text-orange-500"/>
                    Technical Details
                  </CardTitle>
                  <CardDescription>Detailed technical information about each blockchain snapshot</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-4 px-2 font-medium">Metric</th>
                        {networks.map((network) => (
                            <th key={network.id} className="text-center py-4 px-2 font-medium">
                              <span className={network.textColor}>{network.name}</span>
                            </th>
                        ))}
                      </tr>
                      </thead>
                      <tbody>
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-2 font-medium">Size</td>
                        {networks.map((network) => (
                            <td key={network.id} className="text-center py-4 px-2">
                              <Badge variant="outline" className={`${network.borderColor} ${network.textColor}`}>
                                {network.size}
                              </Badge>
                            </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-2 font-medium">Type</td>
                        {networks.map((network) => (
                            <td key={network.id} className="text-center py-4 px-2">
                              {network.type}
                            </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-2 font-medium">Height</td>
                        {networks.map((network) => (
                            <td key={network.id} className="text-center py-4 px-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                        href={network.heightUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center underline decoration-dotted underline-offset-2 hover:text-white transition-colors"
                                    >
                                      {formatNumber(network.height)}
                                      <ExternalLink className="ml-1 h-3 w-3"/>
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View block on mempool.space</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-2 font-medium">Best Block</td>
                        {networks.map((network) => (
                            <td key={network.id} className="text-center py-4 px-2 font-mono text-sm text-gray-300">
                              {getLongFormat(network.bestBlock)}
                            </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-2 font-medium">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="inline-flex items-center cursor-help">
                                MuHash <Hash className="ml-1 h-3 w-3 text-gray-500"/>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>UTXO set hash</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </td>
                        {networks.map((network) => (
                            <td key={network.id} className="text-center py-4 px-2 font-mono text-sm text-gray-300">
                              {getLongFormat(network.muhash)}
                            </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-2 font-medium">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="inline-flex items-center cursor-help">
                                Hash Serialized <Hash className="ml-1 h-3 w-3 text-gray-500"/>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>hash_serialized_3 value</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </td>
                        {networks.map((network) => (
                            <td key={network.id} className="text-center py-4 px-2 font-mono text-sm text-gray-300">
                              {getLongFormat(network.hashSerialized)}
                            </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-2 font-medium">TXOuts</td>
                        {networks.map((network) => (
                            <td key={network.id} className="text-center py-4 px-2 text-gray-300">
                              {formatNumber(network.txouts)}
                            </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-2 font-medium">Supply (sats)</td>
                        {networks.map((network) => (
                            <td key={network.id} className="text-center py-4 px-2 text-xs text-gray-300">
                              {formatNumber(network.supply)}
                            </td>
                        ))}
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <footer className="mt-20 text-center text-gray-500 text-sm">
            <p>
              This project is maintained by{" "}
              <a
                  href="https://x.com/jaonoctus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-orange-500 hover:text-orange-400 transition-colors"
              >
              jaonoctus
              </a>
            </p>
          </footer>
        </div>
      </div>
  )
}

