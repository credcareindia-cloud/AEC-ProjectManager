"use client"

import { LandingParticles } from "@/components/landing-particles"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Paintbrush, Ruler, ArrowRight, Activity } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  const router = useRouter()

  const handleModeSelect = (mode: "design" | "planning") => {
    router.push(`/projects?mode=${mode}`)
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <LandingParticles />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-purple-400">
              BuildSync
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Advanced BIM Orchestration & Project Management Intelligence
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card
              onClick={() => handleModeSelect("design")}
              className="group relative overflow-hidden p-8 h-80 bg-slate-900/50 border-slate-700 hover:border-blue-500 hover:bg-slate-900/80 transition-all cursor-pointer backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent group-hover:from-blue-600/20 transition-all" />

              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Paintbrush className="w-8 h-8 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-white">Design</h2>
                  <p className="text-slate-400">
                    BIM Coordination, Clash Detection, LOIN/LOD, and Interface Management
                  </p>
                </div>

                <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Enter Module <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card
              onClick={() => handleModeSelect("planning")}
              className="group relative overflow-hidden p-8 h-80 bg-slate-900/50 border-slate-700 hover:border-emerald-500 hover:bg-slate-900/80 transition-all cursor-pointer backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent group-hover:from-emerald-600/20 transition-all" />

              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Ruler className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-white">Planning</h2>
                  <p className="text-slate-400">
                    Progress Tracking, S-Curves, Resource Management, and Financials
                  </p>
                </div>

                <div className="flex items-center gap-2 text-emerald-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Enter Module <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="md:col-span-2"
          >
            <Card
              onClick={() => router.push("/adm-agent")}
              className="group relative overflow-hidden p-8 bg-slate-900/50 border-slate-700 hover:border-indigo-500 hover:bg-slate-900/80 transition-all cursor-pointer backdrop-blur-sm flex items-center gap-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-transparent group-hover:from-indigo-600/20 transition-all" />

              <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Activity className="w-8 h-8 text-indigo-400" />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-white">ADM Agent</h2>
                <p className="text-slate-400">
                  AI-Powered Project Analysis. Upload XER/CSV files and get instant insights and dashboards.
                </p>
              </div>

              <div className="flex items-center gap-2 text-indigo-400 font-semibold group-hover:translate-x-2 transition-transform">
                Launch Agent <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
