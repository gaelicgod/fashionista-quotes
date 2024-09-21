import { motion } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface IconInfo {
  bio: string;
  achievements: string[];
}

interface FashionIconPanelProps {
  isOpen: boolean
  onClose: () => void
  iconName: string
  iconInfo: IconInfo | null
  isLoading: boolean
}

export function FashionIconPanel({ isOpen, onClose, iconName, iconInfo, isLoading }: FashionIconPanelProps) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl overflow-y-auto z-50"
    >
      <div className="p-6 font-serif">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-black hover:text-yellow-500 transition-colors"
        >
          <X size={24} />
        </Button>
        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 text-black">{iconName}</h2>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
          </div>
        ) : iconInfo ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm mb-4 text-gray-700">{iconInfo.bio}</p>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-2 text-black">Key Achievements</h3>
            <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
              {iconInfo.achievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <p className="text-sm text-gray-700">No information available.</p>
        )}
      </div>
    </motion.div>
  )
}