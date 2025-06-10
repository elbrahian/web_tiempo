"use client"

import { motion } from "framer-motion"
import { CloudRain } from "lucide-react"

export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="text-sky-500 mb-4"
      >
        <CloudRain size={48} />
      </motion.div>
      <motion.p
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="text-lg font-medium text-slate-600"
      >
        Cargando datos meteorológicos...
      </motion.p>
    </div>
  )
}
