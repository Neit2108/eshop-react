import { motion } from "framer-motion"
import { StatsCards } from "@/components/features/admin/dashboard/StatsCards"
import { RevenueChart } from "@/components/features/admin/dashboard/RevenueChart"
import { OrdersTrendChart } from "@/components/features/admin/dashboard/OrdersTrendChart"
import { OrdersTable } from "@/components/features/admin/dashboard/OrdersTable"

export function DashboardPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Stats Cards - Hiển thị số liệu tổng quan */}
      <motion.div variants={itemVariants}>
        <StatsCards />
      </motion.div>

      {/* Revenue Chart - Xu hướng doanh thu */}
      <motion.div variants={itemVariants}>
        <RevenueChart />
      </motion.div>

      {/* Orders Trend Chart - Xu hướng đơn hàng */}
      <motion.div variants={itemVariants}>
        <OrdersTrendChart period="THIS_MONTH" />
      </motion.div>

      {/* Recent Orders Table - Danh sách đơn hàng gần đây */}
      <motion.div variants={itemVariants}>
        <OrdersTable />
      </motion.div>
    </motion.div>
  )
}
