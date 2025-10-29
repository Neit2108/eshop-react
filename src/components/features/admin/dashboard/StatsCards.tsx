import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Activity } from "lucide-react"
import { useAdmin } from "@/hooks/useAdmin"
import { useEffect } from "react"
import Loading from "@/components/common/Loading"
import { formatNumber } from "@/lib/utils"

export function StatsCards() {
  const { summaryStats, loading, error, fetchSummaryStats } = useAdmin();

  useEffect(() => {
    fetchSummaryStats();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {summaryStats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Badge variant={stat.change >= 0 ? "default" : "destructive"} className="ml-auto">
                <span className="flex items-center gap-1">
                  {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change >= 0 ? "+" : ""}
                  {formatNumber(stat.change)}%
                </span>
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-foreground">{formatNumber(stat.value)}</div>
                {/* <div className="text-muted-foreground opacity-50">{stat.icon}</div> */}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-1 pt-2">
              <p className="text-xs font-semibold text-foreground">{stat.description}</p>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
