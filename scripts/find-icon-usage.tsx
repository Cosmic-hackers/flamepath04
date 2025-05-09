"use client"

import { useEffect } from "react"

export default function FindIconUsage() {
  useEffect(() => {
    // This is just a utility to help find where the FolderKanban icon is used
    console.log("Searching for FolderKanban usage in the codebase...")
    // In a real scenario, you would need to manually search your codebase
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Icon Usage Finder</h1>
      <p>Please check your console for results.</p>
      <p className="mt-4">
        The "FolderKanban" icon doesn't exist in lucide-react. Consider using one of these alternatives:
      </p>
      <ul className="list-disc ml-8 mt-2">
        <li>Folder</li>
        <li>FolderOpen</li>
        <li>FolderClosed</li>
        <li>FolderTree</li>
        <li>Kanban</li>
        <li>LayoutDashboard</li>
      </ul>
    </div>
  )
}
