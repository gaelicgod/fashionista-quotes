import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface FashionIconPanelProps {
  isOpen: boolean
  onClose: () => void
  iconName: string
  iconInfo: {
    bio: string
    achievements: string[]
  } | null
}

export function FashionIconPanel({ isOpen, onClose, iconName, iconInfo }: FashionIconPanelProps) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl overflow-y-auto z-50"
    >
      <div className="p-6 font-serif">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-yellow-500 transition-colors"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 text-black">{iconName}</h2>
        {iconInfo ? (
          <>
            <p className="text-sm mb-4 text-gray-700">{iconInfo.bio}</p>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-2 text-black">Key Achievements</h3>
            <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
              {iconInfo.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-sm text-gray-700">Loading icon information...</p>
        )}
      </div>
    </motion.div>
  )
}