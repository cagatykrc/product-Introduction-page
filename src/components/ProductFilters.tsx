'use client'

import { useState } from 'react'

interface ProductFiltersProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedFilters: Record<string, string[]>
  setSelectedFilters: (filters: Record<string, string[]>) => void
}

export default function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  selectedFilters,
  setSelectedFilters,
}: ProductFiltersProps) {
  return null
} 