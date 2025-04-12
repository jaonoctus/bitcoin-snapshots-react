"use client"

import { useState } from "react"
import { ExternalLink, Download, Shield, HardDrive, Hash, FileDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
  assumeutxoUrl: string | null
  assumeutxoHeight: string | null
  chain: string
  size: string
  height: string
  heightUrl: string
  bestBlock: string
  muhash: string
  hashSerialized: string
  txouts: string
  supply: string
  pruneHeight?: string
  flags?: string[]
}

export default function BitcoinSnapshotsRedesign() {
  const [, setActiveTab] = useState("overview")

  const [openSnapshotDialog, setOpenSnapshotDialog] = useState<string | null>(null)
  const [openAssumeutxoDialog, setOpenAssumeutxoDialog] = useState<string | null>(null)

  const networks: NetworkInfo[] = [
    {
      id: "mainnet",
      type: "pruned",
      name: "Mainnet",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      textColor: "text-orange-500",
      borderColor: "border-orange-500",
      downloadUrl: "https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/snapshot-bitcoin-mainnet-891749-pruned.tar.zst",
      assumeutxoUrl: "https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/utxo/utxo-bitcoin-mainnet-840000.dat",
      assumeutxoHeight: "840000",
      chain: "mainnet",
      size: "11G",
      height: "891749",
      heightUrl: "https://mempool.space/block/00000000000000000002201c70f1553b97aa9668351296699753508a1a3d4303",
      bestBlock: "00000000000000000002201c70f1553b97aa9668351296699753508a1a3d4303",
      muhash: "68a7c1b34cbd6ca2fadffd650d2554a3639ddfe284863af5acb37639eb04d411",
      hashSerialized: "bb92f9ca8a047d9ebfdab430705acdafe774c1ceed735194b5fa01e759ff8c7a",
      txouts: "172809442",
      supply: "1984899778126116",
    },
    {
      id: "testnet4",
      type: "full",
      name: "Testnet4",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      textColor: "text-purple-500",
      borderColor: "border-purple-500",
      downloadUrl: "https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/snapshot-bitcoin-testnet4-76687-full.tar.zst",
      assumeutxoUrl: null,
      assumeutxoHeight: null,
      chain: "testnet4",
      size: "800M",
      height: "76687",
      heightUrl:
          "https://mempool.space/testnet4/block/000000004e5b380697f73baffc0a62531a03b2a20103f45e86537e33ff03802c",
      bestBlock: "000000004e5b380697f73baffc0a62531a03b2a20103f45e86537e33ff03802c",
      muhash: "01cfb72c3229d5fbf0619976d8539526e2ae75cac686567329e111acea01b702",
      hashSerialized: "a016529af77131fa8eca73a0babe785a3dca7db3c47da3d233bd31949a92b8a2",
      txouts: "10638508",
      supply: "383419997388392",
      flags: ["txindex", "coinstatsindex", "blockfilterindex"],
    },
    {
      id: "signet",
      type: "full",
      name: "Signet",
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
      textColor: "text-indigo-500",
      borderColor: "border-indigo-500",
      downloadUrl: "https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/snapshot-bitcoin-signet-243265-full.tar.zst",
      assumeutxoUrl: "https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/utxo/utxo-bitcoin-signet-160000.dat",
      assumeutxoHeight: "160000",
      chain: "mutinynet",
      size: "836M",
      height: "243265",
      heightUrl: "https://mempool.space/signet/block/000000af8d132cbf7a6d57eab4b0227ec8bc097c999e00786469d47dddbab9d2",
      bestBlock: "000000af8d132cbf7a6d57eab4b0227ec8bc097c999e00786469d47dddbab9d2",
      muhash: "24adff84765a5869ed6b6669d6758b5ec00438b6396884c0eae1518520f77eb5",
      hashSerialized: "f4683349278b4a1d0eb247ba84cb8a2065f2730670f8270d8bf8200771abab59",
      txouts: "14409232",
      supply: "1133135219917171",
      flags: ["txindex", "coinstatsindex", "blockfilterindex"],
    },
    {
      id: "mutinynet",
      type: "full",
      name: "Mutinynet",
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      textColor: "text-red-500",
      borderColor: "border-red-500",
      downloadUrl:
          "https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/snapshot-bitcoin-mutinynet-1980844-full.tar.zst",
      assumeutxoUrl: null,
      assumeutxoHeight: null,
      chain: "signet",
      size: "780M",
      height: "1980844",
      heightUrl: "https://mutinynet.com/block/000001f610e4d2918e1fa3324bb79e603d680d8d595ceafffee90adab5d760ea",
      bestBlock: "000001f610e4d2918e1fa3324bb79e603d680d8d595ceafffee90adab5d760ea",
      muhash: "2a97c07bbd680f6c3274eac7b7247ac2d59ca4ee0a0607f15f2eb67baee6b51d",
      hashSerialized: "0fb506d66cd8f63dd1a6abe5309efe0e724a87162e60bbcac2e43e198ccccda3",
      txouts: "518768",
      supply: "2096780595614125",
      flags: ["txindex", "coinstatsindex", "blockfilterindex"],
    },
  ]

  function getLongFormat(hash: string) {
    return `${hash.slice(-16)}`
        .toUpperCase()
        .match(/.{1,4}/g)
        ?.join(" ")
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
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Technical Details</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                          <Dialog
                              open={openSnapshotDialog === network.id}
                              onOpenChange={(open) => !open && setOpenSnapshotDialog(null)}
                          >
                            <DialogTrigger asChild>
                              <Button
                                  className={`${network.color} ${network.hoverColor} text-white cursor-pointer`}
                                  onClick={() => setOpenSnapshotDialog(network.id)}
                              >
                                <Download className="mr-2 h-4 w-4" /> Download snapshot
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
                              <DialogHeader>
                                <DialogTitle>Download Warning</DialogTitle>
                                <DialogDescription>
                                  By downloading this snapshot, you acknowledge that you are accepting your own risks. These
                                  snapshots are provided as-is without any guarantees or warranties.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4 space-y-4">
                                <p className="text-sm text-gray-400">
                                  Using blockchain snapshots from third parties requires trust. Always verify the data after
                                  downloading and consider the security implications.
                                </p>
                                <div>
                                  <p className="text-sm text-gray-400 mb-2">
                                    After downloading, extract the snapshot using:
                                  </p>
                                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                                    <code>$ tar -xvf snapshot-bitcoin-*.tar.zst</code>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-2">
                                    Note: You may need to install zstd first with <code>apt install zstd</code> on
                                    Debian/Ubuntu or <code>brew install zstd</code> on macOS.
                                  </p>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={() => setOpenSnapshotDialog(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                    asChild
                                    className={`${network.color} ${network.hoverColor} text-white cursor-pointer`}
                                >
                                  <a
                                      href={network.downloadUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => setOpenSnapshotDialog(null)}
                                  >
                                    <Download className="mr-2 h-4 w-4" /> Proceed with Download
                                  </a>
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {network.assumeutxoUrl && network.assumeutxoHeight && (
                              <Dialog
                                  open={openAssumeutxoDialog === network.id}
                                  onOpenChange={(open) => !open && setOpenAssumeutxoDialog(null)}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                      variant="outline"
                                      className="border-gray-700 hover:bg-gray-800 cursor-pointer"
                                      onClick={() => setOpenAssumeutxoDialog(network.id)}
                                  >
                                    <FileDown className="mr-2 h-4 w-4" /> assumeutxo @{" "}
                                    {formatNumber(network.assumeutxoHeight)}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
                                  <DialogHeader>
                                    <DialogTitle>AssumeUTXO Information</DialogTitle>
                                    <DialogDescription>
                                      AssumeUTXO allows Bitcoin Core to become usable more quickly by temporarily trusting a
                                      UTXO set.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4 space-y-4">
                                    <p className="text-sm text-gray-400">
                                      After downloading the UTXO set file, use the following command to load it:
                                    </p>
                                    <div className="bg-black/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                                      <code>$ bitcoin-cli loadtxoutset &quot;/path/to/utxo-file.dat&quot;</code>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                      This will initialize your node with the UTXO set, allowing it to be immediately usable
                                      while the full blockchain validation continues in the background.
                                    </p>
                                    <a
                                        href="https://bitcoinops.org/en/topics/assumeutxo/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-orange-500 hover:text-orange-400 flex items-center"
                                    >
                                      Learn more about AssumeUTXO <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer"
                                        onClick={() => setOpenAssumeutxoDialog(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                        asChild
                                        className={`${network.color} ${network.hoverColor} text-white cursor-pointer`}
                                    >
                                      <a
                                          href={network.assumeutxoUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={() => setOpenAssumeutxoDialog(null)}
                                      >
                                        <FileDown className="mr-2 h-4 w-4" /> Download AssumeUTXO File
                                      </a>
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-orange-500" />
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
                    <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-800 cursor-pointer">
                      <a
                          href="https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/digests.txt"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                        Download Checksum
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-800 cursor-pointer">
                      <a
                          href="https://pub-3fcf0b98b9e64d6381ced6eddee57bbf.r2.dev/digests.txt.asc"
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
                    <HardDrive className="mr-2 h-5 w-5 text-orange-500" />
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
                        <td className="py-4 px-2 font-medium">Chainstate Size</td>
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
                        <td className="py-4 px-2 font-medium">Flags</td>
                        {networks.map((network) => (
                            <td key={network.id} className="text-center py-4 px-2">
                              {network.flags &&
                                  network.flags.map((flag) => (
                                      <Badge variant="outline" className="mx-1" key={network.id}>
                                        {flag}
                                      </Badge>
                                  ))}
                              {!network.flags && <span>-</span>}
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
                                      <ExternalLink className="ml-1 h-3 w-3" />
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
                                MuHash <Hash className="ml-1 h-3 w-3 text-gray-500" />
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
                                Hash Serialized <Hash className="ml-1 h-3 w-3 text-gray-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>hash_serialized value</p>
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
            <a
                href="https://zbd.gg/jaonoctus"
                target="_blank"
                className="mb-20 inline-flex items-center justify-center p-1 bg-orange-500/10 rounded-full mb-4"
                rel="noreferrer"
            >
              <span className="px-2">If you like this, donate to:</span>
              <Badge
                  variant="outline"
                  className="border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-sm font-medium"
              >
                jaonoctus@zbd.gg
              </Badge>
            </a>
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
