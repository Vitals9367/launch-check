"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SecurityRating } from "@/types/scanner"
import type { Vulnerability } from "@/types/scanner"

interface SecurityRatingDisplayProps {
  rating: SecurityRating
  vulnerabilities: Vulnerability[]
}

export function SecurityRatingDisplay({ rating, vulnerabilities }: SecurityRatingDisplayProps) {
  // Count vulnerabilities by risk level
  const highCount = vulnerabilities.filter((v) => v.risk === "High").length
  const mediumCount = vulnerabilities.filter((v) => v.risk === "Medium").length
  const lowCount = vulnerabilities.filter((v) => v.risk === "Low").length
  const totalCount = vulnerabilities.length

  // Determine color based on score
  const getScoreColor = (score: string) => {
    switch (score) {
      case "A+":
        return "text-green-600 bg-green-50 border-green-200"
      case "A":
        return "text-green-600 bg-green-50 border-green-200"
      case "B":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "C":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "D":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "F":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
    >
      <Card className={`border-2 ${getScoreColor(rating.score)}`}>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <motion.div
              className="flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
            >
              <motion.div
                className={`flex items-center justify-center w-24 h-24 rounded-full border-4 border-current mb-2 ${getScoreColor(rating.score)}`}
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 60,
                }}
              >
                <motion.span
                  className="text-4xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {rating.score}
                </motion.span>
              </motion.div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <motion.h2
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {rating.label} Security Rating
              </motion.h2>
              <motion.p
                className="text-lg mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {rating.description}
              </motion.p>

              {totalCount > 0 ? (
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {highCount > 0 && (
                    <div className="flex items-center">
                      <Badge className="bg-red-500 hover:bg-red-600 mr-2">{highCount}</Badge>
                      <span>High Risk</span>
                    </div>
                  )}

                  {mediumCount > 0 && (
                    <div className="flex items-center">
                      <Badge className="bg-orange-500 hover:bg-orange-600 mr-2">{mediumCount}</Badge>
                      <span>Medium Risk</span>
                    </div>
                  )}

                  {lowCount > 0 && (
                    <div className="flex items-center">
                      <Badge className="bg-yellow-500 hover:bg-yellow-600 mr-2">{lowCount}</Badge>
                      <span>Low Risk</span>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  className="text-green-600 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  No vulnerabilities detected
                </motion.p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

