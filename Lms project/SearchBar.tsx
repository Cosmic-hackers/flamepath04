import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const searchSuggestions = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Neural Networks",
  "Robotics",
  "Computer Vision",
  "Natural Language Processing",
  "Reinforcement Learning",
  "Data Science",
  "Big Data",
]

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (query.length > 1) {
      const filteredSuggestions = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filteredSuggestions.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    console.log('Searching for:', searchQuery)
    // Implement your search logic here
    setQuery(searchQuery)
    setSuggestions([])
  }

  return (
    <div className="relative">
      <div className="flex">
        <Input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-64 pl-10"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-0 h-full"
          onClick={() => handleSearch(query)}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            className="absolute z-10 w-full bg-background border border-input rounded-md mt-1 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="px-4 py-2 hover:bg-accent cursor-pointer"
                onClick={() => handleSearch(suggestion)}
              >
                {suggestion}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

