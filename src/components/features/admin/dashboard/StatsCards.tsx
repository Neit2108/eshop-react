import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Activity } from "lucide-react"

interface StatCard {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  description: string
  trend: string
}

const stats: StatCard[] = [
  {
    title: "New Customers",
    value: "1,234",
    change: 20,
    icon: <Users className="w-5 h-5" />,
    description: "Compared to last month",
    trend: "Slight increase over the past week",
  },
  {
    title: "Total Revenue",
    value: "$12,500",
    change: 12.5,
    icon: <DollarSign className="w-5 h-5" />,
    description: "Compared to last month",
    trend: "Trending up this month",
  },
  {
    title: "Total Orders",
    value: "456",
    change: -5,
    icon: <ShoppingCart className="w-5 h-5" />,
    description: "Compared to last month",
    trend: "Slight decrease from last week",
  },
  {
    title: "Active Users",
    value: "892",
    change: 8.3,
    icon: <Activity className="w-5 h-5" />,
    description: "Compared to last month",
    trend: "Steady growth this month",
  },
]

export function StatsCards() {
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
      {stats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Badge variant={stat.change >= 0 ? "default" : "destructive"} className="ml-auto">
                <span className="flex items-center gap-1">
                  {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change >= 0 ? "+" : ""}
                  {stat.change}%
                </span>
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground opacity-50">{stat.icon}</div>
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
